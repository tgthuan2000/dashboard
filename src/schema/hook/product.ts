import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { client } from '../../client/sanity'
import { addMoreProduct, nextProductPage, prevProductPage, ProductData, useProduct } from '../../features'
import { GET_PRODUCTS } from '../query'

export const skipCount = 5

export const useGetAllProducts = () => {
    const { data, config } = useProduct()
    const dispatch = useDispatch()
    const [current, setCurrent] = useState<ProductData[]>([])
    const [loading, setLoading] = useState(true)

    const getProduct = useCallback(async () => {
        setLoading(true)
        try {
            const data: ProductData[] = await client.fetch(GET_PRODUCTS, {
                start: (config.currentPage - 1) * skipCount,
                end: config.currentPage * skipCount,
            })
            dispatch(addMoreProduct(data))
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }, [config.currentPage])

    useEffect(() => {
        if (config.currentPage <= config.page) {
            setCurrent(data.slice((config.currentPage - 1) * skipCount, config.currentPage * skipCount))
            loading && setLoading(false)
        } else {
            getProduct()
        }
    }, [getProduct, config.currentPage, config.page, data])

    const next = () => {
        dispatch(nextProductPage())
    }

    const prev = () => {
        dispatch(prevProductPage())
    }

    return {
        store: data,
        current,
        loading,
        next,
        prev,
        page: config.currentPage,
        totalPage: config.page,
        end: config.end,
    }
}
