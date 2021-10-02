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
          placeholder="请输入你的密码"
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

export default defineComponent({
  setup() {
    class LoginForm {
      email = "";
      pwd = "";
    }
    const formRef = ref<GFormRef>();
    const form = ref(new LoginForm());
    const rules: GFormRules = {
      email: {
        validator(v: string) {
          return validationRule.Email.test(v) || "邮箱格式错误";
        }
      },
      pwd: {
        validator(v: string) {
          return v.length < 6 && "密码不能小于6位";
        }
      }
    };
    const { validate } = useForm(form, rules);
    const handleSubmit = () => {
      const { valid } = validate();
      if (valid) gMessage.success("成了");
    };
    return { form, formRef, handleSubmit };
  }
});
</script>
