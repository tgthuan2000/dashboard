import { FormInputs } from '../../containers/Login'
import { AccountState } from '../../features'
import { parseJSON, storage } from '../../utils/localstorages'
import axiosClient, { LOGIN, RE_LOGIN } from './axiosClient'

interface DataState {
    success: boolean
    user?: AccountState
    tokenAccess?: string
}
export const login = async ({ username, password, rememberMe }: FormInputs): Promise<AccountState | undefined> => {
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

export const reLogin = async (): Promise<AccountState | undefined> => {
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
