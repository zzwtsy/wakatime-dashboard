<template>
  <HeaderVue class="mb-5" />
  <SelectVue v-model="selectedOption" :options="options" />
  <BodyVue />
  <FooterVue class="mt-5" />
</template>

<script setup lang="ts">
import FooterVue from "./components/Footer.vue";
import SelectVue from "./components/Select.vue";
import BodyVue from "./components/Body.vue";
import HeaderVue from "./components/Header.vue";
import Tools from "./ts/tools/Tools";
import { onMounted, ref } from "vue";
import { getPieDataAndShow } from "./ts/service/GetPieDataAndShow";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
const selectedOption = ref("option2");

onMounted(async () => {
  const gistId = Tools.checkGistId();
  if (gistId !== false) {
    await getPieDataAndShow(gistId);
  }
});
</script>

<style scoped></style>
