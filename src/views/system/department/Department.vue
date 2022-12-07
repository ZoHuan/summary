<template>
  <el-card>
    <!-- 查询区域 -->
    <el-form :model="queryParam" :inline="true" ref="queryForm">
      <el-row :gutter="48">
        <el-col :md="8" :sm="24">
          <el-form-item label="部门名称：" prop="name">
            <el-input v-model="queryParam.name" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24">
          <el-form-item label="部门编号：" prop="code">
            <el-input v-model="queryParam.code" />
          </el-form-item>
        </el-col>

        <el-col :md="8" :sm="24">
          <span>
            <el-button type="primary" @click="searchQuery">查询</el-button>
            <el-button @click="searchReset">重置</el-button>
          </span>
        </el-col>
      </el-row>
    </el-form>

    <!-- 操作区域 -->
    <div class="table-operator">
      <el-button type="primary" class="operator-button" @click="handleAdd()">
        <el-icon><Plus /></el-icon>
        新建
      </el-button>
    </div>

    <!-- 列表 -->
    <el-table :data="dataList" row-key="id" stripe>
      <el-table-column
        label="序号"
        fixed="left"
        width="100"
        label-class-name="table-index-label"
        class-name="table-index"
      >
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="item of columns"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        align="center"
      >
        <template v-if="item.prop === 'actions'" #default="scope">
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            plain
            size="small"
            @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <department-modal
      ref="modal"
      :modalVisible="modalVisible"
      :title="modalTitle"
      :pattern="modalPattern"
      @toggleVisible="toggleVisible"
      @refresh="getData"
    />
  </el-card>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getDepartmentList, departmentDelete } from "@/api/system/department";
import type { FormInstance } from "element-plus";
import type { departmentType } from "@/api/system/types";
import DepartmentModal from "./DepartmentModal.vue";
defineComponent({ name: "DepartmentView" });

// 查询表单
const queryForm = ref<FormInstance>();
// 查询参数
const queryParam = reactive({
  name: "",
  code: "",
});
// 表头
const columns = reactive([
  { label: "部门名称", prop: "name" },
  { label: "部门编号", prop: "code" },
  { label: "操作", prop: "actions" },
]);
// 数据
const dataList = ref();
// 模块
const modal = ref();
const modalVisible = ref(false);
const modalTitle = ref("");
const modalPattern = ref(1);

onMounted(() => {
  getData();
});

// 获取数据
const getData = () => {
  getDepartmentList(queryParam).then((res) => {
    dataList.value = res.data.result;
  });
};

// 搜索查询
const searchQuery = () => {
  getData();
};
// 搜索重置
const searchReset = () => {
  if (!queryForm.value) return;
  queryForm.value.resetFields();
};

// 添加
const handleAdd = () => {
  modalVisible.value = true;
  modalTitle.value = "添加部门";
  modalPattern.value = 1;
};

// 模块显示
const toggleVisible = (flag: boolean) => {
  modalVisible.value = flag;
};

// 编辑
const handleEdit = (data: departmentType) => {
  modalVisible.value = true;
  modalTitle.value = "编辑部门";
  modalPattern.value = 2;
  modal.value?.init(data);
};

// 删除
const handleDel = (data: departmentType) => {
  ElMessageBox.confirm("确定要删除此信息，删除后不可恢复？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    return departmentDelete(data).then((res) => {
      ElMessage.success(res.data.message);
      getData();
    });
  });
};
</script>
