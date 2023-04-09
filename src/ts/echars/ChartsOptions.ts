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
        valueFormatter: (time: number) => {
          const hours = Math.floor(time / 3600);
          const minutes = Math.floor((time % 3600) / 60);
          const seconds = Math.floor(time % 60);
          return `${hours}h ${minutes}m ${seconds}s`;
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
   * @param date
   * @param data
   * @param title 图表标题
   * @returns 返回 echarts 配置文件
   */
  public static setBarChartsData(date: any, data: any, title: string) {
    return {
      title: {
        left: "center",
        text: title,
        textStyle: {
          color: "#516b91",
        },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          let content = "";
          let name = "";
          for (const param of params) {
            name = param.name;
            if (param.value > 0) {
              const totalSeconds = param.value * 3600;
              const hours = Math.floor(totalSeconds / 3600);
              const minutes = Math.floor((totalSeconds % 3600) / 60);
              const seconds = Math.floor(totalSeconds % 60);
              content +=
                '<div style="margin: 0 0 0;line-height:1;">\n' +
                '    <div style="margin: 0 0 0;line-height:1;">\n' +
                `        ${param.marker}\n` +
                '        <span style="\n' +
                "                font-size:14px;\n" +
                "                color:#666;\n" +
                "                font-weight:400;\n" +
                '                margin-left:2px"\n' +
                "        >\n" +
                `            ${param.seriesName}\n` +
                "        </span>\n" +
                '        <span style="\n' +
                "                float:right;\n" +
                "                margin-left:20px;\n" +
                "                font-size:14px;\n" +
                "                color:#666;\n" +
                '                font-weight:900"\n' +
                "        >\n" +
                `            ${hours}h ${minutes}m ${seconds}s\n` +
                "        </span>\n" +
                '        <div style="clear:both"></div>\n' +
                "    </div>\n" +
                '    <div style="clear:both"></div>\n' +
                "</div>";
            }
          }
          if (content == "") {
            console.log("name >>", name);
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
