<template>
  <el-timeline>
    <el-timeline-item
      v-for="(item, index) in dynamics"
      :key="index"
      :timestamp="item.timestamp"
    >
      {{ item.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts" setup>
const dynamics = [
  {
    content: "系统管理模块完成（部门管理、角色管理、用户管理、菜单管理）",
    timestamp: "2022-12-09",
  },
  {
    content: "个人页模块完成",
    timestamp: "2022-11-10",
  },
  {
    content: "基础框架构建完成",
    timestamp: "2022-10-31",
  },
];
</script>
