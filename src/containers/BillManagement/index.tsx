import { memo } from 'react'
import { Box, SortDropDown, Button } from '../../components'
import { headerHOC } from '../../hoc'
import { SearchForm, Calendar, Table, Pagination } from './components'

const BillManagement = () => {
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
                            sortSelected='Tất cả'
                            sortData={['Chờ xác nhận', 'Đang giao hàng', 'Đã giao hàng', 'Hủy hàng', 'Hoàn tiền']}
                        />
                    </div>
                }
                pagination={<Pagination />}
            >
                <Table />
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
