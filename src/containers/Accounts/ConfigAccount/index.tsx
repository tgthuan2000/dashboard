import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../@types'
import * as yup from 'yup'
import { client, urlFor } from '../../../client/sanity'
import { InputText, Selection, TextArea } from '../../../components'
import { SanityImageAssetDocument } from '@sanity/client'
import { ChangeEvent, useState } from 'react'
import { slug } from '../../../utils/slug'

export type FormInputs = {
    username?: string
    password?: string
    fullName?: string
    image?: string
    phone?: string
    email?: string
    role?: string
    address?: string
}
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup
    .object({
        username: yup.string().required('Username is required').min(4, 'Username must have at least 4 characters'),
        password: yup.string().required('User password is required').min(4, 'Password must have at least 4 characters'),
        fullName: yup.string().required('User fullname is required'),
        address: yup.string(),
        phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        email: yup.string().email('Must be an email'),
        image: yup.string(),
        role: yup.string().required('User role is required'),
    })
    .required()

export interface selectType {
    _id: string
    name: string
}

interface ConfigAccountProps {
    accountData?: User
    roleData?: selectType[]
    onSubmit?: SubmitHandler<FormInputs>
}

const ConfigAccount = ({ onSubmit, roleData, accountData }: ConfigAccountProps) => {
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
            username: accountData?.username || '',
            password: accountData?.password ? '*******************' : '',
            fullName: accountData?.fullName || '',
            phone: accountData?.phone || '',
            email: accountData?.email || '',
            address: accountData?.address || '',
            image: accountData?.image?._id || undefined,
            role: accountData?.role?._id || undefined,
        },
    })
    const [imageData, setImageData] = useState<SanityImageAssetDocument | null>(accountData?.image || null)

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
                                User Image
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
                            label='User name'
                            placeholder='Username'
                            errorMessage={errors.username?.message}
                            {...register('username')}
                        />
                        <InputText
                            password
                            label='Password'
                            placeholder='Password'
                            errorMessage={errors.password?.message}
                            {...register('password')}
                        />
                        <InputText
                            label='Full name'
                            placeholder='Enter fullname'
                            errorMessage={errors.fullName?.message}
                            {...register('fullName')}
                        />
                        <InputText
                            label='Email'
                            type='email'
                            placeholder='Enter email'
                            errorMessage={errors.email?.message}
                            {...register('email')}
                        />
                        <InputText
                            label='Phone'
                            type='tel'
                            placeholder='Enter phone'
                            errorMessage={errors.phone?.message}
                            {...register('phone')}
                        />
                        <Selection
                            selected={getValues('role')}
                            data={roleData}
                            label='Role'
                            placeholder='Choose a role'
                            errorMessage={errors.role?.message}
                            onChange={(id) => setValue('role', id)}
                        />
                        <TextArea
                            className='col-span-2'
                            label='Address'
                            placeholder='Enter address'
                            errorMessage={errors.address?.message}
                            {...register('address')}
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
                            onClick={() => navigate(slug.accounts)}
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
export default ConfigAccount
