<template>
  <table class="table">
    <tr>
      <td>vue</td>
      <td>^3.2.13</td>
      <td>vite</td>
      <td>^4.0.1</td>
    </tr>
    <tr>
      <td>pinia</td>
      <td>^2.0.17</td>
      <td>vue-router</td>
      <td>^4.0.3</td>
    </tr>
    <tr>
      <td>typescript</td>
      <td>^4.5.5</td>
      <td>element-plus</td>
      <td>^2.2.17</td>
    </tr>
    <tr>
      <td>授权渠道</td>
      <td colspan="3">
        <el-tag effect="light">开源</el-tag>
      </td>
    </tr>
  </table>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.table {
  border-collapse: collapse;
  color: #666;

  td {
    padding: 9px 15px;
    border: 1px solid #e6e6e6;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;

    &:nth-child(odd) {
      width: 20%;
      text-align: right;
      background-color: #f7f7f7;
    }
  }
}
</style>
