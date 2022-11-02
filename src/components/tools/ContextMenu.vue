<template>
  <el-menu :style="fixed" class="contextmenu">
    <el-menu-item
      v-for="(item, index) in menuList"
      :key="index"
      :index="item.text"
      :disabled="item.disabled()"
      @click="handleClick(item)"
    >
      <el-icon><component :is="item.icon"></component></el-icon>
      <span>{{ item.text }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { ContextMenuType } from "@/types/user";

const emit = defineEmits(["select"]);

const props = defineProps<{
  left: number;
  top: number;
  menuList: Array<ContextMenuType>;
}>();

const fixed = computed(() => {
  return {
    left: props.left + "px",
    top: props.top + "px",
  };
});

const handleClick = (item: ContextMenuType) => {
  emit("select", item);
};
</script>

<style lang="less" scoped>
.contextmenu {
  position: fixed;
  width: 166px;
  z-index: 10;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgb(0 21 41 / 20%);

  .el-menu-item {
    height: 32px;
    padding-left: 16px !important;
    padding: 5px 16px;
    line-height: 32px;
  }
}
</style>
