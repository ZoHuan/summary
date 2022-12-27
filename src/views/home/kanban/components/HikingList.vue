<template>
  <div class="list">
    <div class="list-head">
      <span class="list-ranking">排名</span>
      <span class="list-route">徒步线路</span>
      <span class="list-city">城市</span>
      <span class="list-province">省份</span>
    </div>
    <vue3-seamless-scroll
      :list="data"
      :hover="true"
      :step="0.4"
      class="list-body"
    >
      <div class="list-item" v-for="(item, index) in data" :key="index">
        <span class="list-ranking">{{ item.ranking }}</span>
        <span class="list-route">{{ item.route }}</span>
        <span class="list-city">{{ item.city }}</span>
        <span class="list-province">{{ item.province }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let data = ref([
  { ranking: 1, route: "雨崩徒步", city: "迪庆州", province: "云南" },
  {
    ranking: 2,
    route: "腾格里沙漠徒步",
    city: "阿拉善左旗",
    province: "内蒙古",
  },
  { ranking: 3, route: "四姑娘山徒步", city: "阿坝州", province: "四川" },
  { ranking: 4, route: "贡嘎穿越", city: "贡嘎", province: "西藏" },
  { ranking: 5, route: "梅里北坡", city: "迪庆州", province: "云南" },
  { ranking: 6, route: "漓江徒步", city: "桂林", province: "广西" },
  {
    ranking: 7,
    route: "呼伦贝尔草原徒步",
    city: "呼伦贝尔",
    province: "内蒙古",
  },
  { ranking: 8, route: "青海湖徒步", city: "-", province: "青海" },
  { ranking: 9, route: "扎尕那徒步", city: "甘南州", province: "甘肃" },
  { ranking: 10, route: "南太行徒步", city: "新乡", province: "河南" },
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

  .list-ranking {
    width: 12%;
  }
  .list-route {
    width: 44%;
  }
  .list-city {
    width: 22%;
  }
  .list-province {
    width: 22%;
  }
}
</style>
