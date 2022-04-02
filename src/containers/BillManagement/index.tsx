import { memo, useEffect, useState } from 'react'
import { Bill, BillStatus } from '../../@types'
import { Box, SortDropDown, Button } from '../../components'
import { headerHOC } from '../../hoc'
import { useQuery } from '../../hooks'
import { GET_BILLS, GET_BILLSTATUS } from '../../schema'
import { SearchForm, Calendar, Table, Pagination } from './components'

const BillManagement = () => {
    const { data: statusData } = useQuery<BillStatus>(GET_BILLSTATUS)
    const { data: billData, loading: billLoading } = useQuery<Bill>(GET_BILLS, {
        start: 0,
        end: 5,
    })
    console.log(billData)
    const [showStatus, setShowStatus] = useState(false)
    const [billItems, setBillItems] = useState<any[]>([])

    const handleRowCheck = (value: any, index: number) => {
        const temp = [...billItems]
        const i = temp.findIndex((item) => item._id === value._id)
        if (i !== -1) {
            temp.splice(i, 1)
            setBillItems(temp)
            return
        }
        setBillItems([...temp, value])
    }
    useEffect(() => {
        if (billItems.length === 0) setShowStatus(false)
        else setShowStatus(true)
    }, [billItems])

    return (
        <div className=''>
            <div className='flex gap-5'>
                <SearchForm className='flex-1' />
                <Calendar />
            </div>
            <Box
                headerTitle='Bills'
                className='mt-5'
                option={
                    <div className='flex gap-4 items-center'>
                        <Button title='Export Report' style='success' />
                        <SortDropDown
                            sortTtile='Order status:'
                            sortSelected={{ _id: '0', name: 'Tất cả' }}
                            sortData={statusData}
                        />
                    </div>
                }
                pagination={<Pagination isOpen={showStatus} />}
            >
                <Table data={billData} onRowChecked={handleRowCheck} loading={billLoading} />
            </Box>
        </div>
    )
}

export default memo(
    headerHOC(BillManagement, 'Bill Management', [
        {
            title: 'Payments',
            to: '/payments',
        },
    ])
)
