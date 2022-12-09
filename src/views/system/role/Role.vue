<template>
  <el-card>
    <!-- 查询区域 -->
    <el-form :model="queryParam" :inline="true" ref="queryForm">
      <el-row :gutter="48">
        <el-col :md="8" :sm="24">
          <el-form-item label="角色名称：" prop="name">
            <el-input v-model="queryParam.name" suffix-icon="XXXX" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24">
          <el-form-item label="角色编号：" prop="code">
            <el-input v-model="queryParam.code" suffix-icon="XXXX" />
          </el-form-item>
        </el-col>

        <template v-if="advanced">
          <el-col :md="8" :sm="24">
            <el-form-item label="创建时间：" prop="date">
              <el-date-picker
                v-model="queryParam.date"
                value-format="YYYY-MM-DD"
                type="date"
              />
            </el-form-item>
          </el-col>
        </template>

        <el-col
          :md="(!advanced && 8) || 24"
          :sm="24"
          :class="advanced && 'search-advanced'"
        >
          <span>
            <el-button type="primary" @click="searchQuery">查询</el-button>
            <el-button @click="searchReset">重置</el-button>
            <a @click="toggleAdvanced" class="search-advanced-button">
              {{ advanced ? "收起" : "展开" }}
              <el-icon>
                <ArrowUp v-if="advanced" />
                <ArrowDown v-else />
              </el-icon>
            </a>
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
      <el-table-column label="序号" type="index" width="100" align="center" />
      <el-table-column
        v-for="item of columns"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :fixed="item.fixed"
        :width="item.width"
        align="center"
      >
        <template v-if="item.prop === 'actions'" #default="scope">
          <el-button
            type="primary"
            plain
            size="small"
            :disabled="scope.row.disabled"
            @click="scope.row.disabled || handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            plain
            size="small"
            :disabled="scope.row.disabled"
            @click="scope.row.disabled || handleDel()"
            >删除</el-button
          >
          <el-button
            type="warning"
            plain
            size="small"
            @click="handlePermissions(scope.row)"
          >
            菜单权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <role-modal
      :modalVisible="modalVisible"
      :modalTitle="modalTitle"
      :modalData="modalData"
      @toggleVisible="toggleVisible"
      @refresh="getData"
    />

    <!-- 菜单权限 -->
    <permissions-modal
      :modalVisible="permissionsVisible"
      :modalData="permissionsData"
      @toggleVisible="togglePermissionsVisible"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getRoleList } from "@/api/system/system";
import type { FormInstance } from "element-plus";
import type { RoleType } from "@/types/user";
import RoleModal from "./RoleModal.vue";
import PermissionsModal from "./PermissionsModal.vue";
defineComponent({ name: "RoleView" });

// 查询表单
const queryForm = ref<FormInstance>();
// 高级搜索 展开/关闭
const advanced = ref(false);
// 查询参数
const queryParam = reactive({
  name: "",
  code: "",
  date: "",
});
// 表头
const columns = reactive([
  { label: "角色名称", prop: "name", width: "140" },
  { label: "角色编号", prop: "code", width: "140" },
  { label: "角色描述", prop: "describe", width: "180" },
  { label: "创建时间", prop: "date", width: "120" },
  { label: "操作", prop: "actions", width: "230", fixed: "right" },
]);
// 数据
const dataList = ref();
// 模块
const modalVisible = ref(false);
const modalTitle = ref("");
const modalData = ref();
// 菜单权限
const permissionsVisible = ref(false);
const permissionsData = ref();

onMounted(() => {
  getData();
});

// 获取数据
const getData = () => {
  getRoleList(queryParam).then((res) => {
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

// 切换高级搜索
const toggleAdvanced = () => {
  advanced.value = !advanced.value;
};

// 添加
const handleAdd = () => {
  modalVisible.value = true;
  modalTitle.value = "添加角色";
};

// 模块显示
const toggleVisible = (flag: boolean) => {
  modalVisible.value = flag;
};

// 编辑
const handleEdit = (data: RoleType) => {
  modalVisible.value = true;
  modalTitle.value = "编辑角色";
  modalData.value = JSON.parse(JSON.stringify(data));
};

// 删除
const handleDel = () => {
  ElMessageBox.confirm("确定要删除此信息，删除后不可恢复？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    ElMessage.success("删除角色成功！");
  });
};

// 菜单权限
const handlePermissions = (data: RoleType) => {
  permissionsVisible.value = true;
  permissionsData.value = JSON.parse(JSON.stringify(data.permissions));
};

// 菜单权限模块显示
const togglePermissionsVisible = (flag: boolean) => {
  permissionsVisible.value = flag;
};
</script>
