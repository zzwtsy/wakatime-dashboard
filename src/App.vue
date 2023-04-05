<script setup lang="ts">
import DoughnutChartVue from './components/DoughnutChartVue.vue';
import Api from './ts/Api'
import parse from './ts/Parse'
import {ref} from "vue";

const paiJsonData = ref()
const updateData = (data: { name: string; value: number; }[]) => {
    console.log("data >> ", data);
    paiJsonData.value = {
        title: {
            textAlign: 'left',
            text: 'Language Usage Time',
            textStyle: {
                color: '#516b91'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: (data: any) => {
                const time = data.value;
                const hours = Math.floor(time / 3600);
                const minutes = Math.floor(time % 3600 / 60);
                const seconds = Math.floor(time % 60);
                return `
              <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${data.color};"></span>
              ${data.name}
              ${hours}:${minutes}:${seconds}h
            `
            }
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            top: '5%',
            right: '5%'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '80%',
                center: ['40%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 5,
                    borderColor: 'transparent',
                    borderWidth: 2
                },
                label: {
                    color: '#516b91',
                    show: true,
                    overflow: 'truncate',
                    position: 'outside',
                },
                labelLine: {
                    show: true,
                },
                data: data
            }
        ]
    }
}

const enterSearch = async (event: any) => {
    // 获取 input 里的 gistIds
    const gistId = event.target.value
    if (gistId == '' || gistId == null) {
        alert("请输入 Gist Id")
        return
    }
    let rawUrl: string[] = [];
    await Api.getRawUrl(gistId).then(res => {
        const files = res.files;
        let i = 0;
        //获取 gist raw url
        for (const key in files) {
            if (key.startsWith("summaries")) {
                rawUrl[i] = files[key]["raw_url"]
                i++;
            }
        }
    })
    let data = await parse.getPaiData(rawUrl);
    console.log(data);
    updateData(data)
}

</script>

<template>
    <div class="container mx-auto mt-5">
        <div class="mx-auto w-80 mb-5 border border-[#d0d7de] dark:border-[#444c56] rounded-2xl overflow-hidden">
            <input
                    @keyup.enter="enterSearch($event)"
                    type="text" placeholder="请输入 Gist Id"
                    class="w-full h-8 border-none outline-none bg-transparent text-center text-black dark:text-white"
            >
        </div>
        <div class="flex flex-col">
            <div class="lg:flex flex-row">
                <div class="card">
                    <DoughnutChartVue :data="paiJsonData"/>
                </div>
                <div class="card">
                    <DoughnutChartVue :data="paiJsonData"/>
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
