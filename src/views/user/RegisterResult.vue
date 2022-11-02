<template>
  <div class="container">
    <img src="@/assets/img/state/approved.svg" alt="" />
    <div class="content">{{ content }}</div>
    <el-button type="primary" class="return-button" @click="goHomeHandle"
      >返回首页</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const form = reactive({
  username: "",
});

const content = computed(() => {
  const user = form.username;
  return `你的账户：${user} 注册成功`;
});

onMounted(() => {
  form.username = route.params.username as string;
});

const goHomeHandle = () => {
  router.push({ name: "Login" });
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  img {
    width: 300px;
    height: 300px;
  }
  .content {
    font-size: 24px;
    line-height: 1.8;
    color: #000000;
  }

  .return-button {
    margin-top: 40px;
    width: 160px;
    height: 36px;
  }
}
</style>
