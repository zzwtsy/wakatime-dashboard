<template>
  <HeaderVue class="mb-5" />
  <ShowName class="mt-20 mb-5" />
  <Select />
  <BodyVue />
  <FooterVue class="mt-5" />
</template>

<script setup lang="ts">
import FooterVue from "./components/Footer.vue";
import BodyVue from "./components/Body.vue";
import HeaderVue from "./components/Header.vue";
import Tools from "./ts/tools/Tools";
import { onMounted } from "vue";
import { getChartsDataAndShow } from "./ts/service/GetChartsDataAndShow";
import Select from "./components/Select.vue";
import ShowName from "./components/ShowName.vue";
import { InputType } from "./ts/enum/InputType";

onMounted(async () => {
  const url = Tools.isURL();

  if (url !== false) {
    await getChartsDataAndShow(url, InputType.Url);
    return;
  }

  const gistId = Tools.isGistId();
  if (gistId !== false) {
    await getChartsDataAndShow(gistId, InputType.GistId);
  }
});
</script>

<style scoped></style>
