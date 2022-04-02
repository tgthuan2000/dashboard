import { User } from '../../@types'
import { FormInputs } from '../../containers/Login'
import { parseJSON, storage } from '../../utils/localstorages'
import axiosClient, { LOGIN, RE_LOGIN } from './axiosClient'

interface DataState {
    success: boolean
    user?: User
    tokenAccess?: string
}

export const login = async ({ username, password, rememberMe }: FormInputs): Promise<User | undefined> => {
    try {
        const data: DataState = await axiosClient.post(LOGIN, { username, password })
        if (data.success) {
            localStorage.setItem(storage.accessToken, JSON.stringify(data.tokenAccess))
            axiosClient.defaults.headers.common.Authorization = `Bearer ${data.tokenAccess}`
            if (rememberMe) localStorage.setItem(storage.rememberMe, JSON.stringify(true))
            else localStorage.removeItem(storage.rememberMe)
            return data.user
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const reLogin = async (): Promise<User | undefined> => {
    try {
        const accessToken = parseJSON(storage.accessToken)
        if (accessToken) {
            if (parseJSON(storage.rememberMe)) {
                axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
                const data: DataState = await axiosClient.get(RE_LOGIN)
                if (data.success) return data.user
            } else {
                localStorage.removeItem(storage.accessToken)
            }
        }
    } catch (error: any) {
        localStorage.removeItem(storage.accessToken)
        axiosClient.defaults.headers.common.Authorization = ''
        throw new Error(error.message)
    }
}
