import { DTOBaseVO, ValidCallback } from "../types/base";
import { validationRule } from "../validation/rules";
export class LoginBase {
  email = "";
}
export class LoginDTO extends LoginBase implements DTOBaseVO {
  pwd = "";
  valid(params: LoginDTO, callback: ValidCallback) {
    if (!validationRule.Email.test(params.email)) callback("邮箱格式错误");
    if (params.pwd.length < 6) callback("密码不能小于6位");
  }
}
export class RegisterBase extends LoginDTO {
  code = "";
}
export class UserInfo extends LoginBase {
  id = "";
  nickName = "";
  token = "";
}
