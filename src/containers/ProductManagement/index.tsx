import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { memo, useCallback, useState } from 'react'
import { ProductCategory, ProductStatus } from '../../@types'
import { Box, IconButton, Pagination, SearchForm, SortDropDown } from '../../components'
import { headerHOC } from '../../hoc'
import { useQueryProduct, useQuery } from '../../hooks'
import { GET_PRODUCT_CATEGORIES, GET_PRODUCT_STATUS } from '../../schema'
import { Table } from './components'

const all = { _id: '0', name: 'Tất cả' }

interface ProductSort {
    status: ProductStatus
    category: ProductCategory
}

const ProductManagement = () => {
    const { store, current, loading, next, prev, page, totalPage, end } = useQueryProduct()
    const { loading: statusLoading, data: statusData } = useQuery(GET_PRODUCT_STATUS, [all])
    const { loading: categoryLoading, data: categoryData } = useQuery(GET_PRODUCT_CATEGORIES, [all])
    const [sortSelected, setSortSelected] = useState<ProductSort>({
        status: all,
        category: all,
    })

    const handleSortChange = useCallback((_id: string, type: keyof ProductSort) => {
        if (sortSelected[type]._id === _id) return
        if (_id === '0') {
            setSortSelected((prev) => ({ ...prev, [type]: all }))
            return
        }
        let item: ProductStatus | ProductCategory | undefined
        switch (type) {
            case 'status':
                item = statusData.find((sort) => sort._id === _id)
                break
            case 'category':
                item = categoryData.find((sort) => sort._id === _id)
                break
            default:
                break
        }
        if (item) {
            // refetch(PRODUCT_QUERY(ProductEnum.BY_STATUS), { _id })
            setSortSelected((prev) => ({ ...prev, [type]: item }))
        }
    }, [])

    const handleSearch = useCallback((value: string) => {
        // refetch(PRODUCT_QUERY(params._id ? ProductEnum.BY_STATUS : ProductEnum.ALL_STATUS), {
        //     query: value.trim().length === 0 ? '*' : `*${value.trim().toLowerCase()}*`,
        // })
    }, [])

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
                            sortTitle='Categories:'
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
                <Table loading={loading} data={current} end={end} page={page} totalPage={totalPage} />
            </Box>
        </div>
    )
}

export default memo(
    headerHOC(ProductManagement, 'Products', [{ title: 'Product Managements', to: '/product-managements' }])
)
