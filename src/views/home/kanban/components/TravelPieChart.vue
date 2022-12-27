<template>
  <echarts-common width="100%" height="100%" :option="option" />
</template>

<script lang="ts" setup>
import EchartsCommon from "@/components/tools/EchartsCommon.vue";
import * as echarts from "echarts";

let data = [
  { name: "航空", value: 74 },
  { name: "铁路", value: 56 },
  { name: "轮渡", value: 30 },
  { name: "高速", value: 67 },
];

let seriesData: echarts.PieSeriesOption[] = [];
data.forEach((item, index) => {
  let outerRing = 88 - index * 15 + "%";
  let innerRing = 78 - index * 15 + "%";

  seriesData.push({
    type: "pie",
    hoverAnimation: false,
    radius: [innerRing, outerRing],
    label: {
      show: false,
    },
    labelLine: {
      show: false,
    },
    data: [
      {
        value: item.value,
        name: item.name,
      },
      {
        value: 100 - item.value,
        name: "总数",
        tooltip: { show: false },
        itemStyle: { color: "rgba(0,0,0,0)" },
        label: { show: false },
        labelLine: { show: false },
        emphasis: { disabled: true },
      },
    ],
  });
});

const option: echarts.EChartsOption = {
  color: ["#158DF8", "#FF6902", "#4C1DD8", "#B60EED"],
  tooltip: {
    show: true,
    formatter: "{b} : {c}",
  },
  legend: {
    top: "5%",
    left: "36%",
    itemGap: 8,
    itemWidth: 0,
    itemHeight: 0,
    align: "right",
    orient: "vertical",
    selectedMode: true,
    textStyle: {
      color: "#fff",
      fontSize: "0.66rem",
    },
    data: ["航空", "铁路", "轮渡", "高速"],
  },
  series: seriesData,
};
</script>
