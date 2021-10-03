export declare type ValidCallback = (p?: string) => void;
export interface DTOBaseVO {
    valid?: (p: any, cb: ValidCallback) => void;
    [k: string]: any;
}
