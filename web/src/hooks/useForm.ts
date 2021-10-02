import { isRef, unref } from "vue";
import { gMessage } from ".";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useForm = function (model: any, rules: GFormRules) {
  return {
    validate() {
      let cModel = model;
      if (isRef(model)) cModel = unref(model);
      const res = Object.keys(rules).reduce((acc, cur) => {
        const rule = rules[cur];
        const res = rule.validator(cModel[cur]);
        if (typeof res === "string" && res.length) {
          gMessage.error(res);
          acc.push({ prop: cur, msg: res });
        }
        return acc;
      }, [] as GFormErrorList);
      return { valid: !res.length, error: res };
    }
  };
};

export default useForm;
