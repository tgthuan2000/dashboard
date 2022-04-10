import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { User } from '../@types'
import { RootState } from '../store'
import { storage } from '../utils/localstorages'

type AccountType = {
    [Property in keyof User]?: User[Property]
}

const initialState: AccountType = {}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<User>) => {
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
