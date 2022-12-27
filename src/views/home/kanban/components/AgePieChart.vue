<template>
  <echarts-common width="100%" height="100%" :option="option" />
</template>

<script lang="ts" setup>
import EchartsCommon from "@/components/tools/EchartsCommon.vue";
import * as echarts from "echarts";

let data = [
  { name: "18岁以下", value: "19" },
  { name: "18岁~25岁", value: "67" },
  { name: "25岁~35岁", value: "100" },
  { name: "35岁~45岁", value: "73" },
  { name: "45岁~55岁", value: "43" },
  { name: "55岁以上", value: "21" },
];

const colorList = [
  "#00ffff",
  "#00cfff",
  "#006ced",
  "#ffe000",
  "#ffa800",
  "#ff5b00",
];
const colorAlpha = [
  "rgba(0, 255, 255, 0.05)",
  "rgba(0, 207, 255, 0.05)",
  "rgba(0, 108, 237, 0.05)",
  "rgba(255, 224, 0, 0.05)",
  "rgba(255, 168, 0, 0.05)",
  "rgba(255, 91, 0, 0.05)",
];

let optionData: echarts.PieSeriesOption[] = [];
data.forEach((item, index) => {
  optionData.push({
    name: item.name,
    value: item.value,
    itemStyle: {
      color: colorAlpha[index],
      borderColor: colorList[index],
      borderWidth: 2,
      shadowBlur: 20,
      shadowColor: colorList[index],
    },
  });
});

const option: echarts.EChartsOption = {
  tooltip: {
    trigger: "item",
    formatter: "{b} : {d}%",
  },
  polar: {},
  angleAxis: {
    type: "category",
    interval: 1,
    z: 10,
    axisLine: {
      show: false,
    },
  },
  radiusAxis: {
    min: 0,
    max: 100,
    interval: 20,
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: "#07385e",
        width: 2,
        type: "dashed",
      },
    },
  },
  series: [
    {
      type: "pie",
      radius: "80%",
      roseType: "radius",
      startAngle: 90,
      label: {
        formatter: ["{b|{b}}", "{d|{d}%}"].join("\n"),
        rich: {
          b: {
            color: "#3bd2fe",
            fontSize: "0.7rem",
            lineHeight: 20,
          },
          d: {
            color: "#d0fffc",
            fontSize: "0.7rem",
            height: 20,
          },
        },
      },
      labelLine: {
        show: true,
        length2: 10,
        lineStyle: {
          color: "#0096b1",
        },
      },
      data: optionData,
    },
  ],
};
</script>
