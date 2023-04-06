import AxiosUtil from '../utils/AxiosUtil'

export default class Parse {
    /**
     * 获取多个 URL 中所有编程语言的使用时长
     * @param urls URL 数组
     * @returns JSON 数组，其中每个元素包括语言名称和使用时长
     */
    public static async getPieData(urls: Array<string>): Promise<Array<{ name: string, value: number }>> {
        // 发起并行请求，并获取返回结果数组
        const resList: any = await Promise.all(urls.map(url => AxiosUtil.get(url)))

        // 定义 Map 对象来存储语言名称和总使用时长
        const data: Map<string, number> = resList.reduce((result: Map<string, number>, res: Array<any>) => {
            const languages = res[0]['languages'];
            // 迭代处理 languages 数组中的每个元素
            languages.forEach((element: any) => {
                const name = element['name'];
                const seconds = element['total_seconds'];
                // 更新或新增 Map 中对应的键值对
                result.set(name, (result.get(name) || 0) + seconds);
            })
            return result;
        }, new Map());

        // 将 Map 对象转换为 JSON 数组并返回
        return Array.from(data).map(([name, value]) => ({ name, value }));
    }
}
