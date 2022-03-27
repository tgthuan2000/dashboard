import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { skipCount } from '../schema/hook/product'
import { RootState } from '../store'

export interface ProductData {
    _id: string
    name: string
    image: string
    price: number
    quantity: number
    totalCount: number
}

export interface ProductConfig {
    end: boolean
    currentPage: number
    page: number
}

export interface ProductState {
    data: ProductData[]
    config: ProductConfig
}

const initialState: ProductState = {
    data: [],
    config: {
        end: false,
        page: 0,
        currentPage: 1,
    },
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addMoreProduct: (state, { payload }: PayloadAction<ProductData[]>) => {
            let config: ProductConfig = { ...state.config }
            let data: ProductData[] = [...state.data]
            if (payload.length > 0) {
                config = {
                    ...config,
                    end: payload.length < skipCount,
                    page: state.config.page + 1,
                }
                data = [...state.data, ...payload]
            } else {
                config = {
                    ...config,
                    end: true,
                }
            }

            return { config, data }
        },
        nextProductPage: (state) => {
            if (!state.config.end || state.config.currentPage < state.config.page) {
                state.config.currentPage += 1
            }
        },
        prevProductPage: (state) => {
            if (state.config.currentPage > 1) {
                state.config.currentPage -= 1
            }
        },
    },
})

export const { addMoreProduct, nextProductPage, prevProductPage } = productSlice.actions

export default productSlice.reducer

export const useProduct = () => useSelector((state: RootState) => state.product)
