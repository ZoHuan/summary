<template>
  <div class="links">
    <a href="https://cn.vuejs.org/">Vue</a>
    <a href="https://element-plus.gitee.io/zh-CN/">Element Plus</a>
  </div>
  <div class="copyright">
    Copyright
    <i class="iconfont icon-copyright"></i>
    2022 <span>ZoHuan 出品</span>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.links {
  margin-bottom: 8px;

  a {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    text-decoration: none;

    &:hover {
      color: rgba(0, 0, 0, 0.65);
    }

    &:not(:last-child) {
      margin-right: 40px;
    }
  }
}
.copyright {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
</style>
