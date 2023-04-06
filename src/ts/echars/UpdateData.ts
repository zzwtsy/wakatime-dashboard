export default class UpdateData {
    public static updatePieData(data: { name: string; value: number; }[], title: string) {
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
                    center: ['50%', '55%'],
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

    public static updateBarData(title: string) {
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
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Mail Ad',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Affiliate Ad',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Video Ad',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Search Engine',
                    type: 'bar',
                    stack: 'total',
                    itemStyle: {
                        normal: {
                            borderRadius: [5, 5, 0, 0]
                        }
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
    }
}