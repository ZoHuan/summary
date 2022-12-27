<template>
  <div class="list">
    <div class="list-head">
      <span class="list-order">序号</span>
      <span class="list-route">路线</span>
      <span class="list-province">省份</span>
    </div>
    <vue3-seamless-scroll
      :list="data"
      :hover="true"
      :step="0.4"
      class="list-body"
    >
      <div class="list-item" v-for="(item, index) in data" :key="index">
        <span class="list-order">{{ item.order }}</span>
        <span class="list-route">{{ item.route }}</span>
        <span class="list-province">{{ item.province }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let data = ref([
  { order: 1, route: "318川藏线自驾", province: "四川/西藏" },
  { order: 2, route: "甘南陇南环线自驾", province: "甘肃" },
  { order: 3, route: "黔东南大环线自驾", province: "贵州" },
  { order: 4, route: "独库公路自驾", province: "新疆" },
  { order: 5, route: "呼伦贝尔草原自驾", province: "内蒙古" },
  { order: 6, route: "伊昭公路自驾", province: "新疆" },
  { order: 7, route: "广东沿海自驾", province: "广东" },
  { order: 8, route: "海南环岛自驾", province: "海南" },
  { order: 9, route: "青甘大环线自驾", province: "青海/甘肃" },
  { order: 10, route: "香格里拉自驾", province: "云南" },
]);
</script>

<style lang="less" scoped>
.list {
  height: 100%;
  overflow: hidden;
  .list-head {
    height: 1.5rem;
    border: 1px solid #132b57;
    border-radius: 5px 5px 0 0;
    background-color: #0d1d41;
    line-height: 1.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }

  .list-body {
    height: calc(100% - 1.5rem);
    overflow: hidden;
    .list-item {
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 0.8rem;

      &:nth-child(even) {
        background-color: #0d1d41;
      }

      span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .list-order {
    width: 20%;
  }
  .list-route {
    width: 50%;
  }
  .list-province {
    width: 30%;
  }
}
</style>
