import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import env from "../env"

const springAxiosInstance: AxiosInstance = axios.create({
    baseURL: env.api.MAIN_API_URL,
    timeout: 2500,
})

springAxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const userToken = localStorage.getItem('userToken')
    const requestUrl = config.url || ''

    const isPublicRequest =
        requestUrl === '/board/list' || /^\/board\/read\/\d+$/.test(requestUrl)

    if (!isPublicRequest && userToken) {
        // AxiosHeaders 인스턴스가 확실하니 set 메서드 사용
        config.headers.set('Authorization', `Bearer ${userToken}`)
    }

    return config
})

export const axiosInstance = {
    spring: springAxiosInstance,
}
