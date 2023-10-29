export default interface StackedHorizontalBarSeriesData {
  name: string;
  type: string;
  stack: string;
  emphasis: {
    focus: string;
  };
  data: number[];
}

