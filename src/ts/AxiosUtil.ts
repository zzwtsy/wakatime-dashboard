import axios, {AxiosRequestConfig} from 'axios';

export default class AxiosUtil {
    public static async get(url: string, params?: any): Promise<any> {
        try {
            const response = await axios.get(url, {params})
            return response.data
        } catch (error) {
            console.error(error)
            throw new Error('网络请求失败，请稍后重试')
        }
    }

    public static async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axios.post(url, data, config)
            return response.data
        } catch (error) {
            console.error(error)
            throw new Error('网络请求失败，请稍后重试')
        }
    }
}
