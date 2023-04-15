import { store } from "../../store/Store";
import Api from "../api/Api";
import ChartsOptions from "../echars/ChartsOptions";
import { DataType } from "../enum/DataType";
import Parse from "../echars/Parse";

/**
 * 解析 Gist 中的数据，并将数据更新到展示组件
 * @param gistId Gist Id
 */
export const getChartsDataAndShow = async (gistId: string) => {
  // 开启 echarts loading 动画
  store.echartsLoading = true;
  try {
    // 获取 Gist 中所有符合条件的文件的 raw url
    const urls = await Api.getRawUrl(gistId).catch((err) => {
      console.error("获取 RawURLs 失败：", err);
      throw new Error("获取 RawURLs 失败");
    });
    const resList = await Api.getGistPostsContent(
      urls.reverse().slice(0, store.selectValue)
    ).catch((err) => {
      console.error("获取 Gist 内容失败：", err);
      throw new Error("获取 Gist 内容失败");
    });
    // 获取柱状图数据
    const barData = Parse.parseBarData(resList);
    // 更新柱状图展示组件
    store.projectsOption = ChartsOptions.setBarChartsData(
      barData.xAxisData,
      barData.seriesData,
      "Projects Code Time"
    );

    const pieChartsDataList = [
      {
        key: DataType.Languages,
        title: "Language Usage Time",
        storeKey: "languagePieChartOption",
      },
      { key: DataType.Machines, title: "Machines", storeKey: "machinesOption" },
      { key: DataType.Editors, title: "Editors", storeKey: "editorsOption" },
      {
        key: DataType.OperatingSystems,
        title: "Operating Systems",
        storeKey: "operatingSystemsOption",
      },
    ];

    // 获取饼图数据
    const pieData = await Parse.parsePieData(resList);

    // 更新饼图展示组件
    pieChartsDataList.forEach((chartData) => {
      const data = pieData.get(chartData.key);

      if (data) {
        const storeKey = chartData.storeKey;
        store[storeKey] = ChartsOptions.setPieChartsData(data, chartData.title);
      }
    });
  } catch (e: any) {
    // 记录异常上下文信息
    const context = {
      type: "fetch data error",
      function: "getPieDataAndShow",
      api: "Api.getRawUrl or Api.getGistPostsContent or Parse.parsePieData",
      gistId,
      message: e.message,
      stack: e.stack,
    };
    console.error(context);
    throw new Error("获取数据失败");
  } finally {
    // 关闭 echarts loading 动画
    store.echartsLoading = false;
  }
};
