import AxiosUtil from '../utils/AxiosUtil'
import {DataType} from "../enum/DataType";

export default class Parse {

    /**
     * 获取多个 URL 中所有编程语言的使用时长
     * @param urls URL 数组
     * @returns JSON 数组，其中每个元素包括语言名称和使用时长
     */
    public static async getPieData(urls: Array<string>): Promise<Map<DataType, { name: string, value: number }[]>> {
        // 发起并行请求，并获取返回结果数组
        const resList: any = await Promise.all(urls.map(url => AxiosUtil.get(url)))

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
}
