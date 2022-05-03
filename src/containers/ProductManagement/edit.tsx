import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../../@types'
import { client } from '../../client/sanity'
import { Loading } from '../../components'
import { headerHOC } from '../../hoc'
import { useQuery } from '../../hooks'
import { GET_PRODUCT_BY_ID, GET_PRODUCT_CATEGORIES, GET_PRODUCT_STATUS, GET_PRODUCT_SUPPLIER } from '../../schema'
import ConfigProduct, { FormInputs, selectType } from './ConfigProduct'

const EditProduct = () => {
    const params = useParams()
    const {
        data: [productData],
        loading: productLoading,
    } = useQuery<Product>(GET_PRODUCT_BY_ID, [], { _id: params.id })

    const { data: categoryData, loading: categoryLoading } = useQuery<selectType>(GET_PRODUCT_CATEGORIES)
    const { data: statusData, loading: statusLoading } = useQuery<selectType>(GET_PRODUCT_STATUS)
    const { data: supplierData, loading: supplierLoading } = useQuery<selectType>(GET_PRODUCT_SUPPLIER)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onSubmit = (d: FormInputs) => {
        setLoading(true)

        const category = d.category && {
            _type: 'reference',
            _ref: d.category,
        }
        const image = d.image && {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: d.image,
            },
        }
        const status = d.status && {
            _type: 'reference',
            _ref: d.status,
        }
        const supplier = d.supplier && {
            _type: 'reference',
            _ref: d.supplier,
        }
        client
            .patch(productData._id)
            .set({
                name: d.name,
                price: d.price,
                quantity: d.quantity,
                description: d.description,
                categoryProduct: category,
                image,
                status,
                supplier,
            })
            .commit()
            .then(() => navigate('../'))
            .finally(() => {
                setLoading(false)
            })
    }

    if (loading || productLoading || categoryLoading || statusLoading || supplierLoading)
        return (
            <div className='w-full text-center pt-10'>
                <Loading />
            </div>
        )
    if (!productData || !categoryData || !statusData || !supplierData) return <div>Error</div>

    return (
        <ConfigProduct
            onSubmit={onSubmit}
            productData={productData}
            categoryData={categoryData}
            statusData={statusData}
            supplierData={supplierData}
        />
    )
}

export default headerHOC(EditProduct, 'Edit product', [
    { title: 'Product Managements', to: '/product-managements' },
    { title: 'Products', to: '/product-managements/products' },
])
