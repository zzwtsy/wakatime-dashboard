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
import {store} from "./store/Store";

onMounted(async () => {
    // 开启 echarts loading 动画
    store.echartsLoading = true;
    const gistId = Tools.checkGistId();
    if (gistId !== false) {
        await getPieDataAndShow(gistId);
        // 关闭 echarts loading 动画
        store.echartsLoading = false
    }
});
</script>

<style scoped></style>
