import Tools from "../tools/Tools";

export default class ChartsOptions {
  /**
   * 设置饼图数据及标题并返回饼图配置文件
   * @param data 饼图数据
   * @param title 饼图标题
   * @returns 返回饼图配置文件
   */
  public static setPieChartsData(
    data: { name: string; value: number }[],
    title: string
  ) {
    return {
      title: {
        left: "center",
        text: title,
        textStyle: {
          color: "#516b91",
        },
      },
      tooltip: {
        trigger: "item",
        valueFormatter: (time: number) => Tools.timeConverter(time),
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
      legend: {
        type: "scroll",
        top: "7%",
      },
      series: [
        {
          name: title,
          type: "pie",
          radius: "80%",
          center: ["50%", "52%"],
          top: "10%",
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderColor: "transparent",
            borderWidth: 2,
          },
          label: {
            color: "#516b91",
            show: true,
            overflow: "truncate",
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: data,
        },
      ],
    };
  }

  /**
   * 设置柱状图数据
   * @param date 日期数组
   * @param data 柱状图数据
   * @param title 图表标题
   * @returns 返回 echarts 配置文件
   */
  public static setBarChartsData(date: string[], data: any, title: string) {
    return {
      title: {
        left: "center",
        text: title,
        textStyle: {
          color: "#516b91",
        },
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          let content = "";
          let name = params[0].name;
          for (const param of params) {
            const totalSeconds = param.value * 3600;
            if (Math.floor(totalSeconds) > 0) {
              content +=
                '<div style="margin: 0 0 0;line-height:1;">' +
                '    <div style="margin: 0 0 0;line-height:1;">' +
                `        ${param.marker}` +
                '        <span style="' +
                "                font-size:14px;" +
                "                color:#666;" +
                "                font-weight:400;" +
                '                margin-left:2px"' +
                "        >" +
                `            ${param.seriesName}` +
                "        </span>" +
                '        <span style="' +
                "                float:right;" +
                "                margin-left:20px;" +
                "                font-size:14px;" +
                "                color:#666;" +
                '                font-weight:900"' +
                "        >" +
                `            ${Tools.timeConverter(totalSeconds)}` +
                "        </span>" +
                '        <div style="clear:both"></div>' +
                "    </div>" +
                '    <div style="clear:both"></div>' +
                "</div>";
            }
          }
          if (content == "") {
            return `<span>${name}</span>`;
          }
          return `<span>${name}</span> <br/>${content}</div> <div style="clear:both"></div></div><div style="clear:both"></div></div></div>`;
        },
      },
      legend: {
        type: "scroll",
        top: "7%",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      yAxis: {
        type: "value",
      },
      xAxis: {
        type: "category",
        data: date,
      },
      series: data,
    };
  }
}
