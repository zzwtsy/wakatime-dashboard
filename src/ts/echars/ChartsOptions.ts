export default class ChartsOptions {
    /**
     * 设置饼图数据及标题并返回饼图配置文件
     * @param data 饼图数据
     * @param title 饼图标题
     * @returns 返回饼图配置文件
     */
    public static setPieChartsData(data: { name: string; value: number; }[], title: string) {
        return {
            title: {
                left: 'center',
                text: title,
                textStyle: {
                    color: '#516b91'
                }
            },
            tooltip: {
                trigger: 'item',
                valueFormatter: (time: number) => {
                    const hours = Math.floor(time / 3600);
                    const minutes = Math.floor(time % 3600 / 60);
                    const seconds = Math.floor(time % 60);
                    return `${hours}h ${minutes}m ${seconds}s`;
                }
            },
            legend: {
                type: 'scroll',
                top: '7%',
            },
            series: [
                {
                    name: title,
                    type: 'pie',
                    radius: '80%',
                    center: ['50%', '52%'],
                    top: '10%',
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 5,
                        borderColor: 'transparent',
                        borderWidth: 2
                    },
                    label: {
                        color: '#516b91',
                        show: true,
                        overflow: 'truncate',
                        position: 'outside',
                    },
                    labelLine: {
                        show: true,
                    },
                    data: data
                }
            ]
        }
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
                left: 'center',
                text: title,
                textStyle: {
                    color: '#516b91'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                valueFormatter: (time: number) => {
                    const hours = Math.floor(time / 3600);
                    const minutes = Math.floor(time % 3600 / 60);
                    const seconds = Math.floor(time % 60);
                    return `${hours}h ${minutes}m ${seconds}s`;
                }
            },
            legend: {
                type: 'scroll',
                top: '7%',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                data: date
            },
            series: data
        };
    }
}