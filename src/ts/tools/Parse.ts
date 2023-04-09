import { DataType } from "../enum/DataType";

export default class Parse {
  /**
   * 解析[编程语言|代码编辑器|操作系统|电脑]的时长
   * @param resList Gist 保存的 wakatime 统计数据的 json 数组
   */
  public static async parsePieData(
    resList: any
  ): Promise<Map<DataType, { name: string; value: number }[]>> {
    // 定义 Map 对象来存储不同类型数据的语言名称和总使用时长
    const dataMap: Map<DataType, { name: string; value: number }[]> = new Map();

    // 存储不同类型数据的类型值数组
    const dataTypes = [
      DataType.Languages,
      DataType.Machines,
      DataType.Editors,
      DataType.OperatingSystems,
    ];

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
      dataMap.set(
        dataType,
        Array.from(dataMapItem.entries()).map(([name, value]) => ({
          name,
          value,
        }))
      );
    }

    return dataMap;
  }

  /***
   * 解析柱状图的数据
   */
  public static parseBarData(resList: any): {
    seriesData: {
      stack: string;
      data: number[];
      name: string;
      emphasis: { focus: string };
      type: string;
    }[];
    xAxisData: string[];
  } {
    // 定义用于存储每个日期的项目名称和总时间键值对的 Map 对象
    const dateProjectMap: Map<string, Map<string, number>> = new Map();
    // 定义 Set 对象来存储所有出现过的项目名称
    const projectNames: Set<string> = new Set();

    // 遍历结果列表，计算每个日期的项目名称和总时间键值对，并将其添加到 dateProjectMap 中
    for (const input of resList) {
      const projectMap: Map<string, number> = new Map();
      for (const project of input[0].projects) {
        projectNames.add(project.name);
        projectMap.set(project.name, project.total_seconds);
      }
      const dateStr = input[0].range.date;
      dateProjectMap.set(dateStr, projectMap);
    }

    // 将所有日期作为 X 轴数据
    const xAxisData: string[] = [...dateProjectMap.keys()];
    // 定义 Map 对象用于存储每个项目在不同时间段内的总时间数组
    const dataMap: Map<string, number[]> = new Map(
      // 将 Set 对象转换为数组，然后使用映射函数获取每个项目在不同时间段内的总时间数组，并构建成键值对数组，
      // 最后使用 Map 构造函数将键值对数组转换为 Map 对象
      Array.from(projectNames, (name) => [
        name,
        Array.from(
          dateProjectMap.values(),
          (projectMap) => (projectMap.get(name) || 0) / 3600 // 将秒转换为小时
        ),
      ])
    );
    // 定义数组用于 echarts 堆叠柱状图 的 seriesData 的数据
    const seriesData = Array.from(dataMap, ([name, timeArr]) => ({
      name,
      type: "bar",
      stack: "total",
      emphasis: { focus: "series" },
      data: timeArr,
    }));

    return {
      xAxisData,
      seriesData,
    };
  }
}
