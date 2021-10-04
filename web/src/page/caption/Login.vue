<template>
  <div class="height-full p-20">
    <g-form ref="formRef">
      <g-form-item class="fz-20" label="邮箱：" prop="email">
        <g-input
          v-model="loginForm.email"
          placeholder="请输入你的邮箱"
          type="text"
          name="email"
          autofocus
          :disabled="submitLoading"
        />
      </g-form-item>
      <g-form-item class="fz-20" label="密码：" prop="pwd">
        <g-input
          v-model="loginForm.pwd"
          placeholder="请输入你的密码（6-30位）"
          type="password"
          name="pwd"
          maxlength="30"
          :disabled="submitLoading"
        />
      </g-form-item>
      <g-form-item class="fz-20" prop="pwd" center>
        <g-button :disabled="submitLoading" @click="submitAction(handleSubmit)"
          >登录/注册</g-button
        >
      </g-form-item>
    </g-form>
    <register-drawer
      ref="regDrawerRef"
      @autoLogin="autoLogin"
    ></register-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { GFormRefs } from "/@/components/form/Form.vue";
import { gMessage, useForm, useGRoute } from "/@/hooks";
import { validationRule } from "/@/utils/Validation/rules";
import { LoginDTO, UserInfo } from "local-common-util";
import { loginAndRegisterReq } from "/@/api/Users";
import { encryptStrByObj } from "/@/utils/encrypt";
import RegisterDrawer, { RegDrawerRefs } from "./components/RegisterDrawer.vue";
import { useStore } from "/@/store";
import { MutationTypes } from "/@/store/modules/user/mutation-types";
import { mainRoutePath } from "/@/const/path";
export default defineComponent({
  components: {
    RegisterDrawer
  },
  setup() {
    const store = useStore();
    const { pushRouteFullpath } = useGRoute();
    const formRef = ref<GFormRefs>();
    const regDrawerRef = ref<RegDrawerRefs>();
    const loginForm = ref(new LoginDTO());
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
    const { validate, submitAction, submitLoading } = useForm(loginForm, rules);
    const loginFn = async () => {
      const dto = encryptStrByObj(loginForm.value, ["pwd"]);
      const { data } = await loginAndRegisterReq(dto);
      return { data, dto };
    };
    const loginSuccess = (userInfo: UserInfo) => {
      store.commit(MutationTypes.SET_USERINFO, userInfo);
      pushRouteFullpath(mainRoutePath);
    };
    const handleSubmit = async () => {
      const { valid } = validate();
      if (!valid) return;
      const { data, dto } = await loginFn();
      if (data.isLogin) loginSuccess(data.userInfo);
      else {
        if (data.isSend) {
          gMessage.success(data.msg as string);
          regDrawerRef.value?.open(dto);
        } else gMessage.warning(data.msg as string);
      }
    };
    const autoLogin = async () => {
      const { data } = await loginFn();
      if (data.isLogin) loginSuccess(data.userInfo);
    };
    return {
      autoLogin,
      loginForm,
      regDrawerRef,
      formRef,
      submitAction,
      handleSubmit,
      submitLoading
    };
  }
});
</script>
