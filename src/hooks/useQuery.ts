import { useCallback, useEffect, useRef, useState } from 'react'
import { client } from '../client/sanity'
import { GET_BILLS } from '../schema'

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

const notIncludes = (query: string, queries: string[]) => queries.some((q) => !query.includes(q))

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
            ...queryParams,
        },
    })

    const fetch = useCallback(async () => {
        if (_.page <= _.totalPage) {
            setData(_.store.slice((_.page - 1) * numPerPage, _.page * numPerPage))
            loading && setLoading(false)
        } else {
            setLoading(true)
            try {
                if (notIncludes(_.query, ['$start', '$end', '$from', '$to'])) {
                    throw new Error('Query invalid!')
                }

                const q: T[] = await client.fetch<T[]>(_.query, _.params)

                if (q.length > 0) {
                    set({ ..._, store: [..._.store, ...q], totalPage: _.totalPage + 1, end: q.length < numPerPage })
                    setData(q)
                } else {
                    set({ ..._, end: true, page: _.page - 1 })
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
            set({
                ..._,
                page: _.page + 1,
                params: {
                    ..._.params,
                    start: _.page * numPerPage,
                    end: (_.page + 1) * numPerPage,
                },
            })
        }
    }

    const prev = () => {
        if (_.page > 1) {
            set({
                ..._,
                page: _.page - 1,
                params: {
                    ..._.params,
                    start: (_.page - 2) * numPerPage,
                    end: (_.page - 1) * numPerPage,
                },
            })
        }
    }

    const refetch = (q: string, p?: { [p in keyof Params]?: Params[p] }) => {
        const newParams: Params = { ..._.params, start: 0, end: numPerPage, ...p }
        if (q === GET_BILLS) {
            delete newParams._id
        }
        setData([])
        set({
            query: q,
            totalPage: 0,
            store: [],
            end: false,
            page: 1,
            params: newParams,
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
