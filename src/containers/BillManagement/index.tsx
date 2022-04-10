import { memo, useCallback, useEffect, useState } from 'react'
import { Bill, BillStatus } from '../../@types'
import { Box, SortDropDown, SearchForm } from '../../components'
import { headerHOC } from '../../hoc'
import { useQueryPaging, useQuery } from '../../hooks'
import { BillEnum, BILL_QUERY, BILLSTATUS_QUERY } from '../../schema'
import { Calendar, Table, Pagination } from './components'

const all: BillStatus = { _id: '0', name: 'Tất cả' }

const BillManagement = () => {
    const { store, data, loading, next, prev, end, page, totalPage, refetch, params } = useQueryPaging<Bill>(
        BILL_QUERY(BillEnum.ALL_STATUS),
        {}
    )

    const { data: statusData, loading: statusLoading } = useQuery<BillStatus>(BILLSTATUS_QUERY, [all])
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
            refetch(BILL_QUERY(BillEnum.ALL_STATUS))
            setSortSelected(all)
            return
        }
        const item = statusData.find((sort) => sort._id === _id)
        if (item) {
            refetch(BILL_QUERY(BillEnum.BY_STATUS), { _id })
            setSortSelected(item)
        }
    }

    const handleDateChange = useCallback(
        (from: Date, to: Date) => {
            refetch(BILL_QUERY(params._id ? BillEnum.BY_STATUS : BillEnum.ALL_STATUS), {
                from,
                to,
            })
        },
        [params._id]
    )

    const handleSearch = useCallback(
        (value: string) => {
            refetch(BILL_QUERY(params._id ? BillEnum.BY_STATUS : BillEnum.ALL_STATUS), {
                query: value.trim().length === 0 ? '*' : `*${value.trim().toLowerCase()}*`,
            })
        },
        [params._id]
    )

    return (
        <div className=''>
            <div className='flex gap-5'>
                <SearchForm className='flex-1' onSearch={handleSearch} />
                <Calendar onDateChange={handleDateChange} range={[params.from, params.to]} />
            </div>
            <Box
                headerTitle='Bills'
                className='mt-5'
                option={
                    <SortDropDown
                        loading={statusLoading}
                        sortTitle='Order status:'
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
