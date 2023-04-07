<template>
    <div class="container mx-auto">
        <el-select @change="change" v-model="value" class="m-1 outline-none">
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
    const gistId = Tools.checkGistId();
    if (gistId !== false) {
        await getPieDataAndShow(gistId);
    }
}
</script>