type GFormRuleItemValue = string | number | boolean | Record | array;
type GFormRuleItem = {
  validator: (value: GFormRuleItemValue) => string | boolean | undefined | null;
};
type GFormRules = GObj<GFormRuleItem>;
type GFormErrorList = { prop: string; msg: string }[];
