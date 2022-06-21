import queryString from 'query-string'
import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    maxContentLength: 100000000,
    maxBodyLength: 1000000000,
    paramsSerializer: params => queryString.stringify(params),
    responseEncoding: 'utf8',
})
AxiosInstance.interceptors.request.use(async(request) => request,
    (error) => Promise.reject(error)
)
AxiosInstance.interceptors.response.use(
    (response) => {
        if (response && response.data)
            return response.data

        return response
    },
    (error) => Promise.reject(error)
)

export default AxiosInstance