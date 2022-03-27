import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { memo } from 'react'
import { Box, IconButton, Pagination, SortDropDown } from '../../components'
import { headerHOC } from '../../hoc'
import { useGetAllProducts } from '../../schema/hook'
import { SearchForm } from '../BillManagement/components'
import { Table } from './components'

const ProductManagement = () => {
    const { store, current, loading, next, prev, page, totalPage, end } = useGetAllProducts()

    return (
        <div>
            <div className='flex gap-5'>
                <SearchForm className='flex-1' />
                <IconButton icon={AddCircleOutlineOutlined} to='add' title='Add product' />
            </div>
            <Box
                headerTitle='Products'
                className='mt-5'
                option={
                    <div className='flex gap-4'>
                        <SortDropDown sortTtile='Status:' sortSelected='All' sortData={['Publish', 'Stock', 'Block']} />
                        <SortDropDown
                            sortTtile='Categories:'
                            sortSelected='All'
                            sortData={['Type 1', 'Type 2', 'Type 3', 'Type 4']}
                        />
                    </div>
                }
                pagination={
                    <Pagination
                        length={store.length}
                        onNext={next}
                        onPrev={prev}
                        page={page}
                        totalPage={totalPage}
                        end={end}
                    />
                }
            >
                <Table loading={loading} data={current} end={end} page={page} totalPage={totalPage} />
            </Box>
        </div>
    )
}

export default memo(
    headerHOC(ProductManagement, 'Products', [{ title: 'Product Managements', to: '/product-managements' }])
)
