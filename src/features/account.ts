import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { storage } from '../utils/localstorages'

export interface AccountState {
    fullName?: string
    email?: string
    phone?: string | number
    username?: string
    address?: string
    _id?: string
}

const initialState: AccountState = {}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<AccountState>) => {
            return action.payload
        },
        logout: () => {
            localStorage.removeItem(storage.accessToken)
            return {}
        },
    },
})

export const { setAccount, logout } = accountSlice.actions

export default accountSlice.reducer

export const useAccount = () => useSelector((state: RootState) => state.account)
