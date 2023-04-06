<template>
    <header class="mb-5">
        <nav class="flex justify-center items-center relative w-screen h-16 border-b border-[#d0d7de] dark:border-[#444c56]">
            <div class="absolute flex items-center left-60">
                <a href="https://github.com/zzwtsy/vue-echars"
                   class="ml-2 font-medium text-[#d0d7de] dark:text-[#444c56] hover:text-[#444c56] dark:hover:text-[#d0d7de]"
                >
                    <span class="flex flex-row justify-center items-center">
                        <IconGithub class="github-icon h-8 fill-[#d0d7de] dark:fill-[#444c56] mr-2"/>
                        wakatime-dashboard-vue
                    </span>
                </a>
            </div>
            <div class="flex items-center mx-auto w-80 border border-[#d0d7de] dark:border-[#444c56] rounded-2xl overflow-hidden">
                <input @keyup.enter="enterSearch($event)" type="text" placeholder="请输入 Gist Id"
                       class="w-full h-8 border-none outline-none bg-transparent text-center text-black dark:text-white">
            </div>
            <ChangeTheme class="flex absolute items-center right-60"/>
        </nav>
    </header>
    <div class="container mx-auto">
        <div class="flex flex-col">
            <div class="lg:flex flex-row">
                <div class="card">
                    <StackedHorizontalBar :option="projectsOption"/>
                </div>
            </div>
            <div class="lg:flex flex-row">
                <div class="card">
                    <DoughnutChartVue :option="languagePieChartOption"/>
                </div>
                <div class="card">
                    <DoughnutChartVue :option="editorsOption"/>
                </div>
            </div>
            <div class="lg:flex flex-row">
                <div class="card">
                    <DoughnutChartVue :option="operatingSystemsOption"/>
                </div>
                <div class="card">
                    <DoughnutChartVue :option="machinesOption"/>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
</template>

<script setup lang="ts">
import DoughnutChartVue from './components/DoughnutChart.vue';
import Api from './ts/api/Api'
import Parse from './ts/tools/Parse'
import UpdateData from './ts/echars/UpdateData';
import Tools from './ts/tools/Tools'
import {DataType} from "./ts/enum/DataType";
import {onMounted, ref} from "vue";
import StackedHorizontalBar from "./components/StackedHorizontalBar.vue";
import ChangeTheme from "./components/ChangeTheme.vue";
import IconGithub from "./components/icons/IconGithub.vue";
import Footer from "./components/Footer.vue";

// 编程语言使用时长饼图配置文件
const languagePieChartOption = ref()
const operatingSystemsOption = ref();
const machinesOption = ref();
const editorsOption = ref();
const projectsOption = ref();

/**
 * 解析 Gist 中所有编程语言的使用时长，并将数据更新到展示组件
 * @param gistId Gist Id
 */
const getPieDataAndShow = async (gistId: string) => {
    try {
        // 获取 Gist 中所有符合条件的文件的 raw url
        const urls = await Api.getRawUrl(gistId);

        // 获取 Gist 中所有编程语言的使用时长
        const data = await Parse.getPieData(urls);

        const languages = data.get(DataType.Languages);
        const machines = data.get(DataType.Machines);
        const editors = data.get(DataType.Editors);
        const operatingSystems = data.get(DataType.OperatingSystems);

        // test
        projectsOption.value = UpdateData.updateBarData("Projects Code Time");

        // 更新展示组件
        if (languages) {
            languagePieChartOption.value = UpdateData.updatePieData(languages, "Language Usage Time");
        }
        if (machines) {
            machinesOption.value = UpdateData.updatePieData(machines, "Machines");
        }
        if (editors) {
            editorsOption.value = UpdateData.updatePieData(editors, "Editors")
        }
        if (operatingSystems) {
            operatingSystemsOption.value = UpdateData.updatePieData(operatingSystems, "Operating Systems")
        }
    } catch (e: any) {
        console.error(e);
        alert(`获取数据失败：${e.message}`);
        throw new Error("获取数据失败")
    }
}

/**
 * 根据用户输入的 Gist Id 搜索对应的 Gist，并解析 Gist 中的文章数据
 * @param event 事件对象
 */
const enterSearch = async (event: any) => {
    // 获取 input 里的 gistIds
    let gistId = event.target.value.trim();

    const checkGistId = Tools.checkGistId(gistId);

    if (checkGistId == false) {
        alert("请输入 Gist Id");
        return;
    }

    gistId = checkGistId

    await getPieDataAndShow(gistId)
}

onMounted(async () => {
    const gistId = Tools.checkGistId();
    if (gistId !== false) {
        await getPieDataAndShow(gistId);
    }
})

</script>

<style scoped>
.card {
    @apply flex flex-1 m-1 h-96 min-w-min border border-[#d0d7de] dark:border-[#444c56] rounded-md overflow-hidden;
}
</style>
