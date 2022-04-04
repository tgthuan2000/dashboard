import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { memo } from 'react'
import { Box, IconButton, Pagination, SortDropDown, SearchForm } from '../../components'
import { headerHOC } from '../../hoc'
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
                        <SortDropDown
                            sortTtile='Status:'
                            sortSelected={{ _id: '0', name: 'All' }}
                            sortData={[
                                { _id: '1', name: 'Publish' },
                                { _id: '2', name: 'Block' },
                            ]}
                        />
                        <SortDropDown
                            sortTtile='Sort By:'
                            sortSelected={{ _id: '0', name: 'All' }}
                            sortData={[
                                { _id: '1', name: 'Type 1' },
                                { _id: '2', name: 'Type 2' },
                                { _id: '3', name: 'Type 3' },
                                { _id: '4', name: 'Type 4' },
                            ]}
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
