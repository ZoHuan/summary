<template>
  <echarts-common width="100%" height="127px" :option="option" />
  <div class="footer">日均访问量: 256</div>
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
    boundaryGap: false,
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
      show: true,
      lineStyle: {
        color: "#ddd",
      },
    },
    data: ["8月", "9月", "10月", "11月", "12月"],
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
      name: "访问量",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      itemStyle: {
        color: "#fff",
        borderWidth: 2,
        borderColor: new echarts.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [
            {
              offset: 0,
              color: "rgba(132,222,152,1)",
            },
            {
              offset: 1,
              color: "rgba(80,160,238,1)",
            },
          ],
          false
        ),
      },
      lineStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [
            {
              offset: 0,
              color: "rgba(132,222,152,1)",
            },
            {
              offset: 1,
              color: "rgba(80,160,238,1)",
            },
          ],
          false
        ),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [
            {
              offset: 0,
              color: "rgba(132,222,152,1)",
            },
            {
              offset: 1,
              color: "rgba(80,160,238,1)",
            },
          ],
          false
        ),
      },
      data: [134, 230, 210, 182, 234, 330],
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
