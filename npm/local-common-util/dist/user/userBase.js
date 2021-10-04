"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = exports.RegisterBase = exports.LoginDTO = exports.LoginBase = void 0;
const rules_1 = require("../validation/rules");
class LoginBase {
    email = "";
}
exports.LoginBase = LoginBase;
class LoginDTO extends LoginBase {
    pwd = "";
    valid(params, callback) {
        if (!rules_1.validationRule.Email.test(params.email))
            callback("邮箱格式错误");
        if (params.pwd.length < 6)
            callback("密码不能小于6位");
    }
}
exports.LoginDTO = LoginDTO;
class RegisterBase extends LoginDTO {
    code = "";
}
exports.RegisterBase = RegisterBase;
class UserInfo extends LoginBase {
    id = "";
    nickName = "";
    token = "";
}
exports.UserInfo = UserInfo;
//# sourceMappingURL=userBase.js.map