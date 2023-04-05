import AxiosUtil from './AxiosUtil'

const parseJson = {

    async getPaiData(urls: Array<string>) {
        const data: Map<string, number> = new Map();
        for (let url of urls) {
            await AxiosUtil.get(url).then(res => {
                const languages = res[0]['languages']
                languages.forEach((element: any) => {
                    const name = element['name'];
                    const seconds = element['total_seconds'];
                    if (data.has(name)) {
                        const second = data.get(name);
                        const tempSeconds = second + seconds;
                        data.set(name, tempSeconds);
                    } else {
                        data.set(name, seconds)
                    }
                })
            })
        }
        let json = []
        for (let [k, v] of data) {
            json.push({name: k, value: v})
        }
        return json
    }
}

export default parseJson;