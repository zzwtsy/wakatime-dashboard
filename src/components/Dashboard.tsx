import Big from "big.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Notifications, Panel, ScrollArea, Select, pushNotice } from "roku-ui";
import { getTime } from "../utils";
import { getWakaTimeBackupData, getWakaTimeBackupDataUrl } from "../api";
import { WakatimeData } from "../entity/Wakatime";
import StackedHorizontalChart from "./charts/StackedHorizontalBar";
import {
  BarSeriesDataStateType,
  BarSeriesDataType,
  ParseChartDataType,
  PieSeriesDataStateType,
  PieSeriesDataType,
} from "../types";
import DoughnutChart from "./charts/DoughnutChart";

export default function Dashboard({ gistIdOrUrl }: { gistIdOrUrl: string }) {
  const [showLoading, setShowLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    id: 7,
    name: "Last 7 days",
  });
  const [barSeriesData, setBarSeriesData] = useState<BarSeriesDataStateType>({
    seriesData: [],
    xAxisData: [],
  });
  const [pieSeriesData, setPieSeriesData] = useState<PieSeriesDataStateType>({
    editors: [],
    languages: [],
    machines: [],
    operatingSystems: [],
  });
  const options = useMemo(
    () => [
      { id: 7, name: "Last 7 days" },
      { id: 14, name: "Last 14 days" },
      { id: 30, name: "Last 30 days" },
      { id: 90, name: "Last 90 days" },
      { id: 365, name: "Last 365 days" },
    ],
    []
  );

  const handleFetchData = useCallback(async () => {
    if (!gistIdOrUrl) return;
    try {
      setShowLoading(true);
      const fetchedData = await fetchData(gistIdOrUrl, selectedValue.id);
      const parsedData = await parseData(fetchedData);
      setBarSeriesData(parsedData.projects);
      setPieSeriesData({
        editors: parsedData.editors.seriesData,
        languages: parsedData.languages.seriesData,
        machines: parsedData.machines.seriesData,
        operatingSystems: parsedData.operatingSystems.seriesData,
      });
    } catch (e: unknown) {
      if (e instanceof Error) handleFetchError(e);
    } finally {
      setShowLoading(false);
    }
  }, [gistIdOrUrl, selectedValue.id]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <>
      <Panel
        className="container"
        style={{
          backgroundColor: "transparent",
          margin: "3.81rem auto .5rem auto",
        }}
      >
        <Select
          defaultValue={selectedValue}
          options={options}
          getKey={(d) => d.name}
          setValue={setSelectedValue}
        />
        <ScrollArea>
          <div className="flex flex-col mt-2">
            <div className="flex flex-row">
              <StackedHorizontalChart
                seriesData={barSeriesData.seriesData}
                xAxisData={barSeriesData.xAxisData}
                showLoading={showLoading}
                title="Projects"
              />
            </div>
            <div className="flex flex-row mt-2 gap-2">
              <DoughnutChart
                seriesData={pieSeriesData.languages}
                showLoading={showLoading}
                title="Languages"
              />
              <DoughnutChart
                seriesData={pieSeriesData.editors}
                showLoading={showLoading}
                title="Editors"
              />
            </div>

            <div className="flex flex-row mt-2 gap-2">
              <DoughnutChart
                seriesData={pieSeriesData.operatingSystems}
                showLoading={showLoading}
                title="Operating Systems"
              />
              <DoughnutChart
                seriesData={pieSeriesData.machines}
                showLoading={showLoading}
                title="Machines"
              />
            </div>
          </div>
        </ScrollArea>
      </Panel>
      <Notifications name="error" stack={false} />
    </>
  );
}

/**
 * 从 gistID 或 URL 中获取 WakaTime API 的数据。
 *
 * @param {string} gistIdOrUrl - 要获取数据的 gist ID 或 URL。
 * @param {number} number - 用于获取的备份数据的数量。
 * @return {Promise<WakatimeData[]>} WakatimeData 数据
 */
async function fetchData(
  gistIdOrUrl: string,
  number: number
): Promise<WakatimeData[]> {
  try {
    const rawUrls = await getWakaTimeBackupDataUrl(gistIdOrUrl);
    const urls = rawUrls.slice(0, number).flatMap((rawUrl) => rawUrl.raw_url);
    const fetchedData = await getWakaTimeBackupData(urls);
    return fetchedData;
  } catch (e: unknown) {
    console.error("获取 WakaTime 备份数据失败", e);
    throw new Error(`获取 WakaTime 备份数据失败: ${(e as Error).message}`);
  }
}

