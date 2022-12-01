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
          :data="dataList"
          :props="defaultProps"
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
import type { FormInstance, FormRules } from "element-plus";
import {
  getDepartmentList,
  departmentInsert,
  departmentUpdate,
} from "@/api/system/department";
import type { departmentType } from "@/api/system/types";

const props = defineProps<{
  modalVisible: boolean;
  title: string;
  pattern: number;
}>();

const defaultProps = {
  children: "children",
  label: "name",
  value: "id",
};
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
const dataList = ref();

const emit = defineEmits(["updatedVisible", "refresh"]);
const visible = computed({
  get() {
    return props.modalVisible;
  },
  set() {
    formRef.value?.resetFields();
    emit("updatedVisible", false);
  },
});

onMounted(() => {
  getData();
});

const getData = () => {
  getDepartmentList({ name: "", code: "" }).then((res) => {
    dataList.value = res.data.result;
  });
};

const init = (data: departmentType) => {
  Object.assign(form, data);
};

const cancel = (formEl: FormInstance | undefined) => {
  formEl && formEl.resetFields();
  emit("updatedVisible", false);
};

const confirm = (formEl: FormInstance | undefined) => {
  formEl &&
    formEl.validate((valid) => {
      if (valid) {
        if (props.pattern === 1) {
          departmentInsert(form).then(() => {
            formEl.resetFields();
            emit("updatedVisible", false);
            emit("refresh");
          });
        } else {
          departmentUpdate(form).then(() => {
            formEl.resetFields();
            emit("updatedVisible", false);
            emit("refresh");
          });
        }
      }
    });
};

defineExpose({
  init,
});
</script>
