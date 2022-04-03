import { memo, useEffect, useState } from 'react'
import { Bill, BillStatus } from '../../@types'
import { Box, SortDropDown, Button } from '../../components'
import { headerHOC } from '../../hoc'
import { useQueryPaging, useQuery } from '../../hooks'
import { GET_BILLS, GET_BILLSTATUS } from '../../schema'
import { SearchForm, Calendar, Table, Pagination } from './components'

const BillManagement = () => {
    const { data: statusData } = useQuery<BillStatus>(GET_BILLSTATUS)
    const {
        store: billStore,
        data: billData,
        loading: billLoading,
        next: nextBill,
        prev: prevBill,
        end: endBill,
        page: pageBill,
        totalPage: totalPageBill,
    } = useQueryPaging<Bill>(GET_BILLS)

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
                    <SortDropDown
                        sortTtile='Order status:'
                        sortSelected={{ _id: '0', name: 'Tất cả' }}
                        sortData={statusData}
                    />
                }
                pagination={
                    <Pagination
                        isOpen={showStatus}
                        onNextPage={nextBill}
                        onPrevPage={prevBill}
                        length={billStore.length}
                        page={pageBill}
                        totalPage={totalPageBill}
                        end={endBill}
                    />
                }
            >
                <Table
                    data={billData}
                    onRowChecked={handleRowCheck}
                    loading={billLoading}
                    page={pageBill}
                    totalPage={totalPageBill}
                    end={endBill}
                />
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
