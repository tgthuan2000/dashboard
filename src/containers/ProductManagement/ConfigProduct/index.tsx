import { InputText, Selection, TextArea } from '../../../components'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEvent, useState } from 'react'
import { client, urlFor } from '../../../client/sanity'
import { SanityImageAssetDocument } from '@sanity/client'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../../../@types'
import { slug } from '../../../utils/slug'

export type FormInputs = {
    name?: string
    price?: number
    quantity?: number
    forecast?: number
    image?: string
    category?: string
    supplier?: string
    status?: string
    description?: string
}

const schema = yup
    .object({
        image: yup.string(),
        name: yup.string().required('Product name is required'),
        price: yup.number().required('Product price required'),
        quantity: yup.number().required('Product quantity required'),
        forecast: yup.number().min(0, 'Forecast at least 0'),
        category: yup.string().required('Product category is required'),
        supplier: yup.string().required('Product supplier is required'),
        status: yup.string().required('Product status is required'),
        description: yup.string(),
    })
    .required()

export interface selectType {
    _id: string
    name: string
}

interface ConfigProductProps {
    productData?: Product
    categoryData?: selectType[]
    statusData?: selectType[]
    supplierData?: selectType[]
    onSubmit?: SubmitHandler<FormInputs>
}

const ConfigProduct = ({ productData, categoryData, statusData, supplierData, onSubmit }: ConfigProductProps) => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            image: productData?.image?._id || undefined,
            name: productData?.name || '',
            price: productData?.price || 0,
            quantity: productData?.quantity || 0,
            forecast: productData?.forecast || 0,
            category: productData?.categoryProduct?._id || undefined,
            supplier: productData?.supplier?._id || undefined,
            status: productData?.status?._id || undefined,
            description: productData?.description || '',
        },
    })
    const [imageData, setImageData] = useState<SanityImageAssetDocument | null>(productData?.image || null)

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            client.assets
                .upload('image', file)
                .then((data) => {
                    setValue('image', data._id)
                    setImageData(data)
                })
                .catch((error) => console.log(error))
        }
    }

    return (
        <form onSubmit={onSubmit && handleSubmit(onSubmit)}>
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
                                    src={imageData ? urlFor(imageData) : undefined}
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
                            label='Name'
                            placeholder='Enter product name'
                            errorMessage={errors.name?.message}
                            {...register('name')}
                        />
                        <InputText
                            type='number'
                            label='Price'
                            placeholder='Enter product price'
                            errorMessage={errors.price?.message}
                            {...register('price')}
                        />
                        <InputText
                            type='number'
                            label='Quantity'
                            placeholder='Enter quantity'
                            errorMessage={errors.quantity?.message}
                            {...register('quantity')}
                        />
                        <InputText
                            type='number'
                            label='Forecast'
                            placeholder='Enter forecast'
                            errorMessage={errors.forecast?.message}
                            {...register('forecast')}
                        />
                        <Selection
                            selected={getValues('category')}
                            data={categoryData}
                            label='Category'
                            placeholder='Choose a category'
                            errorMessage={errors.category?.message}
                            onChange={(id) => setValue('category', id)}
                        />
                        <Selection
                            selected={getValues('supplier')}
                            data={supplierData}
                            label='Supplier'
                            placeholder='Choose a supplier'
                            errorMessage={errors.supplier?.message}
                            onChange={(id) => setValue('supplier', id)}
                        />
                        <Selection
                            selected={getValues('status')}
                            data={statusData}
                            label='Status'
                            placeholder='Choose a status'
                            errorMessage={errors.status?.message}
                            onChange={(id) => setValue('status', id)}
                        />
                        <TextArea
                            className='col-span-2'
                            label='Description'
                            placeholder='Enter description'
                            errorMessage={errors.description?.message}
                            {...register('description')}
                        />
                    </div>
                    <div className='flex justify-end space-x-3 mt-5'>
                        <button
                            type='submit'
                            className='cursor-pointer uppercase bg-success dark:bg-primary min-w-[150px] px-4 py-2 rounded text-white font-semibold hover:bg-[#099885] transition-colors disabled:opacity-50 disabled:cursor-wait'
                        >
                            Save
                        </button>
                        <button
                            type='button'
                            onClick={() => navigate(slug.products)}
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

export default ConfigProduct
