<template>
  <div class="logo">
    <router-link :to="{ path: '/' }">
      <img src="@/assets/logo.png" alt="logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import defaultSettings from "@/config/defaultSettings";

defineComponent({ name: "LogoView" });

withDefaults(
  defineProps<{
    title?: string;
    showTitle?: boolean;
  }>(),
  {
    title: defaultSettings.title,
    showTitle: true,
  }
);
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  transition: all 0.3s;
  overflow: hidden;

  a {
    display: flex;
    align-items: center;

    img {
      height: 32px;
    }

    h1 {
      display: inline-flex;
      margin: 0 0 0 12px;
      font-size: 20px;
      font-weight: 600;
      color: #fff;
    }
  }
}
</style>
