<template>
  <g-drawer v-model="drawerShow">
    <g-form>
      <g-form-item label="邮件验证码：">
        <g-input
          v-model="regForm.code"
          placeholder="请输入6位数字验证码"
          type="text"
          onlyNumber
          maxlength="6"
          :disabled="submitLoading"
          ref="inputRef"
        ></g-input>
      </g-form-item>
      <g-form-item center
        ><g-button
          :disabled="submitLoading"
          @click="submitAction(handleRegister)"
          >立即注册</g-button
        ></g-form-item
      >
      <g-form-item center
        ><g-button :disabled="submitLoading" plain @click="close"
          >返回登录</g-button
        ></g-form-item
      >
    </g-form>
  </g-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { LoginDTO, RegisterBase } from "local-common-util";
import { mergeProperties } from "/@/utils/common";
import { registerReq } from "/@/api/Users";
import { gMessage, useForm } from "/@/hooks";
import { GInputRefs } from "/@/components/form/Input.vue";
const regDrawer = defineComponent({
  emits: ["autoLogin"],
  setup(props, { emit }) {
    const inputRef = ref<GInputRefs>();
    const regForm = ref(new RegisterBase());
    const rules: GFormRules = {
      code: {
        validator(v: string) {
          if (v.length !== 6) return "验证码格式错误";
        }
      }
    };
    const { submitLoading, submitAction, validate } = useForm(regForm, rules);
    const drawerShow = ref(false);
    const open = (dto: LoginDTO) => {
      regForm.value = mergeProperties(regForm.value, dto);
      drawerShow.value = true;
      setTimeout(() => {
        inputRef.value?.handleFocus();
      }, 300);
    };
    const close = () => {
      drawerShow.value = false;
      regForm.value = new RegisterBase();
    };
    const handleRegister = async () => {
      const { valid } = validate();
      if (valid) {
        const { data } = await registerReq(regForm.value);
        if (data) {
          gMessage.success(data);
          emit("autoLogin");
        }
      }
    };

    return {
      inputRef,
      regForm,
      open,
      close,
      drawerShow,
      handleRegister,
      submitLoading,
      submitAction
    };
  }
});

export default regDrawer;
export type RegDrawerRefs = InstanceType<typeof regDrawer>;
</script>
