import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://admin-velzon-authenticate.herokuapp.com/auth',
    // 'http://localhost:6000/auth',
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosClient.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default axiosClient

export const LOGIN = '/login'
export const RE_LOGIN = '/re-login'
