<template>
  <div class="container">
    <img src="@/assets/img/state/403.svg" alt="" />
    <el-button type="primary" class="return-button" @click="goHomeHandle"
      >返回首页</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

defineComponent({ name: "403View" });

const router = useRouter();

const goHomeHandle = () => {
  router.push({ path: "/" });
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
    width: 400px;
  }
  .return-button {
    margin-top: 40px;
    width: 160px;
    height: 36px;
  }
}
</style>
