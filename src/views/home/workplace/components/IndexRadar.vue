<template>
  <echarts-common width="100%" height="169px" :option="option" />
</template>

<script lang="ts" setup>
import EchartsCommon from "@/components/tools/EchartsCommon.vue";
import * as echarts from "echarts";

const option: echarts.EChartsOption = {
  legend: {
    icon: "circle",
    bottom: 0,
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 10,
    textStyle: {
      fontSize: 10,
      color: "#ade3ff",
      verticalAlign: "middle",
    },
    data: ["个人", "团队", "部门"],
  },
  radar: {
    radius: 56,
    center: ["50%", "50%"],
    axisName: {
      color: "#545454",
    },
    indicator: [
      { name: "引用", max: 100 },
      { name: "口碑", max: 100 },
      { name: "产量", max: 100 },
      { name: "贡献", max: 100 },
      { name: "热度", max: 100 },
    ],
  },
  series: [
    {
      name: "Budget vs spending",
      type: "radar",
      data: [
        {
          value: [70, 60, 50, 40, 60],
          name: "个人",
        },
        {
          value: [30, 70, 60, 50, 70],
          name: "团队",
        },
        {
          value: [40, 40, 40, 40, 40],
          name: "部门",
        },
      ],
    },
  ],
};
</script>
