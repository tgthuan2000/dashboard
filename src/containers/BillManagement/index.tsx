import { memo, useEffect, useState } from 'react'
import { Bill, BillStatus } from '../../@types'
import { Box, SortDropDown } from '../../components'
import { headerHOC } from '../../hoc'
import { useQueryPaging, useQuery } from '../../hooks'
import { GET_BILLS, GET_BILLSTATUS } from '../../schema'
import { FILTER_BILLS } from '../../schema/bill'
import { SearchForm, Calendar, Table, Pagination } from './components'

const all: BillStatus = { _id: '0', name: 'Tất cả' }

const BillManagement = () => {
    const {
        store: billStore,
        data: billData,
        loading: billLoading,
        next: nextBill,
        prev: prevBill,
        end: endBill,
        page: pageBill,
        totalPage: totalPageBill,
        set: setFilterBill,
    } = useQueryPaging<Bill>(GET_BILLS, {})

    const { data: statusData } = useQuery<BillStatus>(GET_BILLSTATUS, [all])

    const [sortSelected, setSortSelected] = useState<BillStatus>(all)

    const [showStatus, setShowStatus] = useState(false)
    const [billItems, setBillItems] = useState<string[]>([])

    const handleRowCheck = (_id: string, index: number) => {
        const temp = [...billItems]
        const i = temp.findIndex((item) => item === _id)
        if (i !== -1) {
            temp.splice(i, 1)
            setBillItems(temp)
            return
        }
        setBillItems([...temp, _id])
    }

    useEffect(() => {
        if (billItems.length === 0) setShowStatus(false)
        else setShowStatus(true)
    }, [billItems])

    const handleSortChange = (_id: string) => {
        if (_id === '0') {
            setFilterBill(GET_BILLS, {})
            setSortSelected(all)
            return
        }
        const item = statusData.find((sort) => sort._id === _id)
        if (item) {
            setFilterBill(FILTER_BILLS, { _id })
            setSortSelected(item)
        }
    }

    useEffect(() => {}, [sortSelected])

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
                        sortSelected={sortSelected}
                        sortData={statusData}
                        onSortChange={handleSortChange}
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
                        statusData={statusData}
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
