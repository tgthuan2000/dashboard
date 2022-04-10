import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { memo, useRef, useState } from 'react'
import { ProductCategory, ProductStatus } from '../../@types'
import { Box, IconButton, Pagination, SearchForm, SortDropDown } from '../../components'
import { ProductParams } from '../../features'
import { headerHOC } from '../../hoc'
import { useQueryProduct, useQuery } from '../../hooks'
import { GET_PRODUCT_CATEGORIES, GET_PRODUCT_STATUS, ProductEnum } from '../../schema'
import { Table } from './components'

const all = { _id: '0', name: 'Tất cả' }

interface ProductSort {
    status: ProductStatus
    category: ProductCategory
}

const ProductManagement = () => {
    const { store, current, loading, next, prev, page, totalPage, end, refetch } = useQueryProduct()
    const { loading: statusLoading, data: statusData } = useQuery(GET_PRODUCT_STATUS, [all])
    const { loading: categoryLoading, data: categoryData } = useQuery(GET_PRODUCT_CATEGORIES, [all])
    const [sortSelected, setSortSelected] = useState<ProductSort>({ status: all, category: all })
    const query = useRef<ProductEnum[]>([])

    const handleSortChange = (_id: string, type: keyof ProductSort) => {
        if (sortSelected[type]._id === _id) return
        if (_id === '0') {
            let index: number = -1
            let params: keyof ProductParams | undefined = undefined
            let current: keyof ProductParams | undefined = undefined
            switch (type) {
                case 'status': {
                    current = 'idStatus'
                    params = 'idCategory'
                    index = query.current.findIndex((i) => i === ProductEnum.BY_STATUS)
                    break
                }
                case 'category': {
                    current = 'idCategory'
                    params = 'idStatus'
                    index = query.current.findIndex((i) => i === ProductEnum.BY_CATEGORY)
                    break
                }
                default:
                    break
            }
            if (index !== -1) {
                const q = [...query.current]
                q.splice(index, 1)
                query.current = q
            }
            if (params && current) {
                refetch(query.current, {}, [current])
            }
            setSortSelected((prev) => ({ ...prev, [type]: all }))
        } else {
            let item: ProductStatus | ProductCategory | undefined
            let params: keyof ProductParams | undefined = undefined
            switch (type) {
                case 'status': {
                    params = 'idStatus'
                    item = statusData.find((sort) => sort._id === _id)
                    if (!query.current.includes(ProductEnum.BY_STATUS))
                        query.current = [...query.current, ProductEnum.BY_STATUS]
                    break
                }
                case 'category': {
                    params = 'idCategory'
                    item = categoryData.find((sort) => sort._id === _id)
                    if (!query.current.includes(ProductEnum.BY_CATEGORY))
                        query.current = [...query.current, ProductEnum.BY_CATEGORY]
                    break
                }
                default:
                    break
            }
            if (item) {
                setSortSelected((prev) => ({ ...prev, [type]: item }))
                if (params) {
                    refetch(query.current, { [params]: _id })
                }
            }
        }
    }

    const handleSearch = (value: string) => {
        refetch(query.current, {
            query: value.trim().length === 0 ? '*' : `*${value.trim().toLowerCase()}*`,
        })
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
                <Table loading={loading} data={current} end={end} page={page} totalPage={totalPage} />
            </Box>
        </div>
    )
}

export default memo(
    headerHOC(ProductManagement, 'Products', [{ title: 'Product Managements', to: '/product-managements' }])
)
