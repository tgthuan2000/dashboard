import { useCallback, useEffect, useRef, useState } from 'react'
import { client } from '../client/sanity'

export const useQuery = <T>(query: string) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T[]>([])

    const getQuery = async () => {
        setLoading(true)
        try {
            const q: T[] = await client.fetch<T[]>(query)
            setData(q)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getQuery()
    }, [])

    return { loading, data }
}

export const useQueryPaging = <T>(query: string, numPerPage: number | undefined = 5) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T[]>([])
    const store = useRef<T[]>([])
    const totalPage = useRef(0)
    const [page, setPage] = useState(1)
    const [end, setEnd] = useState(false)

    const getQuery = useCallback(async () => {
        if (page <= totalPage.current) {
            setData(store.current.slice((page - 1) * numPerPage, page * numPerPage))
            loading && setLoading(false)
        } else {
            setLoading(true)
            try {
                if (!query.includes('$start') || !query.includes('$end')) throw new Error('Query invalid!')

                const q: T[] = await client.fetch<T[]>(query, {
                    start: (page - 1) * numPerPage,
                    end: page * numPerPage,
                })

                if (q.length > 0) {
                    q.length < numPerPage && setEnd(true)
                    totalPage.current += 1
                    store.current = [...store.current, ...q]
                    setData(q)
                } else {
                    setEnd(true)
                }
            } catch (error: any) {
                throw new Error(error.message)
            } finally {
                setLoading(false)
            }
        }
    }, [page])

    useEffect(() => {
        getQuery()
    }, [getQuery])

    const next = () => {
        if (!end || page < totalPage.current) {
            setPage(page + 1)
        }
    }

    const prev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    return { loading, data, store: store.current, next, prev, page, totalPage: totalPage.current, end }
}