async function parseData(wakatimeDatas: WakatimeData[]) {
  try {
    const dataTypes: (keyof Omit<WakatimeData, "range">)[] = [
      "projects",
      "editors",
      "languages",
      "machines",
      "operating_systems",
    ];

    const extractedData = await Promise.all(
      dataTypes.map((type) => extractData(wakatimeDatas, type))
    );
    const parsedData = extractedData.map((data) => parsePieChartData(data));
    const projectsSeriesData = parseBarChartData(extractedData[0]);

    return {
      editors: parsedData[1],
      languages: parsedData[2],
      projects: projectsSeriesData,
      machines: parsedData[3],
      operatingSystems: parsedData[4],
    };
  } catch (e: unknown) {
    console.error("解析 WakaTime 备份数据失败", e);
    throw new Error(`解析 WakaTime 备份数据失败: ${(e as Error).message}`);
  }
}

function parseBarChartData(data: ParseChartDataType[]) {
  // 总时间
  const totalTime: number[] = [];
  // 堆叠柱状图的数据
  const seriesData: BarSeriesDataType[] = [];
  // x轴日期数据
  const xAxisData: string[] = [];
  // 根据日期进行排序，将最近的日期排在前面
  const sortedData = data.sort((a, b) => getTime(b.date) - getTime(a.date));

  // 初始化 seriesData
  sortedData.forEach(({ content, date }) => {
    // 将日期添加到 xAxisData 中
    xAxisData.push(date);
    // 遍历所有项目数据
    content.forEach(({ name }) => {
      // 在 seriesData 查找是否存在当前项目数据，防止重复添加项目
      const found = seriesData.find((seriesItem) => seriesItem.name === name);
      // 如果不存在，说明当前项目没有在 seriesData 中
      // 则添加项目到 seriesData 中
      if (found === undefined) {
        seriesData.push({
          name: name,
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },
          barMaxWidth: 45,
          data: [],
        });
      }
    });
  });

  // 遍历排序后的数据，将数据添加到 seriesData 和 xAxisData 中
  // index 为日期的索引
  sortedData.forEach(({ content }, index) => {
    if (content.length === 0) {
      // 如果 projects 不存在数据，则将所有项目的使用时间设置为 0
      seriesData.forEach(({ data }) => {
        data.push(0);
      });
      // 当前日期的总时间也为 0
      totalTime[index] = 0;
    }

    // 当 projects 存在数据时将 projects 中的项目时间添加到 seriesData 中
    content.forEach(({ name, time }) => {
      // 计算当前日期所有项目的总时间
      const total = totalTime[index];
      if (total === undefined) {
        // 如果 totalTime 中不存在当前项目的总时间
        // 则将当前日期项目的总时间设置为 0
        totalTime.push(time);
      } else {
        // 如果 totalTime 中存在当前项目的总时间
        // 则将当前项目的总时间累加
        totalTime[index] = Big(total).plus(time).toNumber();
      }

      // 根据当前项目名称查找 seriesData 中的项目数据
      const found = seriesData.find((seriesItem) => seriesItem.name === name);
      // 如果存在，则将项目数据添加到 seriesData 中
      if (found !== undefined) {
        found.data.push(time);
      }
    });

    // 遍历 seriesData 中的项目数据
    seriesData.forEach(({ data }) => {
      // 如果 seriesItem.data.length 不等于 index + 1，
      // 则说明该项目在该日没有数据，将该项目的时间设置为 0
      if (data.length !== index + 1) {
        data.push(0);
      }
    });
  });

  // 将总时间添加到 seriesData 中
  seriesData.push({
    name: "Total Time",
    type: "line",
    emphasis: {
      focus: "series",
    },
    barMaxWidth: 45,
    data: totalTime,
  });

  return { seriesData, xAxisData };
}

function parsePieChartData(data: ParseChartDataType[]) {
  // 饼图的数据
  const seriesData: PieSeriesDataType[] = [];
  // 获取所有日期并将最近的日期排在前面
  data.forEach(({ content }) => {
    content.forEach(({ name, time }) => {
      const found = seriesData.find((seriesItem) => seriesItem.name === name);
      if (found === undefined) {
        seriesData.push({
          name: name,
          value: time,
        });
      } else {
        // 将时间累加
        found.value = Big(found.value).plus(time).toNumber();
      }
    });
  });

  // 根据 value 对 seriesData 排序，将时间长的项目排在前面
  const sortedSeriesData = seriesData.sort((a, b) => b.value - a.value);

  return { seriesData: sortedSeriesData };
}

/**
 * 从 WakatimeData 对象数组中提取数据
 */
function extractData(
  wakatimeDatas: WakatimeData[],
  dataType: keyof Omit<WakatimeData, "range">
) {
  return wakatimeDatas.map(({ range, [dataType]: content }) => ({
    date: range.date,
    content: content.map(({ name, total_seconds }) => ({
      name: name,
      time: total_seconds,
    })),
  }));
}

/**
 * 当有错误发生时向用户推送错误信息
 */
function handleFetchError(e: Error) {
  pushNotice({
    type: "danger",
    title: "Error",
    desc: `${e}`,
    name: "error",
  });
}
