import { useEffect, useState } from 'react'
import { client } from '../../client/sanity'
import { Bill, BillStatus, User } from '../../@types'
import { GET_BILLSTATUS, GET_BILLS } from '../query'

export const useBillStatus = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<BillStatus[]>([])
    const getBillStatus = async () => {
        setLoading(true)
        try {
            const d: BillStatus[] = await client.fetch(GET_BILLSTATUS)
            setData(d)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getBillStatus()
    }, [])
    return { loading, data }
}

export const useBillData = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Bill[]>([])

    const getBillData = async () => {
        setLoading(true)
        try {
            const d: Bill[] = await client.fetch(GET_BILLS)
            console.log(d)
            setData(d)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBillData()
    }, [])
    return { loading, data }
}
