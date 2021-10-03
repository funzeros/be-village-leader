import { DTOBaseVO, ValidCallback } from "../types/base";
import { validationRule } from "../validation/rules";
export class LoginBase implements DTOBaseVO {
  email = "";
  pwd = "";
  valid(params: LoginBase, callback: ValidCallback) {
    if (!validationRule.Email.test(params.email)) callback("邮箱格式错误");
    if (params.pwd.length < 6) callback("密码不能小于6位");
  }
}
export class UserInfo extends LoginBase {
  id = "";
  nickName = "";
}
