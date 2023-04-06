export default class UpdateData {
    public static updatePaiData(data: { name: string; value: number; }[]) {
        return {
            title: {
                textAlign: 'left',
                text: 'Language Usage Time',
                textStyle: {
                    color: '#516b91'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: (data: any) => {
                    const time = data.value;
                    const hours = Math.floor(time / 3600);
                    const minutes = Math.floor(time % 3600 / 60);
                    const seconds = Math.floor(time % 60);
                    return `
                  <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${data.color};"></span>
                  ${data.name}
                  ${hours}:${minutes}:${seconds}h
                `
                }
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                top: '5%',
                right: '5%'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '80%',
                    center: ['40%', '50%'],
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
}