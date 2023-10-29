/**
 * 柱状图的数据类型
 */
export interface BarSeriesDataType {
  name: string;
  type: "line" | "bar";
  stack?: "total";
  emphasis: {
    focus: "series";
  };
  barMaxWidth: 45;
  data: number[];
}

/**
 * 饼图的数据类型
 */
export interface PieSeriesDataType {
  name: string;
  value: number;
}

export interface PieSeriesDataStateType {
  editors: PieSeriesDataType[];
  languages: PieSeriesDataType[];
  machines: PieSeriesDataType[];
  operatingSystems: PieSeriesDataType[];
}

export interface BarSeriesDataStateType {
  seriesData: BarSeriesDataType[];
  xAxisData: string[];
}

export interface ParseChartDataType {
  date: string;
  content: {
    name: string;
    time: number;
  }[];
}
