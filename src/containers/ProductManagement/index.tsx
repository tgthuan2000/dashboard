import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { memo } from 'react'
import { Box, IconButton, Pagination, SortDropDown } from '../../components'
import { headerHOC } from '../../hoc'
import { useGetAllProducts } from '../../hooks'
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
                        <SortDropDown
                            sortTtile='Status:'
                            sortSelected={{ _id: '0', name: 'All' }}
                            sortData={[
                                { _id: '1', name: 'Publish' },
                                { _id: '2', name: 'Stock' },
                                { _id: '3', name: 'Block' },
                            ]}
                        />
                        <SortDropDown sortTtile='Categories:' sortSelected={{ _id: '0', name: 'All' }} />
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
