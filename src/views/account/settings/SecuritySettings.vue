<template>
  <div class="security-settings-list">
    <div
      class="security-settings-item"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="security-list-content">
        <h4>{{ item.title }}</h4>
        <span class="security-list-description">{{ item.description }}</span>
        <span class="security-list-value">{{ item.value }}</span>
      </div>
      <div class="security-list-action" @click="item.actions.callback">
        {{ item.actions.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";

const list = reactive([
  {
    title: "账户密码",
    description: "当前密码强度：",
    value: "强",
    actions: {
      title: "修改",
      callback: () => {
        ElMessage.success("Congrats, this is a success message.");
      },
    },
  },
  {
    title: "密保手机",
    description: "已绑定手机：",
    value: "166****1040",
    actions: {
      title: "修改",
      callback: () => {
        ElMessage.success("Congrats, this is a success message.");
      },
    },
  },
  {
    title: "邮箱",
    description: "已绑定邮箱：",
    value: "4240***qq.com",
    actions: {
      title: "修改",
      callback: () => {
        ElMessage.success("Congrats, this is a success message.");
      },
    },
  },
]);
</script>

<style lang="less" scoped>
.security-settings-list {
  line-height: 1.5;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);

  .security-settings-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #e8e8e8;

    .security-list-content {
      h4 {
        margin: 0 0 4px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
        cursor: pointer;

        &:hover {
          color: var(--el-color-primary);
        }
      }
      .security-list-description,
      .security-list-value {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
      }
    }
    .security-list-action {
      color: var(--el-color-primary);
      cursor: pointer;
    }
  }
}
</style>
