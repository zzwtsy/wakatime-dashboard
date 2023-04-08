import { DataType } from "../enum/DataType";

interface ProjectData {
    name: string;
    type: string;
    stack: string;
    emphasis: { focus: string };
    data: number[];
}

export default class Parse {

    /**
     * 获取所有编程语言的使用时长
     * @param resList Gist 保存的 wakatime 统计数据的 json 数组
     * @returns JSON 数组，其中每个元素包括语言名称和使用时长
     */
    public static async getPieData(resList: any): Promise<Map<DataType, { name: string, value: number }[]>> {
        // 定义 Map 对象来存储不同类型数据的语言名称和总使用时长
        const dataMap = new Map();

        // 存储不同类型数据的类型值数组
        const dataTypes = [DataType.Languages, DataType.Machines, DataType.Editors, DataType.OperatingSystems]

        // 遍历不同类型数据
        for (const dataType of dataTypes) {
            // 定义 Map 对象来存储当前类型数据的语言名称和总使用时长
            const dataMapItem = new Map();

            // 遍历所有结果，计算当前类型数据的语言名称和总使用时长
            for (const res of resList) {
                // 获取当前类型数据的所有语言使用记录
                const dataList = res[0][dataType];

                // 遍历当前类型数据的所有语言使用记录
                for (const { name, total_seconds: seconds } of dataList) {
                    // 更新或新增 Map 中对应的键值对
                    dataMapItem.set(name, (dataMapItem.get(name) || 0) + seconds);
                }
            }

            // 将 Map 转换为 JSON 数组，并添加到总数据 Map 中
            dataMap.set(dataType, Array.from(dataMapItem.entries()).map(([name, value]) => ({ name, value })));
        }

        return dataMap;
    }

    // {
    //     name: 'Direct',
    //     type: 'bar',
    //     stack: 'total',
    //     emphasis: {
    //         focus: 'series'
    //     },
    //     data: [320, 302, 301, 334, 390, 330, 320]
    // }

    public static getBarData(resList: any) {
        const dateProjectMap = new Map();
        const projectNames = new Set();
        // 遍历所有输入对象
        for (const input of resList) {
            const projectMap = new Map();
            // 遍历输入对象中的每个项目
            for (const project of input[0].projects) {
                projectNames.add(project.name);
                projectMap.set(project.name, project.total_seconds);
            }
            // 获取该项目对应的日期
            const dateStr = input[0].range.date;
            dateProjectMap.set(dateStr, projectMap);
        }

        const xAxisData = [];
        const dataMap = new Map();
        const seriesData = [];

        for (const name of projectNames) {
            const timeArr = Array.from(dateProjectMap, ([k, v]) => v.get(name) || 0);
            dataMap.set(name, timeArr);
        }

        for (const [name, timeArr] of dataMap) {
            seriesData.push({
                name,
                type: "bar",
                stack: "total",
                emphasis: { focus: "series" },
                data: timeArr
            });
        }

        xAxisData.push(...dateProjectMap.keys());
        const result = {
            xAxisData,
            seriesData
        };

        return result;
    }

}
