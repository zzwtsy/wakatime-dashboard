<template>
    <v-chart class="chart" :option="props.option" autoresize/>
</template>

<script setup lang="ts">
import VChart, {THEME_KEY} from "vue-echarts";
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {provide} from "vue";
import light from "../../echars-theme/light.json";

const props = defineProps(['option'])

echarts.use([
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);

provide(THEME_KEY, light);
</script>

<style scoped>

</style>