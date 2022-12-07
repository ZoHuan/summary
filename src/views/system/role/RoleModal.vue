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
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="角色编号" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="角色描述" prop="describe">
        <el-input v-model="form.describe" :rows="2" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel(formRef)">取消</el-button>
      <el-button @click="confirm(formRef)" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import type { roleType } from "@/api/system/types";

const props = defineProps<{
  modalVisible: boolean;
  title: string;
  pattern: number;
}>();

const formRef = ref<FormInstance>();
const form = reactive({
  name: "",
  code: "",
  describe: "",
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入角色名称！", trigger: "blur" }],
  code: [{ required: true, message: "请输入角色编号！", trigger: "blur" }],
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

// 初始化
const init = (data: roleType) => {
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
          ElMessage.success("添加角色成功！");
          emit("toggleVisible", false);
          emit("refresh");
        } else {
          ElMessage.success("编辑角色成功！");
          formEl.resetFields();
          emit("toggleVisible", false);
          emit("refresh");
        }
      }
    });
};

defineExpose({
  init,
});
</script>
