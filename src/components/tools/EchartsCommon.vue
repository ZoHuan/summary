<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import * as echarts from "echarts";

const props = defineProps<{
  width: string;
  height: string;
  option: echarts.EChartsOption;
}>();

const chartRef = ref<HTMLElement>();

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  echarts.dispose;
});

const initChart = () => {
  let chart = echarts.init(chartRef.value as HTMLElement);
  // 把配置和数据放这里
  chart.setOption(props.option);
  window.onresize = function () {
    //自适应大小
    chart.resize();
  };
};
</script>
