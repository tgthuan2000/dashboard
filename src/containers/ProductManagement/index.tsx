import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { memo, useState } from 'react'
import { Product, ProductCategory, ProductStatus } from '../../@types'
import { Box, IconButton, Pagination, SearchForm, SortDropDown } from '../../components'
import { headerHOC } from '../../hoc'
import { useQuery, useQueries } from '../../hooks'
import { GET_PRODUCT_CATEGORIES, GET_PRODUCT_STATUS, ProductEnum, PRODUCT_QUERY } from '../../schema'
import { Table } from './components'

const all = { _id: '0', name: 'Tất cả' }

interface ProductSort {
    status: ProductStatus
    category: ProductCategory
}

const getType = (type: keyof ProductSort) => ({ status: 'idStatus', category: 'idCategory' }[type])
const getEnumType = (type: keyof ProductSort) =>
    ({ status: ProductEnum.BY_STATUS, category: ProductEnum.BY_CATEGORY }[type])

const ProductManagement = () => {
    const { store, data, loading, next, prev, end, page, totalPage, refetch } = useQueries<Product, ProductEnum>(
        PRODUCT_QUERY
    )

    const { loading: statusLoading, data: statusData } = useQuery(GET_PRODUCT_STATUS, [all])
    const { loading: categoryLoading, data: categoryData } = useQuery(GET_PRODUCT_CATEGORIES, [all])
    const [sortSelected, setSortSelected] = useState<ProductSort>({ status: all, category: all })

    const handleSortChange = (_id: string, type: keyof ProductSort) => {
        if (sortSelected[type]._id === _id) return
        if (_id === '0') {
            setSortSelected({ ...sortSelected, [type]: all })
            refetch({ [type]: null }, {}, [getType(type)])
            return
        }
        let item: ProductStatus | ProductCategory | undefined = undefined
        switch (type) {
            case 'status': {
                item = statusData.find((status) => status._id === _id)
                break
            }
            case 'category': {
                item = categoryData.find((category) => category._id === _id)
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
                <IconButton icon={AddCircleOutlineOutlined} to='add' title='Add product' />
            </div>
            <Box
                headerTitle='Products'
                className='mt-5'
                option={
                    <div className='flex gap-4'>
                        <SortDropDown
                            loading={statusLoading}
                            sortTitle='Status:'
                            sortSelected={sortSelected.status}
                            sortData={statusData}
                            onSortChange={(_id) => handleSortChange(_id, 'status')}
                        />
                        <SortDropDown
                            loading={categoryLoading}
                            sortTitle='Category:'
                            sortSelected={sortSelected.category}
                            sortData={categoryData}
                            onSortChange={(_id) => handleSortChange(_id, 'category')}
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
                <Table loading={loading} data={data} end={end} page={page} totalPage={totalPage} />
            </Box>
        </div>
    )
}

export default memo(
    headerHOC(ProductManagement, 'Products', [{ title: 'Product Managements', to: '/product-managements' }])
)
