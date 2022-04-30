import { InputText } from '../../components'
import { headerHOC } from '../../hoc'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEvent, useState } from 'react'
import { client, urlFor } from '../../client/sanity'
import { SanityImageAssetDocument } from '@sanity/client'

export type FormInputs = {
    name: string
    price: number
    quantity: number
    image: string
    category: string
    supplier: string
    status: string
}

const schema = yup
    .object({
        image: yup.string().required('Product image is required'),
        name: yup.string().required('Product name is required'),
        price: yup.number().required('Product price required'),
        quantity: yup.number().required('Product quantity required'),
        category: yup.string().required('Product category is required'),
        supplier: yup.string().required('Product supplier is required'),
        status: yup.string().required('Product status is required'),
    })
    .required()

const ConfigProduct = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            price: 0,
            quantity: 0,
        },
    })
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<SanityImageAssetDocument | null>(null)

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            client.assets
                .upload('image', file)
                .then((data) => {
                    setValue('image', data._id)
                    setData(data)
                })
                .catch((error) => console.log(error))
        }
    }
    const onSubmit = async (data: FormInputs) => {
        try {
            setLoading(true)
            console.log(data)
        } catch (error: any) {
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='bg-white dark:bg-dark p-10 rounded-lg transition-colors'>
                <div className='max-w-3xl mx-auto'>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-3'>
                        <div className='mb-3'>
                            <label className='mb-2 font-medium dark:text-gray-light' htmlFor='image'>
                                Image
                            </label>
                            <div className='flex items-end space-x-4 mt-2 mb-1'>
                                <img
                                    className='w-20 h-20 bg-dark-white rounded-full object-cover'
                                    src={data ? urlFor(data) : undefined}
                                    alt=' '
                                />
                                <label className='cursor-pointer py-1.5 hover:opacity-70 px-3 border border-gray bg-gray-light text-dark rounded-md'>
                                    Change
                                    <input id='image' type='file' hidden accept='image/*' onChange={handleUploadFile} />
                                </label>
                            </div>
                            {errors.image?.message && <span className='text-danger p-1'>{errors.image?.message}</span>}
                        </div>
                        <div />
                        <InputText
                            disabled={loading}
                            label='Name'
                            placeholder='Enter product name'
                            errorMessage={errors.name?.message}
                            {...register('name')}
                        />
                        <InputText
                            disabled={loading}
                            type='number'
                            label='Price'
                            placeholder='Enter product price'
                            errorMessage={errors.price?.message}
                            {...register('price')}
                        />
                        <InputText
                            disabled={loading}
                            type='number'
                            label='Quantity'
                            placeholder='Enter quantity'
                            errorMessage={errors.quantity?.message}
                            {...register('quantity')}
                        />
                        <InputText
                            disabled={loading}
                            label='Category'
                            placeholder=''
                            errorMessage={errors.category?.message}
                            {...register('category')}
                        />
                        <InputText
                            disabled={loading}
                            label='Supplier'
                            placeholder=''
                            errorMessage={errors.supplier?.message}
                            {...register('supplier')}
                        />
                        <InputText
                            disabled={loading}
                            label='Status'
                            placeholder=''
                            errorMessage={errors.status?.message}
                            {...register('status')}
                        />
                    </div>
                    <div className='flex justify-end space-x-3 mt-5'>
                        <button
                            type='submit'
                            disabled={loading}
                            className='cursor-pointer uppercase bg-success dark:bg-primary min-w-[150px] px-4 py-2 rounded text-white font-semibold hover:bg-[#099885] transition-colors disabled:opacity-50 disabled:cursor-wait'
                        >
                            Save
                        </button>
                        <button
                            type='button'
                            disabled={loading}
                            onClick={() => window.location.replace('/product-managements/products')}
                            className='cursor-pointer uppercase bg-gray min-w-[150px] px-4 py-2 rounded text-white hover:text-dark font-semibold hover:bg-dark-white dark:hover:bg-gray dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-wait'
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export const AddProduct = headerHOC(ConfigProduct, 'Add product', [
    { title: 'Product Managements', to: '/product-managements' },
    { title: 'Products', to: '/product-managements/products' },
])

export const EditProduct = headerHOC(ConfigProduct, 'Edit product', [
    { title: 'Product Managements', to: '/product-managements' },
    { title: 'Products', to: '/product-managements/products' },
])
