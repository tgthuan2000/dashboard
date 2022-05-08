import { useCallback, useEffect, useState } from 'react'
import { client } from '../client/sanity'

export const useQuery = <T>(query: string, befores: T[] | undefined = [], params = {}) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T[]>([])

    const getQuery = async () => {
        setLoading(true)
        try {
            const q: T[] = await client.fetch<T[]>(query, params)
            setData([...befores, ...q])
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getQuery()
    }, [])

    return { loading, data, setData }
}

interface Params {
    start: number
    end: number
    query: string
    [key: string]: any
}
interface OptionUseQueries {
    numPerPage?: number
    queryParams?: Params | {}
}

type QueryString<Q> = (...params: (Q | null)[]) => string

interface SubQuery<Q> {
    [key: string]: Q | null
}

interface _<T, Q> {
    store: T[]
    totalPage: number
    page: number
    end: boolean
    query: QueryString<Q>
    subQueries: SubQuery<Q>
    params: Params
}

export const checkValidParams = (query: string, queries: string[]) => queries.filter((q) => !query.includes(q))

export const useQueries = <T, Q>(
    queryString: QueryString<Q>,
    { numPerPage = 5, queryParams = {} }: OptionUseQueries = { numPerPage: 5, queryParams: {} },
    initSubQueries: SubQuery<Q> = {}
) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T[]>([])
    const [_, $] = useState<_<T, Q>>({
        store: [],
        totalPage: 0,
        end: false,
        page: 1,
        query: queryString,
        subQueries: initSubQueries,
        params: {
            start: 0,
            end: numPerPage,
            query: '*',
            ...queryParams,
        },
    })

    const fetch = useCallback(async () => {
        if (_.page <= _.totalPage) {
            setData(_.store.slice((_.page - 1) * numPerPage, _.page * numPerPage))
            setLoading(false)
        } else {
            setLoading(true)
            try {
                const errs = checkValidParams(
                    _.query(...Object.values(_.subQueries)),
                    Object.keys(_.params).map((item) => `$${item}`)
                )

                if (errs.length !== 0) {
                    throw new Error(`Query invalid at ${errs}`)
                }

                const q: T[] = await client.fetch<T[]>(_.query(...Object.values(_.subQueries)), _.params)

                if (q.length > 0) {
                    $((prev) => ({
                        ...prev,
                        store: [...prev.store, ...q],
                        totalPage: prev.totalPage + 1,
                        end: q.length < numPerPage,
                    }))
                    setData(q)
                } else {
                    $((prev) => ({ ...prev, end: true, page: prev.page - 1 }))
                }
            } catch (error: any) {
                throw new Error(error.message)
            } finally {
                setLoading(false)
            }
        }
    }, [_])

    useEffect(() => {
        fetch()
    }, [fetch])

    const next = () => {
        if (!_.end || _.page < _.totalPage) {
            $((prev) => ({
                ...prev,
                page: prev.page + 1,
                params: {
                    ...prev.params,
                    start: prev.page * numPerPage,
                    end: (prev.page + 1) * numPerPage,
                },
            }))
        }
    }

    const prev = () => {
        if (_.page > 1) {
            $((prev) => ({
                ...prev,
                page: prev.page - 1,
                params: {
                    ...prev.params,
                    start: (prev.page - 2) * numPerPage,
                    end: (prev.page - 1) * numPerPage,
                },
            }))
        }
    }

    const refetch = (q: SubQuery<Q>, p?: { [p in keyof Params]?: Params[p] }, d?: (keyof Params)[]) => {
        setData([])
        $((prev) => {
            const newParams: Params = { ...prev.params, start: 0, end: numPerPage, ...p }
            d?.forEach((item) => {
                delete newParams[item]
            })
            return {
                ...prev,
                subQueries: { ...prev.subQueries, ...q },
                totalPage: 0,
                store: [],
                end: false,
                page: 1,
                params: newParams,
            }
        })
    }

    return {
        loading,
        data,
        store: _.store,
        next,
        prev,
        page: _.page,
        totalPage: _.totalPage,
        end: _.end,
        refetch,
        params: _.params,
    }
}
