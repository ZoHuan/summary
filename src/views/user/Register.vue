<template>
  <div class="container">
    <el-row class="login">
      <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" class="login-left">
        <div class="login-form">
          <h1>用户注册</h1>
          <el-form ref="registerRef" :model="registerForm" :rules="loginRules">
            <el-form-item prop="username">
              <el-input
                v-model="registerForm.username"
                placeholder="请输入用户名"
                autocomplete="false"
              ></el-input>
            </el-form-item>

            <el-popover placement="right-start" trigger="click" :width="240">
              <template #reference>
                <el-form-item prop="password">
                  <el-input
                    v-model="registerForm.password"
                    placeholder="请输入密码"
                    type="password"
                    autocomplete="off"
                    show-password
                  ></el-input>
                </el-form-item>
              </template>
              <template #default>
                <div>
                  <div :class="['user-register', passwordLevelClass]">
                    强度：<span>{{ passwordLevelName }}</span>
                  </div>
                  <el-progress
                    :percentage="state.percent"
                    :color="passwordLevelColor"
                    :show-text="false"
                    :stroke-width="8"
                  />
                  <div style="margin-top: 10px">
                    <span
                      >请至少输入 8 个字符。请不要使用容易被猜到的密码。</span
                    >
                  </div>
                </div>
              </template>
            </el-popover>

            <el-form-item prop="password2">
              <el-input
                v-model="registerForm.password2"
                placeholder="请确认密码"
                type="password"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input
                v-model="registerForm.phone"
                placeholder="请输入手机号"
                autocomplete="false"
              ></el-input>
            </el-form-item>

            <el-row :gutter="16">
              <el-col :span="16">
                <el-form-item prop="captcha">
                  <el-input
                    v-model="registerForm.captcha"
                    placeholder="请输入验证码"
                    autocomplete="false"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button
                  type="primary"
                  :disabled="state.smsSendBtn"
                  @click.stop.prevent="getCaptcha($event, registerRef)"
                  v-text="
                    (!state.smsSendBtn && '获取验证码') || state.time + ' s'
                  "
                ></el-button>
              </el-col>
            </el-row>

            <el-button
              type="primary"
              class="register-button"
              :loading="registerBtn"
              :disabled="registerBtn"
              @click.stop.prevent="handleRegister(registerRef)"
              >注册</el-button
            >
          </el-form>

          <div class="register">
            <el-link type="primary" :underline="false" @click="jumpLogin"
              >使用已有账户登录</el-link
            >
          </div>
        </div>
      </el-col>
      <el-col :span="14" class="login-right hidden-xs-only"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElNotification } from "element-plus";
import { InternalRuleItem } from "async-validator";
import type { FormInstance, FormRules } from "element-plus";
import type { AxiosError } from "axios";

import { getSmsCaptcha } from "@/api/login/login";
import { scorePassword } from "@/utils/util";
import type { ResponseType, ObjectType } from "@/types/request";

defineComponent({ name: "RegisterView" });

const router = useRouter();
const registerRef = ref<FormInstance>();

const levelNames = ["最低", "低", "中", "强"];
const levelClass = ["error", "error", "warning", "success"];
const levelColor = ["#ff0000", "#ff0000", "#ff7e05", "#52c41a"];

const registerForm = reactive({
  username: "",
  password: "",
  password2: "",
  phone: "",
  captcha: "",
});
const state = reactive({
  passwordLevelChecked: false,
  passwordLevel: 0,
  percent: 10,
  time: 60,
  smsSendBtn: false,
});
const registerBtn = ref(false);

const passwordLevelClass = computed(() => {
  return levelClass[state.passwordLevel];
});
const passwordLevelName = computed(() => {
  return levelNames[state.passwordLevel];
});
const passwordLevelColor = computed(() => {
  return levelColor[state.passwordLevel];
});

const handlePasswordLevel = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error | undefined) => void
) => {
  if (value === "") {
    return callback();
  }
  if (value.length >= 6) {
    if (scorePassword(value) >= 30) {
      state.passwordLevel = 1;
    }
    if (scorePassword(value) >= 60) {
      state.passwordLevel = 2;
    }
    if (scorePassword(value) >= 80) {
      state.passwordLevel = 3;
    }
  } else {
    state.passwordLevel = 0;
    callback(new Error("密码强度不够"));
  }
  state.percent = state.passwordLevel * 33;
  callback();
};

const handlePasswordCheck = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error | undefined) => void
) => {
  if (value === "") {
    callback(new Error("请确认登录密码"));
  } else if (value !== registerForm.password) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const handlePhoneCheck = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error | undefined) => void
) => {
  // console.log("handlePhoneCheck, rule:", rule);
  // console.log("handlePhoneCheck, value", value);
  // console.log("handlePhoneCheck, callback", callback);

  callback();
};

const handleRegister = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      registerBtn.value = true;
      router.push({ name: "registerResult", params: { ...registerForm } });
    }
  });
};

const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    {
      min: 3,
      max: 16,
      message: "长度在 3 到 16 个字符",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入登录密码", trigger: "blur" },
    { min: 6, max: 16, message: "密码长度限制在6到16个字符", trigger: "blur" },
    {
      validator: handlePasswordLevel,
      trigger: "change",
    },
  ],
  password2: [
    { required: true, message: "请输入登录密码", trigger: "blur" },
    { min: 6, max: 16, message: "密码长度限制在6到16个字符", trigger: "blur" },
    {
      validator: handlePasswordCheck,
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
    {
      validator: handlePhoneCheck,
      trigger: "blur",
    },
  ],
  captcha: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "blur",
    },
  ],
});

const getCaptcha = async (e: Event, formEl: FormInstance | undefined) => {
  e.preventDefault();

  if (!formEl) return;
  formEl.validateField("phone", (isValid) => {
    if (isValid) {
      state.smsSendBtn = true;
      const interval = window.setInterval(() => {
        if (state.time-- <= 0) {
          state.time = 60;
          state.smsSendBtn = false;
          window.clearInterval(interval);
        }
      }, 1000);

      getSmsCaptcha({ phone: registerForm.phone })
        .then((res) => {
          ElMessage({
            message: "验证码发送中..",
            type: "success",
          });
          ElNotification({
            title: "成功",
            message: "验证码获取成功，您的验证码为：" + res.data.result.captcha,
            type: "success",
          });
        })
        .catch((err) => {
          clearInterval(interval);
          state.time = 60;
          state.smsSendBtn = false;
          requestFailed(err);
        });
    }
  });
};

const requestFailed = (err: AxiosError<ResponseType<ObjectType>>) => {
  ElNotification({
    title: "错误",
    message:
      ((err.response || {}).data || {}).message || "请求出现错误，请稍后再试",
    type: "error",
  });
  registerBtn.value = false;
};

const jumpLogin = () => {
  router.push({ name: "login" });
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f7fafc;
}
.login {
  width: 1100px;
  height: 600px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
}
.login-left {
  background-color: #fff;
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    box-sizing: border-box;

    h1 {
      font-size: 24px;
      font-weight: 600;
    }
  }

  .el-button {
    padding: 0 12px;
  }

  .register-button {
    width: 320px;
  }

  .register {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 16px;
  }
}

.login-right {
  background: url(~@/assets/img/poster.svg) no-repeat;
  background-position: center;
  background-color: #ebf4ff;
}

.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}
</style>
