<template>
  <echarts-common width="100%" height="100%" :option="option" />
</template>

<script lang="ts" setup>
import EchartsCommon from "@/components/tools/EchartsCommon.vue";
import * as echarts from "echarts";

let data = {
  xAxis: ["7月", "8月", "9月", "10月", "11月", "12月"],
  value: ["40", "60", "22", "85", "50", "40"],
  value1: ["20", "50", "12", "65", "30", "60"],
};

const option: echarts.EChartsOption = {
  grid: {
    top: "10%",
    left: "3%",
    right: "4%",
    bottom: "0%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    type: "plain",
    top: "0",
    right: "10",
    itemGap: 25,
    itemWidth: 20,
    itemHeight: 4,
    icon: "roundRect",
    textStyle: {
      color: "#7ec7ff",
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#233653",
      },
    },
    axisLabel: {
      color: "#7ec7ff",
      fontSize: "0.7rem",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#192a44",
      },
    },
    data: data.xAxis,
  },
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#233653",
        },
      },
      axisLabel: {
        show: true,
        color: "#7ec7ff",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#192a44",
        },
      },
    },
  ],
  series: [
    {
      name: "计划客流量",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 0,
      showAllSymbol: true,
      itemStyle: {
        color: "rgba(25,163,223,1)",
        borderColor: "#646ace",
        borderWidth: 2,
      },
      lineStyle: {
        width: 3,
        color: "rgba(25,163,223,1)",
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(25,163,223,.3)" },
          { offset: 1, color: "rgba(25,163,223, 0)" },
        ]),
        shadowColor: "rgba(25,163,223, 0.5)",
        shadowBlur: 20,
      },
      data: data.value,
    },
    {
      name: "实际客流量",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 0,
      showAllSymbol: true,
      itemStyle: {
        color: "rgba(10,219,250,1)",
        borderColor: "#646ace",
        borderWidth: 2,
      },
      lineStyle: {
        width: 3,
        color: "rgba(10,219,250,1)",
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(10,219,250,.3)" },
          { offset: 1, color: "rgba(10,219,250, 0)" },
        ]),
        shadowColor: "rgba(10,219,250, 0.5)",
        shadowBlur: 20,
      },
      data: data.value1,
    },
  ],
};
</script>
