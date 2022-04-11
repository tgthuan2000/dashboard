import { configureStore } from '@reduxjs/toolkit'
import { account } from './features'

export const store = configureStore({
    reducer: { account },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
