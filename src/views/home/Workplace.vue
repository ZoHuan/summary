<template>
  <img src="@/assets/img/state/403.svg" alt="" />
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

defineComponent({ name: "WorkplaceView" });
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
