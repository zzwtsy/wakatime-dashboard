import { PieSeriesDataType } from "../../types";
import {
  TooltipComponentOption,
  LegendComponentOption,
} from "echarts/components";
import { PieSeriesOption } from "echarts/charts";
import { Panel } from "roku-ui";
import Chart from "./Chart";
import { timeConverter } from "../../utils";
import { ComposeOption } from "echarts";

type EChartsOption = ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

export default function DoughnutChart({
  seriesData,
  showLoading = false,
  title,
}: {
  seriesData: PieSeriesDataType[];
  showLoading?: boolean;
  title: string;
}) {
  return (
    <Panel
      border
      className="flex rounded-lg overflow-hidden"
      style={{ minHeight: "350px", width: "100%" }}
    >
      <Chart option={getOption(seriesData, title)} showLoading={showLoading} />
    </Panel>
  );
}

function getOption(
  seriesData: PieSeriesDataType[],
  title: string
): EChartsOption {
  return {
    title: {
      left: "center",
      text: title,
    },
    tooltip: {
      trigger: "item",
      valueFormatter: (time) => timeConverter(time as number),
    },
    toolbox: {
      show: true,
      showTitle: false,
      feature: {
        saveAsImage: {},
      },
    },
    legend: {
      top: "8%",
      type: "scroll",
    },
    series: [
      {
        type: "pie",
        radius: [65, "75%"],
        top: "13%",
        minAngle: 5,
        avoidLabelOverlap: false,
        label: {
          show: true,
          fontWeight: 500,
        },
        labelLine: {
          show: true,
        },
        data: seriesData,
      },
    ],
  };
}
