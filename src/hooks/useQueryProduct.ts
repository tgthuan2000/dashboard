import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Product } from '../@types'
import { client } from '../client/sanity'
import {
    addMoreProduct,
    nextProductPage,
    prevProductPage,
    refetchProduct,
    ProductParams,
    useProduct,
} from '../features'
import { ProductEnum, PRODUCT_QUERY } from '../schema'
import { checkValidParams } from './useQuery'

export const skipCount = 5

const useQueryProduct = () => {
    const { data, config, params } = useProduct()
    const dispatch = useDispatch()
    const [current, setCurrent] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [queries, setQueries] = useState<(ProductEnum | undefined | '')[]>([])

    const getProduct = useCallback(async () => {
        if (config.currentPage <= config.page) {
            setCurrent(data.slice((config.currentPage - 1) * skipCount, config.currentPage * skipCount))
            setLoading(false)
        } else {
            setLoading(true)
            try {
                const errs = checkValidParams(
                    PRODUCT_QUERY(...queries),
                    Object.keys(params).map((item) => `$${item}`)
                )

                if (errs.length !== 0) {
                    throw new Error(`Query invalid at ${errs}`)
                }

                const data: Product[] = await client.fetch(PRODUCT_QUERY(...queries), params)
                dispatch(addMoreProduct(data))
            } catch (error: any) {
                throw new Error(error.message)
            } finally {
                setLoading(false)
            }
        }
    }, [config, params, data])

    useEffect(() => {
        getProduct()
    }, [getProduct])

    const next = () => {
        dispatch(nextProductPage())
    }

    const prev = () => {
        dispatch(prevProductPage())
    }

    const refetch = (
        q: ('' | undefined | ProductEnum)[],
        p: { [p in keyof ProductParams]?: ProductParams[p] },
        d: (keyof ProductParams)[] = []
    ) => {
        dispatch(refetchProduct({ params: p, deletes: d }))
        setQueries(q)
    }

    return {
        store: data,
        current,
        loading,
        next,
        refetch,
        prev,
        page: config.currentPage,
        totalPage: config.page,
        end: config.end,
        params,
    }
}
export default useQueryProduct
