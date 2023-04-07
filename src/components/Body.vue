<template>
  <div class="container mx-auto">
    <div class="flex flex-col">
      <div class="lg:flex flex-row">
        <div class="card">
          <StackedHorizontalBarVue :option="store.projectsOption" />
        </div>
      </div>
      <div class="lg:flex flex-row">
        <div class="card">
          <DoughnutChartVue :option="store.languagePieChartOption" />
        </div>
        <div class="card">
          <DoughnutChartVue :option="store.editorsOption" />
        </div>
      </div>
      <div class="lg:flex flex-row">
        <div class="card">
          <DoughnutChartVue :option="store.operatingSystemsOption" />
        </div>
        <div class="card">
          <DoughnutChartVue :option="store.machinesOption" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import StackedHorizontalBarVue from "./echarts/StackedHorizontalBar.vue";
import DoughnutChartVue from "./echarts/DoughnutChart.vue";
import { store } from "../store/Store";
</script>
<style scoped>
.card {
  @apply flex flex-1 m-1 h-96 min-w-min border border-[#d0d7de] dark:border-[#444c56] rounded-md overflow-hidden;
}
</style>
