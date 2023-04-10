<template>
  <v-chart
    class="chart"
    :option="props.option"
    :loading="store.echartsLoading"
    autoresize
  />
</template>

<script setup lang="ts">
import * as echarts from "echarts/core";
import light from "../../echars-theme/light.json";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { LOADING_OPTIONS_KEY, THEME_KEY } from "vue-echarts";
import { provide } from "vue";
import { loadingOption } from "../../ts/tools/Const";
import { store } from "../../store/Store";

const props = defineProps(["option"]);

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  ToolboxComponent,
]);

provide(THEME_KEY, light);
provide(LOADING_OPTIONS_KEY, loadingOption);
</script>

<style scoped></style>
