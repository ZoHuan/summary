<template>
  <div class="technology-list">
    <el-row :gutter="24">
      <el-col
        :xs="24"
        :md="12"
        :xl="8"
        v-for="(item, index) in list"
        :key="index"
      >
        <el-card class="technology-card" :body-style="{ padding: '0' }">
          <div class="technology-cover">
            <img :src="item.cover" :alt="item.title" />
          </div>
          <div class="technology-body">
            <p>{{ item.title }}</p>
            <div class="technology-description">
              {{ item.description }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

defineComponent({ name: "TechnologyPage" });

const list = [
  {
    cover: "https://v2.cn.vuejs.org/images/logo.svg",
    title: "Vue",
    description:
      "是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。",
  },
  {
    cover:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
    title: "React",
    description:
      "是用于构建用户界面的JavaScript库，起源于Facebook的内部项目，该公司对市场上所有 JavaScript MVC框架都不满意，决定自行开发一套，用于架设Instagram的网站。",
  },
  {
    cover: "https://nodejs.org/static/images/logo.svg",
    title: "Node",
    description:
      "Node.js 是一个基于Chrome V8 引擎的JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型,使其轻量又高效。Node.js 的包管理器 npm,是全球最大的开源库生态系统。",
  },
  {
    cover: "https://webpack.docschina.org/site-logo.1fcab817090e78435061.svg",
    title: "Webpack",
    description:
      "webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。",
  },
  {
    cover: "https://element-plus.gitee.io/images/element-plus-logo.svg",
    title: "Element Plus",
    description: "基于 Vue 3，面向设计师和开发者的组件库",
  },
  {
    cover:
      "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    title: "Ant Design",
    description:
      "基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。",
  },
];
</script>

<style lang="less" scoped>
.technology-list {
  padding: 24px;

  .technology-card {
    margin-bottom: 16px;
    border: 1px solid #e8e8e8;
    cursor: pointer;
    .technology-cover {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 240px;
      background-color: #2b3a42;
      overflow: hidden;

      img {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 70%;
        max-height: 50%;
        border-radius: 2px 2px 0 0;
      }
    }
    .technology-body {
      padding: 24px;
      p {
        margin: 0 0 4px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .technology-description {
        height: 44px;
        line-height: 22px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        overflow: hidden;
      }
    }
  }
}
</style>
