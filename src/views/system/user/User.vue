<template>
  <el-card>
    <!-- 查询区域 -->
    <el-form
      :model="queryParam"
      :inline="true"
      label-width="90px"
      ref="queryForm"
    >
      <el-row :gutter="48">
        <el-col :md="8" :sm="24">
          <el-form-item label="用户名称：" prop="username">
            <el-input v-model="queryParam.username" suffix-icon="XXXX" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24">
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="queryParam.phone" suffix-icon="XXXX" />
          </el-form-item>
        </el-col>

        <template v-if="advanced">
          <el-col :md="8" :sm="24">
            <el-form-item label="所属部门：" prop="department">
              <el-tree-select
                v-model="queryParam.departmentId"
                :data="departmentList"
                :props="departmentProps"
                :render-after-expand="false"
                check-strictly
                placeholder="请选择部门"
              />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item label="所属角色：" prop="role">
              <el-select v-model="queryParam.roleId" placeholder="请选择角色">
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item label="状态：" prop="status">
              <el-select v-model="queryParam.status" placeholder="请选择状态">
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
    <el-table :data="dataList.userList" row-key="id" stripe>
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
        <template v-if="item.prop === 'gender'" #default="scope">
          {{ scope.row.gender ? "男" : "女" }}
        </template>
        <template v-else-if="item.prop === 'status'" #default="scope">
          <el-tag type="success" v-if="scope.row.status">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
        <template v-else-if="item.prop === 'actions'" #default="scope">
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
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="table-pagination">
      <el-pagination
        :current-page="queryParam.currentPage"
        :page-size="queryParam.pageSize"
        :total="dataList.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <user-modal
      :modalVisible="modalVisible"
      :modalTitle="modalTitle"
      :modalData="modalData"
      @toggleVisible="toggleVisible"
      @refresh="getData"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getUserList } from "@/api/system/system";
import useSystem from "@/hooks/web/useSystem";
import type { FormInstance } from "element-plus";
import type { UserType } from "@/types/user";
import UserModal from "./UserModal.vue";
defineComponent({ name: "RoleView" });

const {
  departmentProps,
  departmentList,
  roleList,
  getDepartmentData,
  getRoleData,
} = useSystem();

// 状态选择
const statusList = [
  { value: "1", label: "启用" },
  { value: "0", label: "禁用" },
];

// 查询表单
const queryForm = ref<FormInstance>();
// 高级搜索 展开/关闭
const advanced = ref(false);
// 查询参数
const queryParam = reactive({
  username: "",
  phone: "",
  departmentId: 0,
  roleId: 0,
  status: "",
  currentPage: 1,
  pageSize: 10,
});
// 表头
const columns = reactive([
  { label: "用户名", prop: "name", width: "180" },
  { label: "手机号", prop: "phone", width: "140" },
  { label: "邮箱", prop: "email", width: "240" },
  { label: "性别", prop: "gender", width: "90" },
  { label: "所属部门", prop: "departmentName", width: "120" },
  { label: "所属角色", prop: "roleName", width: "120" },
  { label: "状态", prop: "status", width: "90" },
  { label: "操作", prop: "actions", width: "140", fixed: "right" },
]);
// 数据
const dataList = ref({
  userList: [],
  total: 0,
});
// 模块
const modalVisible = ref(false);
const modalTitle = ref("");
const modalData = ref();

onMounted(() => {
  getDepartmentData();
  getRoleData();
  getData();
});

// 获取数据
const getData = () => {
  getUserList(queryParam).then((res) => {
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

// 页数改变
const handleSizeChange = (val: number) => {
  queryParam.pageSize = val;
};

// 页码改变
const handleCurrentChange = (val: number) => {
  queryParam.currentPage = val;
};

// 添加
const handleAdd = () => {
  modalVisible.value = true;
  modalTitle.value = "添加用户";
};

// 模块显示
const toggleVisible = (flag: boolean) => {
  modalVisible.value = flag;
};

// 编辑
const handleEdit = (data: UserType) => {
  modalVisible.value = true;
  modalTitle.value = "编辑用户";
  modalData.value = JSON.parse(JSON.stringify(data));
};

// 删除
const handleDel = () => {
  ElMessageBox.confirm("确定要删除此信息，删除后不可恢复？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    ElMessage.success("删除用户成功！");
  });
};
</script>
