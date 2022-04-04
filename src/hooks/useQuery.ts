import { useCallback, useEffect, useRef, useState } from 'react'
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
    [key: string]: any
}
interface OptionUseQueryPaging {
    numPerPage?: number
    queryParams?: Params | {}
}

const today = new Date()
const distance = 7 // days

const notIncludes = (query: string, queries: string[]) => queries.some((q) => !query.includes(q))

export const useQueryPaging = <T>(queryString: string, { numPerPage = 5, queryParams = {} }: OptionUseQueryPaging) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T[]>([])
    const store = useRef<T[]>([])
    const totalPage = useRef(0)
    const [page, setPage] = useState(1)
    const [end, setEnd] = useState(false)
    const [query, setQuery] = useState(queryString)

    const params = useRef<Params>({
        start: 0,
        end: numPerPage,
        from: new Date(today.getTime() - distance * 24 * 60 * 60 * 1000),
        to: today,
        ...queryParams,
    })

    const fetch = useCallback(async () => {
        if (page <= totalPage.current) {
            setData(store.current.slice((page - 1) * numPerPage, page * numPerPage))
            loading && setLoading(false)
        } else {
            setLoading(true)
            try {
                if (notIncludes(query, ['$start', '$end', '$from', '$to'])) {
                    throw new Error('Query invalid!')
                }

                const q: T[] = await client.fetch<T[]>(query, params.current)

                if (q.length > 0) {
                    q.length < numPerPage && setEnd(true)
                    totalPage.current += 1
                    store.current = [...store.current, ...q]

                    setData(q)
                } else {
                    setEnd(true)
                    setPage(page - 1)
                }
            } catch (error: any) {
                throw new Error(error.message)
            } finally {
                setLoading(false)
            }
        }
    }, [page, query, totalPage.current, store.current, params.current])

    useEffect(() => {
        fetch()
    }, [fetch])

    const next = () => {
        if (!end || page < totalPage.current) {
            setPage(page + 1)
            params.current = {
                ...params.current,
                start: page * numPerPage,
                end: (page + 1) * numPerPage,
            }
        }
    }

    const prev = () => {
        if (page > 1) {
            setPage(page - 1)
            params.current = {
                ...params.current,
                start: (page - 2) * numPerPage,
                end: (page - 1) * numPerPage,
            }
        }
    }

    const refetch = (q: string, p?: { [p in keyof Params]?: Params[p] }) => {
        setQuery(q)
        totalPage.current = 0
        store.current = []
        setData([])
        setEnd(false)
        setPage(1)
        params.current = { ...params.current, start: 0, end: numPerPage, ...p }
    }

    return {
        loading,
        data,
        store: store.current,
        next,
        prev,
        page,
        totalPage: totalPage.current,
        end,
        refetch,
        params,
    }
}
