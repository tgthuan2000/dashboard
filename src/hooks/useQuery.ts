import { useCallback, useEffect, useState } from 'react'
import { client } from '../client/sanity'

export const useQuery = <T>(query: string, befores: T[] | undefined = []) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T[]>([])

    const getQuery = async () => {
        setLoading(true)
        try {
            const q: T[] = await client.fetch<T[]>(query)
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
    from: Date
    to: Date
    query: string
    [key: string]: any
}
interface OptionUseQueryPaging {
    numPerPage?: number
    queryParams?: Params | {}
}
interface _<T> {
    store: T[]
    totalPage: number
    page: number
    end: boolean
    query: string
    params: Params
}

const today = new Date()
const distance = 7 // days

const checkValidParams = (query: string, queries: string[]) => queries.filter((q) => !query.includes(q))

export const useQueryPaging = <T>(queryString: string, { numPerPage = 5, queryParams = {} }: OptionUseQueryPaging) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T[]>([])
    const [_, set] = useState<_<T>>({
        store: [],
        totalPage: 0,
        end: false,
        page: 1,
        query: queryString,
        params: {
            start: 0,
            end: numPerPage,
            from: new Date(today.getTime() - distance * 24 * 60 * 60 * 1000),
            to: today,
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
                    _.query,
                    Object.keys(_.params).map((item) => `$${item}`)
                )
                if (errs.length !== 0) {
                    throw new Error(`Query invalid at ${errs}`)
                }

                const q: T[] = await client.fetch<T[]>(_.query, _.params)

                if (q.length > 0) {
                    set((prev) => ({
                        ...prev,
                        store: [...prev.store, ...q],
                        totalPage: prev.totalPage + 1,
                        end: q.length < numPerPage,
                    }))
                    setData(q)
                } else {
                    set((prev) => ({ ...prev, end: true, page: prev.page - 1 }))
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
            set((prev) => ({
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
            set((prev) => ({
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

    const refetch = (q: string, p?: { [p in keyof Params]?: Params[p] }) => {
        setData([])
        set((prev) => {
            const newParams: Params = { ...prev.params, start: 0, end: numPerPage, ...p }
            if (!p) {
                delete newParams._id
            }
            return {
                query: q,
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
