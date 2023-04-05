<template>
    <v-chart class="chart" :option="props.data" autoresize/>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import light from '../echars-theme/light.json'
import {TitleComponent, TooltipComponent, LegendComponent} from 'echarts/components';
import {PieChart} from 'echarts/charts';
import {LabelLayout} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import VChart, {THEME_KEY} from 'vue-echarts';
import {defineProps, provide} from 'vue';

const props = defineProps(['data'])

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
]);

provide(THEME_KEY, light);

</script>

<style scoped></style>