import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import dark from "../../assets/echarts/dark.json";
import light from "../../assets/echarts/light.json";
import { PieChart, BarChart, LineChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent,
  GridComponent,
  TitleComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { EChartsCoreOption } from "echarts/core";
import { useTheme } from "../ThemeProvider";
import { useState } from "react";
import { useEffect } from "react";

type EChartsOption = EChartsCoreOption;
echarts.registerTheme("dark", dark);
echarts.registerTheme("light", light);

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  DataZoomComponent,
  ToolboxComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  LineChart,
  TitleComponent,
]);

export default function Chart({
  option,
  showLoading = false,
}: {
  option: EChartsOption;
  showLoading?: boolean;
}) {
  const [chartTheme, setChartTheme] = useState("dark");
  const { theme } = useTheme();

  const darkLoadingOption = {
    color: "#999999",
    textColor: "#d4d4d8",
    maskColor: "rgba(29,29,29,0.6)",
    zlevel: 0,
  };

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      setChartTheme(systemTheme);
    } else {
      setChartTheme(theme);
    }
  }, [theme]);

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      lazyUpdate={true}
      theme={chartTheme}
      loadingOption={darkLoadingOption}
      showLoading={showLoading}
      notMerge={true}
      style={{
        minHeight: "100%",
        width: "100%",
      }}
    />
  );
}
