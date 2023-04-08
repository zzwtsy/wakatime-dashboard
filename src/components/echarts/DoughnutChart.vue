<template>
    <v-chart class="chart" :option="props.option" :loading="store.echartsLoading" autoresize/>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import light from '../../echars-theme/light.json'
import {TitleComponent, TooltipComponent, LegendComponent} from 'echarts/components';
import {PieChart} from 'echarts/charts';
import {LabelLayout} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import VChart, {THEME_KEY} from 'vue-echarts';
import {provide} from 'vue';
import {store} from "../../store/Store";

const props = defineProps(['option'])

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