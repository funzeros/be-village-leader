import { Injectable } from "@nestjs/common";
import { LoginDTO, RegisterBase, UserInfo } from "local-common-util";
import {
  database,
  DBTable,
  gMail,
  md5Encryption,
  genToken,
  displaceDecryptStr
} from "../config";
@Injectable()
export class UserService {
  getUserBase() {
    return database.getTable("user", "user_base");
  }
  login(payload: LoginDTO) {
    const { email, pwd } = payload;
    const record = this.getUserBase().findOne({
      where: {
        email,
        pwd: md5Encryption(pwd)
      },
      exclude: ["pwd"]
    }) as UserInfo;
    if (record) {
      record.token = genToken(record.id);
      const { isSuccess, record: newRecord } =
        this.getUserBase().updateByPrimaryKey(record, record.id);
      if (isSuccess) return DBTable.attributeExclude(newRecord, ["pwd"]);
      throw new Error("修改用户信息错误");
    }
    throw new Error("邮箱或密码错误");
  }
  tokenAuth(token: string) {
    const idPart = token.split("-")[0];
    const id = displaceDecryptStr(idPart);
    const record = this.getUserBase().findByPrimaryKey(+id, [
      "pwd"
    ]) as UserInfo;
    if (record.token === token) {
      return record;
    }
    return void 0;
  }
  async sendMailCode(payload: LoginDTO) {
    const { email } = payload;
    const record = this.getUserBase().findOne({ where: { email } });
    if (record) throw new Error("该邮箱已注册");
    const { isNew } = await gMail.sendValidCode(email);
    return {
      isLogin: false,
      isSend: isNew,
      msg: isNew ? "验证码已发送" : "操作过于频繁"
    };
  }
  register(payload: RegisterBase) {
    const { email, pwd, code } = payload;
    const { valid, msg } = gMail.validCode(email, code);
    if (!valid) throw new Error(msg);
    const record = this.getUserBase().findOne({ where: { email } });
    if (record) throw new Error("该邮箱已注册");
    this.getUserBase().add({
      email: email,
      pwd: md5Encryption(pwd)
    });
    return "注册成功";
  }
  getUserByEmail(email: string) {
    const record = this.getUserBase().findOne({ where: { email } });
    return record;
  }
}
