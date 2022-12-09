<template>
  <el-dialog
    v-model="visible"
    :title="modalTitle"
    width="44%"
    draggable
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="custom-dialog"
  >
    <div class="custom-dialog-body scroll-bar-hidden">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="上级菜单" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="menuList"
            :props="menuProps"
            :render-after-expand="false"
            clearable
            check-strictly
            placeholder="请选择部门"
          />
        </el-form-item>
        <el-form-item label="菜单名称" prop="meta.title">
          <el-input v-model="form.meta.title" />
        </el-form-item>
        <el-form-item label="菜单编号" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="菜单地址" prop="path">
          <el-input v-model="form.path" />
        </el-form-item>
        <el-form-item label="菜单页面路径" prop="component">
          <el-input v-model="form.component" />
        </el-form-item>
        <el-form-item label="重定向页面" prop="redirect">
          <el-input v-model="form.redirect" />
        </el-form-item>

        <el-form-item label="图标" prop="meta.icon">
          <icon-selector :icon="form.meta.icon" @onSelect="handleSelectIcon" />
        </el-form-item>
        <el-form-item label="是否隐藏" prop="meta.hidden">
          <el-switch v-model="form.meta.hidden" />
        </el-form-item>
        <el-form-item label="隐藏子页面" prop="meta.hideChildren">
          <el-switch v-model="form.meta.hideChildren" />
        </el-form-item>
        <el-form-item label="是否固定" prop="meta.affix">
          <el-switch v-model="form.meta.affix" />
        </el-form-item>
        <el-form-item label="是否缓存" prop="meta.cache">
          <el-switch v-model="form.meta.cache" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="cancel()">取消</el-button>
      <el-button @click="confirm(formRef)" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import useSystem from "@/hooks/web/useSystem";
import type { FormInstance, FormRules } from "element-plus";
import type { MenuType } from "@/types/user";
import IconSelector from "@/components/tools/IconSelector.vue";

const { menuProps, menuList, getMenuData } = useSystem();

const props = defineProps<{
  modalVisible: boolean;
  modalTitle: string;
  modalData?: MenuType;
}>();

const formRef = ref<FormInstance>();
const form = reactive({
  parentId: "",
  name: "",
  path: "",
  component: "",
  redirect: "",
  meta: {
    title: "",
    icon: "",
    hidden: false,
    hideChildren: false,
    affix: false,
    cache: false,
  },
});
const rules = reactive<FormRules>({
  "meta.title": [
    { required: true, message: "请输入菜单名称！", trigger: "blur" },
  ],
  name: [{ required: true, message: "请输入菜单编号！", trigger: "blur" }],
  path: [{ required: true, message: "请输入菜单地址！", trigger: "blur" }],
  component: [
    { required: true, message: "请输入菜单页面路径！", trigger: "blur" },
  ],
});
const pattern = ref(1);

// 模块显示/隐藏
const emit = defineEmits(["toggleVisible", "refresh"]);
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
      pattern.value = 2;
      Object.assign(form, newVal);
    });
  }
);

onMounted(() => {
  getMenuData();
});

// 选择图标
const handleSelectIcon = (name: string) => {
  form.meta.icon = name;
};

// 取消
const cancel = () => {
  formRef.value?.resetFields();
  pattern.value = 1;
  emit("toggleVisible", false);
};

// 确定
const confirm = (formEl: FormInstance | undefined) => {
  formEl?.validate((valid) => {
    if (valid) {
      if (pattern.value === 1) {
        ElMessage.success("添加菜单成功！");
        formEl.resetFields();
        emit("toggleVisible", false);
        emit("refresh");
      } else {
        ElMessage.success("编辑菜单成功！");
        formEl.resetFields();
        emit("toggleVisible", false);
        emit("refresh");
      }
    }
  });
};
</script>
