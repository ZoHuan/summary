<template>
  <el-dialog
    v-model="visible"
    title="菜单权限"
    width="38%"
    draggable
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="custom-dialog"
  >
    <div class="custom-dialog-body scroll-bar-hidden">
      <el-tree
        ref="treeRef"
        :data="menuList"
        :props="menuProps"
        node-key="id"
        show-checkbox
        default-expand-all
      />
    </div>

    <template #footer>
      <el-button @click="cancel()">取消</el-button>
      <el-button @click="confirm()" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import useSystem from "@/hooks/web/useSystem";

const { menuProps, menuList, getMenuData } = useSystem();

const props = defineProps<{
  modalVisible: boolean;
  modalData?: Array<number>;
}>();

const treeRef = ref();

// 模块显示/隐藏
const emit = defineEmits(["toggleVisible"]);
const visible = computed({
  get() {
    return props.modalVisible;
  },
  set() {
    cancel();
  },
});

watch(
  () => props.modalData,
  (newVal) => {
    nextTick(() => {
      treeRef.value.setCheckedKeys(newVal, false);
    });
  }
);

onMounted(() => {
  getMenuData();
});

// 取消
const cancel = () => {
  emit("toggleVisible", false);
};

// 确定
const confirm = () => {
  treeRef.value.getCheckedKeys(false);
  ElMessage.success("菜单权限配置成功！");
  emit("toggleVisible", false);
};
</script>
