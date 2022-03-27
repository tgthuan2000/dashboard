import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { memo } from 'react'
import { Box, IconButton, Pagination, SortDropDown } from '../../components'
import { headerHOC } from '../../hoc'
import { SearchForm } from '../BillManagement/components'
import { Table } from './components'

const Accounts = () => {
    return (
        <div>
            <div className='flex gap-5'>
                <SearchForm className='flex-1' />
                <IconButton icon={AddCircleOutlineOutlined} to='add' title='New account' />
            </div>
            <Box
                headerTitle='Accounts'
                className='mt-5'
                option={
                    <div className='flex gap-4'>
                        <SortDropDown sortTtile='Status:' sortSelected='All' sortData={['Publish', 'Block']} />
                        <SortDropDown
                            sortTtile='Sort By:'
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

export default memo(
    headerHOC(Accounts, 'Accounts', [
        {
            title: 'Authentication',
            to: '/authentication',
        },
    ])
)
