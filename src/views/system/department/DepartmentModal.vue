<template>
  <el-dialog
    v-model="visible"
    :title="title"
    width="38%"
    draggable
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="custom-dialog"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="上级部门" prop="parentId">
        <el-tree-select
          v-model="form.parentId"
          :data="departmentList"
          :props="departmentProps"
          :render-after-expand="false"
          check-strictly
          placeholder="请选择上级部门"
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="部门编号" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel(formRef)">取消</el-button>
      <el-button @click="confirm(formRef)" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { departmentInsert, departmentUpdate } from "@/api/system/department";
import useSystem from "@/hooks/web/useSystem";
import type { FormInstance, FormRules } from "element-plus";
import type { departmentType } from "@/api/system/types";

const { departmentProps, departmentList, getDepartmentData } = useSystem();

const props = defineProps<{
  modalVisible: boolean;
  title: string;
  pattern: number;
}>();

const formRef = ref<FormInstance>();
const form = reactive({
  parentId: "",
  name: "",
  code: "",
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入部门名称！", trigger: "blur" }],
  code: [{ required: true, message: "请输入部门编号！", trigger: "blur" }],
});

// 模块显示/隐藏
const emit = defineEmits(["toggleVisible", "refresh"]);
const visible = computed({
  get() {
    return props.modalVisible;
  },
  set() {
    formRef.value?.resetFields();
    emit("toggleVisible", false);
  },
});

onMounted(() => {
  getDepartmentData();
});

// 初始化
const init = (data: departmentType) => {
  Object.assign(form, data);
};

// 取消
const cancel = (formEl: FormInstance | undefined) => {
  formEl && formEl.resetFields();
  emit("toggleVisible", false);
};

// 确定
const confirm = (formEl: FormInstance | undefined) => {
  formEl &&
    formEl.validate((valid) => {
      if (valid) {
        if (props.pattern === 1) {
          departmentInsert(form).then(() => {
            formEl.resetFields();
            emit("toggleVisible", false);
            emit("refresh");
          });
        } else {
          departmentUpdate(form).then(() => {
            formEl.resetFields();
            emit("toggleVisible", false);
            emit("refresh");
          });
        }
      }
    });
};

defineExpose({ init });
</script>
