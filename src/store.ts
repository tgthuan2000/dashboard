import { configureStore } from '@reduxjs/toolkit'
import { account, product } from './features'

export const store = configureStore({
    reducer: { account, product },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
