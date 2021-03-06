import { memo, useCallback, useEffect, useState } from 'react'
import { Bill, BillStatus } from '../../@types'
import { Box, SortDropDown, SearchForm } from '../../components'
import { headerHOC } from '../../hoc'
import { useQueries, useQuery } from '../../hooks'
import { BillEnum, BILL_QUERY, BILLSTATUS_QUERY } from '../../schema'
import { slug } from '../../utils/slug'
import { Calendar, Table, Pagination } from './components'

const all: BillStatus = { _id: '0', name: 'Tất cả' }

const BillManagement = () => {
    const { store, data, loading, next, prev, end, page, totalPage, refetch, params } = useQueries<Bill, BillEnum>(
        BILL_QUERY,
        {
            queryParams: { from: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), to: new Date() },
        },
        { status: BillEnum.ALL_STATUS }
    )

    const { data: statusData, loading: statusLoading } = useQuery<BillStatus>(BILLSTATUS_QUERY, [all])
    const [sortSelected, setSortSelected] = useState<BillStatus>(all)
    const [showStatus, setShowStatus] = useState(false)
    const [billSelected, setBillSelected] = useState<{ allChecked: boolean; data: Bill[] }>({
        allChecked: false,
        data: [],
    })

    useEffect(() => {
        if (billSelected.data.length === 0) setShowStatus(false)
        else setShowStatus(true)
    }, [billSelected])

    const handleSortChange = (_id: string) => {
        if (sortSelected._id === _id) return
        if (_id === '0') {
            setSortSelected(all)
            refetch({ status: BillEnum.ALL_STATUS }, {}, ['_id'])
            return
        }
        const item = statusData.find((sort) => sort._id === _id)
        if (item) {
            setSortSelected(item)
            refetch({ status: BillEnum.BY_STATUS }, { _id })
        }
    }

    const handleDateChange = useCallback(
        (from: Date, to: Date) => {
            refetch({ status: params._id ? BillEnum.BY_STATUS : BillEnum.ALL_STATUS }, { from, to })
        },
        [params._id]
    )

    const handleSearch = useCallback(
        (value: string) => {
            refetch(
                { status: params._id ? BillEnum.BY_STATUS : BillEnum.ALL_STATUS },
                { query: value.trim().length === 0 ? '*' : `*${value.trim().toLowerCase()}*` }
            )
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
                    onRowChecked={(data) =>
                        setBillSelected((prev) => ({ ...billSelected, data: [...prev.data, ...data] }))
                    }
                    checkList={billSelected.data}
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
            to: slug.payments,
        },
    ])
)
