<template>
  <div class="height-full p-20">
    <g-form ref="formRef">
      <g-form-item class="fz-20" label="邮箱：" prop="email">
        <g-input
          v-model="form.email"
          placeholder="请输入你的邮箱"
          type="text"
          name="email"
        />
      </g-form-item>
      <g-form-item class="fz-20" label="密码：" prop="pwd">
        <g-input
          v-model="form.pwd"
          placeholder="请输入你的密码（6-30位）"
          type="password"
          name="pwd"
        />
      </g-form-item>
      <g-form-item class="fz-20" prop="pwd" center>
        <g-button @click="handleSubmit">登录/注册</g-button>
      </g-form-item>
    </g-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { GFormRef } from "/@/components/form/Form.vue";
import { gMessage, useForm } from "/@/hooks";
import { validationRule } from "/@/utils/Validation/rules";
import { LoginBase } from "local-common-util";
import { loginAndRegisterReq } from "/@/api/Users";
import { encryptStrByObj } from "/@/utils/encrypt";
export default defineComponent({
  setup() {
    const formRef = ref<GFormRef>();
    const form = ref(new LoginBase());
    const rules: GFormRules = {
      email: {
        validator(v: string) {
          return validationRule.Email.test(v) || "邮箱格式错误";
        }
      },
      pwd: {
        validator(v: string) {
          if (v.length < 6) return "密码不能小于6位";
          if (v.length > 30) return "密码不能大于30位";
        }
      }
    };
    const { validate } = useForm(form, rules);
    const handleSubmit = async () => {
      const { valid } = validate();
      if (!valid) return;
      const { data } = await loginAndRegisterReq(
        encryptStrByObj(form.value, ["pwd"])
      );
      if (data.isLogin) {
        console.log(data.userInfo);
      } else {
        if (data.isSend) {
          gMessage.success(data.msg as string);
        } else gMessage.warning(data.msg as string);
      }
    };
    return { form, formRef, handleSubmit };
  }
});
</script>
