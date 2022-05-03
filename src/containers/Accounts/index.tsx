import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { memo, useState } from 'react'
import { User, UserRole } from '../../@types'
import { Box, IconButton, Pagination, SortDropDown, SearchForm } from '../../components'
import { headerHOC } from '../../hoc'
import { useQueries, useQuery } from '../../hooks'
import { UserEnum, USER_QUERY, USER_ROLES } from '../../schema'
import { Table } from './components'

interface UserSort {
    role: UserRole
}

const all = { _id: '0', name: 'Tất cả' }

const getType = (type: keyof UserSort) => ({ role: '_id' }[type])
const getEnumType = (type: keyof UserSort) => ({ role: UserEnum.BY_STATUS }[type])

const Accounts = () => {
    const { data: roleData, loading: roleLoading } = useQuery<{ _id: string; name: string }>(USER_ROLES, [all])
    const { store, data, loading, next, prev, end, page, totalPage, refetch } = useQueries<User, UserEnum>(USER_QUERY)
    const [sortSelected, setSortSelected] = useState<UserSort>({ role: all })

    const handleSortChange = (_id: string, type: keyof UserSort) => {
        if (sortSelected[type]._id === _id) return
        if (_id === '0') {
            setSortSelected({ ...sortSelected, [type]: all })
            refetch({ [type]: null }, {}, [getType(type)])
            return
        }
        let item: UserRole | undefined = undefined
        switch (type) {
            case 'role': {
                item = roleData.find((role) => role._id === _id)
                break
            }
            default:
                break
        }
        if (item) {
            setSortSelected({ ...sortSelected, [type]: item })
            refetch({ [type]: getEnumType(type) }, { [getType(type)]: _id })
        }
    }

    const handleSearch = (value: string) => {
        refetch(
            {},
            {
                query: value.trim().length === 0 ? '*' : `*${value.trim().toLowerCase()}*`,
            }
        )
    }
    return (
        <div>
            <div className='flex gap-5'>
                <SearchForm className='flex-1' onSearch={handleSearch} />
                <IconButton icon={AddCircleOutlineOutlined} to='add' title='New account' />
            </div>
            <Box
                headerTitle='Account'
                className='mt-5'
                option={
                    <SortDropDown
                        loading={roleLoading}
                        sortSelected={sortSelected.role}
                        sortTitle='Role:'
                        sortData={roleData}
                        onSortChange={(_id) => handleSortChange(_id, 'role')}
                    />
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
                <Table loading={loading} data={data} end={end} page={page} totalPage={totalPage} />
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
