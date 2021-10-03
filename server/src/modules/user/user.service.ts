import { Injectable } from "@nestjs/common";
import { LoginBase } from "local-common-util";
import { database, gMail } from "../config";
@Injectable()
export class UserService {
  getUser(): string {
    return "hei";
  }
  login(payload: LoginBase) {
    console.log(payload);
    return "登录成功";
  }
  async register(payload: LoginBase) {
    const { isNew } = await gMail.sendValidCode(payload.email);
    return {
      isLogin: false,
      isSend: isNew,
      msg: isNew ? "验证码已发送" : "操作过于频繁"
    };
  }
  getUserByEmail(email: string) {
    const record = database
      .getTable("user", "user_base")
      .findOne({ where: { email } });
    return record;
  }
}
