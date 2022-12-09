<template>
  <el-popover ref="iconPopover" trigger="click" :width="386">
    <template #reference>
      <el-button v-if="!seletedIcon">请选择图标</el-button>
      <el-button plain v-else>
        <el-icon><component :is="seletedIcon" /></el-icon>
      </el-button>
    </template>
    <div class="icon-container">
      <div class="icon-wrapper">
        <el-row>
          <el-col :span="4" v-for="item of showList" :key="item">
            <div class="icon-item" @click="handleSelectIcon(item)">
              <el-icon><component :is="item" /></el-icon>
              <div class="label-name">{{ item }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        small
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const props = defineProps<{
  icon: string;
}>();

// 图标列表
const iconList = Object.keys(ElementPlusIconsVue);
const pageSize = 36;
const currentPage = ref(1);
const total = ref(iconList.length);
// 图标弹出框
const iconPopover = ref();
// 选中图标
const seletedIcon = ref();
// 显示列表
const showList = ref(iconList.slice(0, pageSize));

const emit = defineEmits(["onSelect"]);

watch(
  () => props.icon,
  (newVal) => {
    seletedIcon.value = newVal;
  },
  { immediate: true }
);

// 选择图标
function handleSelectIcon(name: string) {
  emit("onSelect", name);
  iconPopover.value.hide();
}

// 页数改变
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  showList.value = iconList.slice((val - 1) * pageSize, val * pageSize);
};
</script>

<style lang="less" scoped>
.icon-container {
  width: 360px;

  .icon-wrapper {
    min-height: 360px;
    overflow: hidden;
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 60px;
      overflow: hidden;

      .label-name {
        width: 70%;
        font-size: 12px;
        color: #888;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .el-icon {
        width: 40px;
        height: 40px;
        font-size: 18px;
        transform: scale(1);
        transition: transform 0.2s linear;
      }
      &:hover {
        cursor: pointer;
        .el-icon {
          transform: scale(1.5);
          transition: transform 0.2s linear;
        }
      }
    }
  }
  .el-pagination {
    margin-top: 4px;
  }
}
</style>
