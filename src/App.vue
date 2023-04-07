<template>
    <HeaderVue class="mb-5"/>
    <Select/>
    <BodyVue/>
    <FooterVue class="mt-5"/>
</template>

<script setup lang="ts">
import FooterVue from "./components/Footer.vue";
import BodyVue from "./components/Body.vue";
import HeaderVue from "./components/Header.vue";
import Tools from "./ts/tools/Tools";
import {onMounted} from "vue";
import {getPieDataAndShow} from "./ts/service/GetPieDataAndShow";
import Select from "./components/Select.vue";

onMounted(async () => {
    const gistId = Tools.checkGistId();
    if (gistId !== false) {
        await getPieDataAndShow(gistId);
    }
});
</script>

<style scoped></style>
