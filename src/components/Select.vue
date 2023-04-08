<template>
    <div class="container mx-auto">
        <el-select @change="change" v-model="value" class="light m-1 outline-none">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            />
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import Tools from "../ts/tools/Tools";
import {getPieDataAndShow} from "../ts/service/GetPieDataAndShow";
import {store} from "../store/Store";

const value = ref(7);
const options = [
    {
        value: 7,
        label: 'Last 7 Days'
    },
    {
        value: 14,
        label: 'Last 14 Days'
    },
    {
        value: 30,
        label: 'Last 30 Days'
    },
    {
        value: 90,
        label: 'Last 90 Days'
    },
    {
        value: 365,
        label: 'Last Year'
    }
]

const change = async () => {
    store.selectValue = value.value;
    // 开启 echarts loading 动画
    store.echartsLoading = true;
    const gistId = Tools.checkGistId();
    if (gistId !== false) {
        await getPieDataAndShow(gistId);
        // 关闭 echarts loading 动画
        store.echartsLoading = false
    }
}
</script>

<style scoped>
.light {
    --el-text-color-regular: var(--text-color);
}

.el-select {
    --el-color-primary: var(--hover-border-color);
}

.el-select-dropdown__item.selected {
    --el-color-primary: var(--hover-border-color);
}
</style>