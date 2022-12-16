<template>
  <el-card>
    <el-row justify="space-between" align="middle">
      <el-col :md="24" :lg="12">
        <div class="basics-content">
          <div class="avatar">
            <el-avatar :size="72" :src="avatar" />
          </div>
          <div class="content">
            <div class="content-title">
              {{ timeFix() }}，{{ user.name }}，<span class="welcome-text"
                >又是努力工作的一天！</span
              >
            </div>
            <div>前端工程师 | 某某科技 - 某某某事业群 - VUE平台</div>
          </div>
        </div>
      </el-col>
      <el-col :md="24" :lg="12">
        <div class="extra-content">
          <div class="stat-item">
            <div>项目数</div>
            <div class="stat-item-num">56</div>
          </div>
          <div class="stat-item">
            <div>待办数</div>
            <div class="stat-item-num">20</div>
          </div>
          <div class="stat-item">
            <div>项目访问</div>
            <div class="stat-item-num">2223</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>

  <el-row :gutter="20">
    <el-col :md="12" :lg="6">
      <el-card class="card-container">
        <template #header>
          <div class="card-header">
            <i class="iconfont icon-line"></i>
            访问量
          </div>
        </template>
        <visits-chart />
      </el-card>
    </el-col>
    <el-col :md="12" :lg="6">
      <el-card class="card-container">
        <template #header>
          <div class="card-header">
            <i class="iconfont icon-columnar"></i>
            用户量
          </div>
        </template>
        <user-chart />
      </el-card>
    </el-col>
    <el-col :md="24" :lg="12">
      <el-card class="card-container">
        <template #header>
          <div class="card-header">
            <i class="iconfont icon-information"></i>
            信息
          </div>
        </template>
        <info-table />
      </el-card>
    </el-col>
    <el-col :md="24" :lg="12">
      <el-card class="card-container">
        <template #header>
          <div class="card-header">
            <i class="iconfont icon-dynamic"></i>
            动态
          </div>
        </template>
        <dynamic-timeline />
      </el-card>
    </el-col>
    <el-col :md="12" :lg="6">
      <el-card class="card-container">
        <template #header>
          <div class="card-header">
            <i class="iconfont icon-index"></i>
            指数
          </div>
        </template>
        <index-radar />
      </el-card>
    </el-col>
    <el-col :md="12" :lg="6">
      <el-card class="card-container">
        <template #header>
          <div class="card-header">
            <i class="iconfont icon-team"></i>
            团队
          </div>
        </template>
        <team-list />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import { userStore } from "@/store/modules/user";
import { timeFix } from "@/utils/util";
import VisitsChart from "./components/VisitsChart.vue";
import UserChart from "./components/UserChart.vue";
import InfoTable from "./components/InfoTable.vue";
import DynamicTimeline from "./components/DynamicTimeline.vue";
import IndexRadar from "./components/IndexRadar.vue";
import TeamList from "./components/TeamList.vue";

defineComponent({ name: "WorkplaceView" });

const user = userStore();

const avatar = ref(require("@/assets/avatar.png"));
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 16px;

  .basics-content {
    display: flex;
    align-items: center;

    .content {
      margin-left: 24px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);

      .content-title {
        margin-bottom: 12px;
        line-height: 28px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }

  .extra-content {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .stat-item {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 120px;
      padding: 0 20px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);

      &::after {
        content: "";
        position: absolute;
        top: 8px;
        right: 0;
        width: 1px;
        height: 40px;
        background-color: #e8e8e8;
      }

      &:last-child::after {
        width: 0px;
      }

      .stat-item-num {
        margin-top: 10px;
        font-size: 24px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
}

.card-container {
  min-height: 268px;
  .card-header {
    font-size: 14px;

    i {
      margin-right: 4px;
      line-height: 1;
      font-size: 14px;
    }
  }
}
</style>
