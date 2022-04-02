import { useEffect, useState } from 'react'
import { client } from '../client/sanity'

const useQuery = <T>(query: string, params?: { [key: string]: any }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T[]>([])

    const getQuery = async () => {
        setLoading(true)
        try {
            let q: T[]
            if (params) {
                q = await client.fetch<T[]>(query, params)
            } else {
                q = await client.fetch<T[]>(query)
            }
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

    return { loading, data, load: getQuery }
}

export default useQuery
