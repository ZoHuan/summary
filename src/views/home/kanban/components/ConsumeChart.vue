<template>
  <echarts-common width="100%" height="100%" :option="option" />
</template>

<script lang="ts" setup>
import EchartsCommon from "@/components/tools/EchartsCommon.vue";
import * as echarts from "echarts";

let data = {
  xAxis: ["7月", "8月", "9月", "10月", "11月", "12月"],
  value: [4.2, 3.5, 2.9, 7.8, 5, 3],
  value1: [4, 3, 2, 8, 3, 5],
  value2: [3, 2, 3, 5, 4, 3],
};

const option: echarts.EChartsOption = {
  grid: {
    top: "10%",
    left: "2%",
    right: "0%",
    bottom: "0%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      label: {
        show: true,
      },
    },
  },
  legend: {
    top: "0",
    right: "10",
    textStyle: {
      color: "rgba(250,250,250,0.6)",
    },
  },
  xAxis: {
    axisTick: {
      show: true,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#26D9FF",
        width: 2,
      },
    },
    axisLabel: {
      show: true,
      color: "rgba(250,250,250,0.6)",
      fontSize: "0.7rem",
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ["rgba(250,250,250,0.1)", "rgba(250,250,250,0)"],
      },
    },
    data: data.xAxis,
  },
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: true,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#26D9FF",
          width: 2,
        },
      },
      axisLabel: {
        show: true,
        color: "rgba(250,250,250,0.6)",
        fontSize: "0.7rem",
      },
      splitLine: {
        show: false,
      },
    },
    {
      type: "value",
      position: "right",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        formatter: "{value} %",
        color: "rgba(250,250,250,0.6)",
        fontSize: "0.7rem",
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "消费量",
      type: "line",
      yAxisIndex: 1,
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      showAllSymbol: true,
      itemStyle: {
        color: "#1045A0",
        borderColor: "#3D7EEB",
        shadowColor: "#3D7EEB",
        shadowBlur: 4,
      },
      lineStyle: {
        color: "#3D7EEB",
        width: 2,
        shadowColor: "#3D7EEB",
        shadowBlur: 4,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(61,126,235, 0.5)" },
          { offset: 1, color: "rgba(61,126,235, 0)" },
        ]),
      },
      data: data.value,
    },
    {
      name: "美食",
      type: "bar",
      barWidth: 15,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(61,126,235, 1)" },
          { offset: 1, color: "rgba(61,126,235, 0)" },
        ]),
        borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(160,196,225, 1)" },
          { offset: 1, color: "rgba(61,126,235, 1)" },
        ]),
        borderWidth: 2,
      },
      data: data.value1,
    },
    {
      name: "住宿",
      type: "bar",
      barWidth: 15,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(15,197,243,1)" },
          { offset: 1, color: "rgba(15,197,243,0)" },
        ]),
        borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(180,240,255,1)" },
          { offset: 1, color: "rgba(15,197,243,1)" },
        ]),
        borderWidth: 2,
      },
      data: data.value2,
    },
  ],
};
</script>
