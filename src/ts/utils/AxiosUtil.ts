import axios, { AxiosRequestConfig } from 'axios';

export default class AxiosUtil {
    /**
     * 发起 GET 请求
     * @param url 请求地址
     * @param params 请求参数
     * @returns 返回 Promise 对象，在成功时 resolve 响应数据，在失败时 reject 错误信息
     */
    public static async get<T>(url: string, params?: any): Promise<T> {
        try {
            const response = await axios.get(url, { params })
            return response.data
        } catch (error) {
            console.error(error)
            throw new Error('网络请求失败，请稍后重试')
        }
    }
    
    /**
     * 发起 POST 请求
     * @param url 请求地址
     * @param data 请求数据
     * @param config 请求配置
     * @returns 返回 Promise 对象，在成功时 resolve 响应数据，在失败时 reject 错误信息
     */
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
