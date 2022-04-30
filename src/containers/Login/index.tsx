import { useForm } from 'react-hook-form'
import { Checkbox } from './components'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { setAccount } from '../../features'
import { useDispatch } from 'react-redux'
import { login } from '../../client/axios/auth'
import { toast } from 'react-toastify'
import { toastConfig } from '../../utils/toastConfig'
import { storage } from '../../utils/localstorages'
import { InputText } from '../../components'

export type FormInputs = {
    username: string
    password: string
    rememberMe: boolean
}

const schema = yup
    .object({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
        rememberMe: yup.boolean(),
    })
    .required()

const Login = () => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({ resolver: yupResolver(schema) })
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: FormInputs) => {
        setLoading(true)
        try {
            const user = await login(data)

            if (user) {
                dispatch(setAccount(user))
                toast(`Hi ${user.fullName}. Welcome back!!`, toastConfig)
            }
        } catch (err: any) {
            toast(err.message, toastConfig)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
                animate={{ opacity: [0, 1], scale: [1.5, 1] }}
                className='w-96 p-6 bg-white dark:bg-gray-dark shadow-md rounded-lg'
            >
                <div className='text-center'>
                    <h4 className='text-primary dark:text-gray-light text-base font-medium mt-2'>Welcome Back !</h4>
                    <p className='mt-2 text-gray dark:text-gray-light'>Sign in to continue to Dashboard.</p>
                </div>
                <div className='mt-6'>
                    <InputText
                        disabled={loading}
                        label='Username'
                        placeholder='Enter username'
                        errorMessage={errors.username?.message}
                        {...register('username')}
                    />
                    <InputText
                        disabled={loading}
                        password
                        label='Password'
                        placeholder='Enter password'
                        errorMessage={errors.password?.message}
                        {...register('password')}
                    />
                    <Checkbox
                        disabled={loading}
                        checked={localStorage[storage.rememberMe]}
                        label='Remember me'
                        {...register('rememberMe')}
                    />
                </div>
                <div className='mt-6'>
                    <button
                        type='submit'
                        disabled={loading}
                        className='cursor-pointer bg-success dark:bg-primary w-full py-2 rounded text-white	font-normal hover:bg-[#099885] transition-colors disabled:opacity-50 disabled:cursor-wait'
                    >
                        Sign In
                    </button>
                </div>
            </motion.div>
        </form>
    )
}

export default Login
