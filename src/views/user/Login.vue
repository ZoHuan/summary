<template>
  <div class="container">
    <el-row class="login">
      <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" class="login-left">
        <div class="login-form">
          <h1>用户登录</h1>
          <el-form ref="loginRef" :model="loginForm" :rules="loginRules">
            <el-alert
              v-if="isLoginError"
              title="账户或密码错误"
              type="error"
              show-icon
            />
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="用户名:admin"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="密码:123456"
                type="password"
                @keyup.enter="handleLogin(loginRef)"
              ></el-input>
            </el-form-item>
            <el-form-item size="small">
              <el-checkbox v-model="remember"
                >记住账号密码</el-checkbox
              ></el-form-item
            >
            <el-form-item
              ><el-button type="primary" @click="handleLogin(loginRef)"
                >登录</el-button
              ></el-form-item
            >
          </el-form>

          <div class="register">
            没有帐号？<el-link
              type="primary"
              :underline="false"
              @click="jumpRegister"
              >点此注册</el-link
            >
          </div>
          <el-divider>其他方式登录</el-divider>
          <div class="other">
            <span>
              <i class="iconfont icon-GitHub"></i>
            </span>
            <span>
              <i class="iconfont icon-zhifubao"></i>
            </span>
            <span>
              <i class="iconfont icon-dingding"></i>
            </span>
            <span>
              <i class="iconfont icon-weixin"></i>
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="14" class="login-right hidden-xs-only"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "@/store/modules/user";
import { ElNotification } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import type { AxiosError } from "axios";
import type { ResponseType, ObjectType } from "@/types/request";
import md5 from "js-md5";

defineComponent({ name: "LoginView" });

const router = useRouter();
const store = userStore();
const loginRef = ref<FormInstance>();
const loginForm = reactive({
  username: "",
  password: "",
});
const isLoginError = ref(false);
const remember = ref(false);

const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入登录账号", trigger: "blur" },
    {
      min: 3,
      max: 16,
      message: "长度在 3 到 16 个字符",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入登录密码", trigger: "blur" },
    {
      min: 6,
      max: 16,
      message: "长度在 6 到 16 个字符",
      trigger: "blur",
    },
  ],
});

const loginSuccess = () => {
  router.push("/");
  isLoginError.value = false;
};
const requestFailed = (err: AxiosError<ResponseType<ObjectType>>) => {
  isLoginError.value = true;
  ElNotification({
    title: "错误",
    message:
      ((err.response || {}).data || {}).message || "请求出现错误，请稍后再试",
    type: "error",
  });
};
const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const loginParams = { ...loginForm };
      loginParams.password = md5(loginForm.password);
      store
        .login(loginParams)
        .then(() => {
          loginSuccess();
        })
        .catch((err) => {
          requestFailed(err);
        });
    }
  });
};

const jumpRegister = () => {
  router.push({ name: "Register" });
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

    .el-form-item {
      margin: 20px 0 0;
    }
    .el-form-item--mini.el-form-item {
      margin: 0;
    }

    .el-input {
      display: flex;
      width: 320px;
    }

    .el-checkbox {
      width: 100%;
      margin-top: 14px;
      text-align: left;
    }

    .el-button {
      width: 320px;
    }
  }

  .register {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 16px;

    .el-link {
      font-size: 16px;
    }

    .el-divider {
      width: 360px;
      margin-top: 140px;
      margin-bottom: 30px;
    }

    .el-divider__text {
      font-size: 16px;
      color: #8c92a4;
    }
  }

  .other {
    display: flex;
    justify-content: space-between;
    width: 320px;

    span {
      width: 32px;
      height: 32px;
    }
    i {
      font-size: 32px;
    }

    .icon-GitHub {
      color: #0a0203;
    }
    .icon-zhifubao {
      color: #06b4fd;
    }
    .icon-dingding {
      color: #3795f9;
    }
    .icon-weixin {
      color: #46d800;
    }
  }
}

.login-right {
  background: url(~@/assets/img/poster.svg) no-repeat;
  background-position: center;
  background-color: #ebf4ff;
}
</style>
