import { memo, useEffect, useState } from 'react'
import { Bill, BillStatus } from '../../@types'
import { Box, SortDropDown, SearchForm } from '../../components'
import { headerHOC } from '../../hoc'
import { useQueryPaging, useQuery } from '../../hooks'
import { GET_BILLS, GET_BILLSTATUS } from '../../schema'
import { FILTER_BILL, FILTER_BILLS } from '../../schema/bill'
import { Calendar, Table, Pagination } from './components'

const all: BillStatus = { _id: '0', name: 'Tất cả' }

const BillManagement = () => {
    const { store, data, loading, next, prev, end, page, totalPage, refetch, params } = useQueryPaging<Bill>(
        GET_BILLS,
        {}
    )

    const { data: statusData } = useQuery<BillStatus>(GET_BILLSTATUS, [all])

    const [sortSelected, setSortSelected] = useState<BillStatus>(all)

    const [showStatus, setShowStatus] = useState(false)
    const [billItems, setBillItems] = useState<Bill[]>([])

    useEffect(() => {
        if (billItems.length === 0) setShowStatus(false)
        else setShowStatus(true)
    }, [billItems])

    const handleSortChange = (_id: string) => {
        if (sortSelected._id === _id) return
        if (_id === '0') {
            refetch(GET_BILLS)
            setSortSelected(all)
            return
        }
        const item = statusData.find((sort) => sort._id === _id)
        if (item) {
            refetch(FILTER_BILLS, { _id })
            setSortSelected(item)
        }
    }

    const handleDateChange = (from: Date, to: Date) => {
        refetch(params._id ? FILTER_BILLS : FILTER_BILL, { from, to })
    }

    return (
        <div className=''>
            <div className='flex gap-5'>
                <SearchForm className='flex-1' />
                <Calendar onDateChange={handleDateChange} range={[params.from, params.to]} />
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
                        onNextPage={next}
                        onPrevPage={prev}
                        length={store.length}
                        page={page}
                        totalPage={totalPage}
                        end={end}
                        statusData={statusData}
                    />
                }
            >
                <Table
                    data={data}
                    onRowChecked={setBillItems}
                    checkList={billItems}
                    loading={loading}
                    page={page}
                    totalPage={totalPage}
                    end={end}
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
