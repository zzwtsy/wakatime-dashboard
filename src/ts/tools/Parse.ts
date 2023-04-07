import {DataType} from "../enum/DataType";

interface ChartData {
    name: string;
    type: "bar";
    stack: "total";
    emphasis: { focus: "series" };
    data: number[];
}

// name: string,
// type: "bar",
// stack: "total",
// emphasis: {focus: "series"},
// data: number[]

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
                for (const {name, total_seconds: seconds} of dataList) {
                    // 更新或新增 Map 中对应的键值对
                    dataMapItem.set(name, (dataMapItem.get(name) || 0) + seconds);
                }
            }

            // 将 Map 转换为 JSON 数组，并添加到总数据 Map 中
            dataMap.set(dataType, Array.from(dataMapItem.entries()).map(([name, value]) => ({name, value})));
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
// TODO: 获取堆叠柱状图数据
    public static getBarData(resList: any) {
        // 定义 X 轴数据
        const xAxisData = [];

        // 定义系列数据
        const seriesData: ChartData[] = [];

        const projectList: Map<string, Map<string, number>> = new Map;
        const projectNames: string[] = [];
        for (const res of resList) {
            const rangeNodeDate = res[0]["range"]["date"];
            const projectsNode = res[0][DataType.Projects];
            if (projectsNode) {
                for (const project of projectsNode) {
                    const {name, total_seconds: seconds} = project;
                    const projectMap: Map<string, number> = new Map;
                    projectList.set(rangeNodeDate, projectMap.set(name, seconds));
                    if (projectNames.indexOf(name) === -1) {
                        projectNames.push(name);
                    }
                }
            } else {
                projectList.set(rangeNodeDate, new Map())
            }
        }
        for (const [date, project] of projectList) {
            xAxisData.push(date);
            if (project == null) {
                for (let projectName of projectNames) {
                    seriesData.push({
                        name: projectName,
                        type: "bar",
                        stack: "total",
                        emphasis: {focus: "series"},
                        data: [0]
                    })
                }
            } else {
                for (let projectName of projectNames) {
                    const name = project.get(projectName);
                    if (name) {
                        seriesData.push({
                            name: projectName,
                            type: "bar",
                            stack: "total",
                            emphasis: {focus: "series"},
                            data: [name]
                        })
                    } else {
                        seriesData.push({
                            name: projectName,
                            type: "bar",
                            stack: "total",
                            emphasis: {focus: "series"},
                            data: [0]
                        })
                    }
                }
            }
        }
        console.log(seriesData);
    }

}

// const data: ChartData[] = [];
// data.push({
//     name: project["name"],
//     type: 'bar',
//     stack: 'total',
//     emphasis: {
//         focus: 'series'
//     },
//     data: [project["total_seconds"]]
// });
// data.some(arr => arr.name === project["name"])
// seriesData.push(data);