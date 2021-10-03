import { DTOBaseVO } from "local-common-util/dist/types/base";
import { ApiResult } from "../modules/config";

export const getType = (val: any) => {
  const reg = /\[object (\w+)\]/;
  const type = Object.prototype.toString.call(val);
  return reg.exec(type)[1];
};
interface DTObj {
  [k: string]: any;
}
export const validDTO = <T extends DTObj, R extends DTOBaseVO>(
  ins: T,
  gen: R
) => {
  const errors: string[] = [];
  const data = {};
  const valid = Object.keys(gen).every(key => {
    const isSame = getType(gen[key]) === getType(ins[key]);
    if (isSame) data[key] = ins[key];
    else errors.push(`${key}字段类型错误`);
    return isSame;
  });
  gen.valid &&
    gen.valid(ins, (s?: string) => {
      if (s) errors.push(s);
    });
  return {
    valid: valid && !errors.length,
    data: data as R,
    errors,
    errorMsg: errors.join("/")
  };
};

export const ValidBody = <R extends DTOBaseVO>(gen: R) => {
  return (_target, _name, descriptor) => {
    const fn = descriptor.value;
    descriptor.value = function (body: R) {
      const { valid, data, errorMsg } = validDTO(body, gen);
      if (valid) return fn.call(this, data);
      return ApiResult.LOGIC_ERROR(errorMsg);
    };
    return descriptor;
  };
};
