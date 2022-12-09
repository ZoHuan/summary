<template>
  <el-card>
    <!-- 查询区域 -->
    <el-form :model="queryParam" :inline="true" ref="queryForm">
      <el-row :gutter="48">
        <el-col :md="8" :sm="24">
          <el-form-item label="菜单名称：" prop="title">
            <el-input v-model="queryParam.title" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24">
          <el-form-item label="菜单地址：" prop="path">
            <el-input v-model="queryParam.path" />
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
        v-for="(item, index) of columns"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :fixed="item.fixed"
        :width="item.width"
        align="center"
      >
        <template v-if="item.prop === 'meta'" #default="scope">
          <span v-if="item.meta === 'title'">
            {{ scope.row.meta.title }}
          </span>
          <span v-else-if="item.meta === 'icon'">
            <el-icon :size="16" class="menuIcon">
              <component :is="scope.row.meta.icon" />
            </el-icon>
          </span>
          <span v-else>
            <el-tag
              type="success"
              effect="dark"
              v-if="scope.row.meta[item.meta as string]"
            >
              是
            </el-tag>
            <el-tag type="danger" effect="dark" v-else>否</el-tag>
          </span>
        </template>
        <template v-else-if="item.prop === 'actions'" #default="scope">
          <el-button
            type="primary"
            plain
            size="small"
            :disabled="scope.row.disabled"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            plain
            size="small"
            :disabled="scope.row.disabled"
            @click="handleDel()"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <menu-modal
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
import { getMenuList } from "@/api/system/system";
import type { FormInstance } from "element-plus";
import type { MenuType } from "@/types/user";
import MenuModal from "./MenuModal.vue";
defineComponent({ name: "MenuView" });

// 查询表单
const queryForm = ref<FormInstance>();
// 查询参数
const queryParam = reactive({
  title: "",
  path: "",
});
// 表头
const columns = reactive([
  { label: "菜单名称", prop: "meta", meta: "title", width: "180" },
  { label: "菜单编号", prop: "name", width: "140" },
  { label: "菜单地址", prop: "path", width: "180" },
  { label: "菜单页面路径", prop: "component", width: "280" },
  { label: "重定向页面", prop: "redirect", width: "280" },
  { label: "图标", prop: "meta", meta: "icon", width: "100" },
  { label: "是否隐藏", prop: "meta", meta: "hidden", width: "100" },
  { label: "是否固定", prop: "meta", meta: "affix", width: "100" },
  { label: "是否缓存", prop: "meta", meta: "cache", width: "100" },
  { label: "操作", prop: "actions", width: "140", fixed: "right" },
]);
// 数据
const dataList = ref();
// 模块
const modalVisible = ref(false);
const modalTitle = ref("");
const modalData = ref();

onMounted(() => {
  getData();
});

// 获取数据
const getData = () => {
  getMenuList(queryParam).then((res) => {
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
  modalTitle.value = "添加菜单";
};

// 模块显示
const toggleVisible = (flag: boolean) => {
  modalVisible.value = flag;
};

// 编辑
const handleEdit = (data: MenuType) => {
  modalVisible.value = true;
  modalTitle.value = "编辑菜单";
  modalData.value = JSON.parse(JSON.stringify(data));
};

// 删除
const handleDel = () => {
  ElMessageBox.confirm("确定要删除此信息，删除后不可恢复？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    ElMessage.success("删除菜单成功！");
  });
};
</script>

<style lang="less" scoped>
.menuIcon {
  color: var(--el-color-primary);
}
</style>
