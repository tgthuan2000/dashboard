import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { Product } from '../@types'
import { skipCount } from '../hooks'
import { RootState } from '../store'

export interface ProductConfig {
    end: boolean
    currentPage: number
    page: number
}

export interface ProductState {
    data: Product[]
    config: ProductConfig
    params: ProductParams
}

export interface ProductParams {
    query: string
    start: number
    end: number
    idStatus?: string | undefined
    idCategory?: string | undefined
}

const initialState: ProductState = {
    data: [],
    config: {
        end: false,
        page: 0,
        currentPage: 1,
    },
    params: {
        query: '*',
        start: 0,
        end: skipCount,
    },
}

interface PayLoadRefetch {
    params: { [p in keyof ProductParams]?: ProductParams[p] }
    deletes: (keyof ProductParams)[]
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addMoreProduct: (state, { payload }: PayloadAction<Product[]>) => {
            let config: ProductConfig = { ...state.config }
            let data: Product[] = [...state.data]
            let params: ProductParams = { ...state.params }

            if (payload.length > 0) {
                config = { ...config, end: payload.length < skipCount, page: state.config.page + 1 }
                data = [...state.data, ...payload]
            } else {
                config = { ...config, end: true, currentPage: state.config.currentPage - 1 }
                params = {
                    ...params,
                    start: (state.config.currentPage - 1) * skipCount,
                    end: state.config.currentPage * skipCount,
                }
            }

            return { params, config, data }
        },
        nextProductPage: (state) => {
            if (!state.config.end || state.config.currentPage < state.config.page) {
                state.config.currentPage += 1
                state.params = {
                    ...state.params,
                    start: (state.config.currentPage - 1) * skipCount,
                    end: state.config.currentPage * skipCount,
                }
            }
        },
        prevProductPage: (state) => {
            if (state.config.currentPage > 1) {
                state.config.currentPage -= 1
                state.params = {
                    ...state.params,
                    start: (state.config.currentPage - 1) * skipCount,
                    end: state.config.currentPage * skipCount,
                }
            }
        },
        refetchProduct: (state, { payload }: PayloadAction<PayLoadRefetch>) => {
            const params = { ...state.params }
            if (payload.deletes.length !== 0) {
                payload.deletes.forEach((delItem) => {
                    delete params[delItem]
                })
            }
            return { ...initialState, params: { ...params, start: 0, end: skipCount, ...payload.params } }
        },
    },
})

export const { addMoreProduct, nextProductPage, prevProductPage, refetchProduct } = productSlice.actions

export default productSlice.reducer

export const useProduct = () => useSelector((state: RootState) => state.product)
