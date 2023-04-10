<template>
  <v-chart
    class="chart"
    :option="props.option"
    :loading="store.echartsLoading"
    autoresize
  />
</template>

<script setup lang="ts">
import VChart, { LOADING_OPTIONS_KEY, THEME_KEY } from "vue-echarts";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { BarChart, LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { provide } from "vue";
import light from "../../echars-theme/light.json";
import { store } from "../../store/Store";
import { loadingOption } from "../../ts/tools/Const";

const props = defineProps(["option"]);

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  ToolboxComponent,
]);

provide(THEME_KEY, light);
provide(LOADING_OPTIONS_KEY, loadingOption);
</script>

<style scoped></style>
