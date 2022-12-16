<template>
  <echarts-common width="100%" height="127px" :option="option" />
  <div class="footer">用户量: 120</div>
</template>

<script lang="ts" setup>
import EchartsCommon from "@/components/tools/EchartsCommon.vue";
import * as echarts from "echarts";

const option: echarts.EChartsOption = {
  grid: {
    top: "5%",
    left: "2%",
    right: "5%",
    bottom: "0%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    axisLabel: {
      color: "#7f7f7f",
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    data: ["10时", "11时", "12时", "13时", "14时", "15时"],
  },
  yAxis: {
    type: "value",
    axisLabel: {
      color: "#7f7f7f",
    },
    axisLine: {
      lineStyle: {
        color: "#ddd",
      },
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#ddd",
      },
    },
  },
  series: [
    {
      name: "用户量",
      type: "bar",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(80,160,238,0.4)",
          },
          {
            offset: 0.25,
            color: "rgba(80,160,238,0.8)",
          },
          {
            offset: 1,
            color: "rgba(80,160,238,1)",
          },
        ]),
      },
      data: [42, 38, 48, 35, 29, 28],
    },
  ],
};
</script>

<style lang="less" scoped>
.footer {
  padding-top: 20px;
  margin-top: 5px;
  border-top: 1px solid #dcdfe6;
  font-size: 14px;
  color: #595959;
}
</style>
