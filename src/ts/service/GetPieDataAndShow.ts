import {store} from "../../store/Store";
import Api from "../api/Api";
import ChartsOptions from "../echars/ChartsOptions";
import {DataType} from "../enum/DataType";
import Parse from "../tools/Parse";

/**
 * 解析 Gist 中的数据，并将数据更新到展示组件
 * @param gistId Gist Id
 */
export const getPieDataAndShow = async (gistId: string) => {
    try {
        // 获取 Gist 中所有符合条件的文件的 raw url
        const urls = await Api.getRawUrl(gistId);
        const resList = await Api.getGistPostsContent(urls.reverse().slice(0, store.selectValue));
        const pieData = await Parse.getPieData(resList);
        // TODO: 堆叠柱状图还没写
        // const {date, chartData} = Parse.getBarData(resList);
        // 获取 Gist 中所有编程语言的指定时间的使用时长
        const languages = pieData.get(DataType.Languages);
        const machines = pieData.get(DataType.Machines);
        const editors = pieData.get(DataType.Editors);
        const operatingSystems = pieData.get(DataType.OperatingSystems);

        // 更新展示组件
        // store.projectsOption = ChartsOptions.setBarChartsData(date, chartData, "Projects Code Time");
        if (languages) {
            store.languagePieChartOption = ChartsOptions.setPieChartsData(
                languages,
                "Language Usage Time"
            );
        }
        if (machines) {
            store.machinesOption = ChartsOptions.setPieChartsData(machines, "Machines");
        }
        if (editors) {
            store.editorsOption = ChartsOptions.setPieChartsData(editors, "Editors");
        }
        if (operatingSystems) {
            store.operatingSystemsOption = ChartsOptions.setPieChartsData(
                operatingSystems,
                "Operating Systems"
            );
        }
    } catch (e: any) {
        console.error(e);
        alert(`获取数据失败：${e.message}`);
        throw new Error("获取数据失败");
    }
};