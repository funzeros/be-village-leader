import { DTOBaseVO, ValidCallback } from "../types/base";
export declare class LoginBase implements DTOBaseVO {
    email: string;
    pwd: string;
    valid(params: LoginBase, callback: ValidCallback): void;
}
export declare class UserInfo extends LoginBase {
    id: string;
    nickName: string;
}
