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
    <div class="custom-dialog-body scroll-bar-hidden">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-divider content-position="left" border-style="dashed">
          基本信息
        </el-divider>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider content-position="left" border-style="dashed">
          权限设置
        </el-divider>
        <el-form-item label="所属部门" prop="departmentId">
          <el-tree-select
            v-model="form.departmentId"
            :data="departmentList"
            :props="departmentProps"
            :render-after-expand="false"
            check-strictly
            placeholder="请选择部门"
          />
        </el-form-item>
        <el-form-item label="所属角色" prop="roleId">
          <el-select v-model="form.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-divider content-position="left" border-style="dashed">
          其它信息
        </el-divider>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="cancel(formRef)">取消</el-button>
      <el-button @click="confirm(formRef)" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import useSystem from "@/hooks/web/useSystem";
import type { FormInstance, FormRules } from "element-plus";
import type { roleType } from "@/api/system/types";

const {
  departmentProps,
  departmentList,
  roleList,
  getDepartmentData,
  getRoleData,
} = useSystem();

const props = defineProps<{
  modalVisible: boolean;
  title: string;
  pattern: number;
}>();

const formRef = ref<FormInstance>();
const form = reactive({
  username: "",
  phone: "",
  email: "",
  gender: 1,
  departmentId: "",
  roleId: "",
  password: "",
  status: 1,
});
const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名称！", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号码！", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱地址！", trigger: "blur" }],
  departmentId: [
    { required: true, message: "请输入所属部门！", trigger: "blur" },
  ],
  roleId: [{ required: true, message: "请输入所属角色！", trigger: "blur" }],
});

onMounted(() => {
  getDepartmentData();
  getRoleData();
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
  console.log(data);

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
