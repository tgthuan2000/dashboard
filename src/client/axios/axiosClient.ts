import axios from 'axios'

const axiosClient = axios.create({
    baseURL:
        import.meta.env.MODE === 'production'
            ? 'https://velzon-authenticate.herokuapp.com/auth'
            : 'http://localhost:5000/auth',
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
