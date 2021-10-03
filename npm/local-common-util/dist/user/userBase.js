"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = exports.LoginBase = void 0;
const rules_1 = require("../validation/rules");
class LoginBase {
    email = "";
    pwd = "";
    valid(params, callback) {
        if (!rules_1.validationRule.Email.test(params.email))
            callback("邮箱格式错误");
        if (params.pwd.length < 6)
            callback("密码不能小于6位");
    }
}
exports.LoginBase = LoginBase;
class UserInfo extends LoginBase {
    id = "";
    nickName = "";
}
exports.UserInfo = UserInfo;
//# sourceMappingURL=userBase.js.map