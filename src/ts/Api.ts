import AxiosUtil from './AxiosUtil'

export default class api {
    public static getRawUrl(gistId: string): Promise<any> {
        // https://api.github.com/gists/
        return AxiosUtil.get(`https://api.github.com/gists/${gistId}`)
    }
}