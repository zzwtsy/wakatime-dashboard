<script setup lang="ts">
import DoughnutChartVue from './components/DoughnutChartVue.vue';
import Api from './ts/api/Api'
import Parse from './ts/tools/Parse'
import UpdateData from './ts/echars/UpdateData';
import { ref } from "vue";
// 编程语言使用时长饼图配置文件
const languagePieChartOption = ref()

/**
 * 根据用户输入的 Gist Id 搜索对应的 Gist，并解析 Gist 中的文章数据
 * @param event 事件对象
 */
const enterSearch = async (event: any) => {
    // 获取 input 里的 gistIds
    const gistId = event.target.value;

    // 判断用户输入是否为空或者不够 32 个字符
    if (gistId == '' || gistId == null || gistId.length != 32) {
        alert("请输入 Gist Id");
        return;
    }

    // 获取 Gist 中所有符合条件的文件的 raw url
    const urls = await Api.getRawUrl(gistId);

    // 获取 Gist 中所有编程语言的使用时长
    let data = await Parse.getPieData(urls);

    // 将解析后的数据更新到展示组件
    languagePieChartOption.value = UpdateData.updatePaiData(data)
}


</script>

<template>
    <div class="container mx-auto mt-5">
        <div class="mx-auto w-80 mb-5 border border-[#d0d7de] dark:border-[#444c56] rounded-2xl overflow-hidden">
            <input @keyup.enter="enterSearch($event)" type="text" placeholder="请输入 Gist Id"
                class="w-full h-8 border-none outline-none bg-transparent text-center text-black dark:text-white">
        </div>
        <div class="flex flex-col">
            <div class="lg:flex flex-row">
                <div class="card">
                    <DoughnutChartVue :data="languagePieChartOption" />
                </div>
                <div class="card">
                    <DoughnutChartVue :data="languagePieChartOption" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    @apply flex flex-1 m-1 h-80 min-w-min border border-[#d0d7de] dark:border-[#444c56] rounded-md overflow-hidden;
}
</style>
