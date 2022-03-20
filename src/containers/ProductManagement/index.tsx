import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { Box, IconButton, Pagination, SortDropDown } from '../../components'
import { headerHOC } from '../../hoc'
import { SearchForm } from '../BillManagement/components'
import { Table } from './components'

const ProductManagement = () => {
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
                pagination={<Pagination />}
            >
                <Table />
            </Box>
        </div>
    )
}

export default headerHOC(ProductManagement, 'Products', [{ title: 'Product Managements', to: '/product-managements' }])
