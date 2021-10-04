import { DTOBaseVO, ValidCallback } from "../types/base";
export declare class LoginBase {
    email: string;
}
export declare class LoginDTO extends LoginBase implements DTOBaseVO {
    pwd: string;
    valid(params: LoginDTO, callback: ValidCallback): void;
}
export declare class RegisterBase extends LoginDTO {
    code: string;
}
export declare class UserInfo extends LoginBase {
    id: string;
    nickName: string;
    token: string;
}
