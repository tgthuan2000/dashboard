import { useForm } from 'react-hook-form'
import { Checkbox, InputText } from './components'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

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
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>({ resolver: yupResolver(schema) })

	const onSubmit = (data: FormInputs) => {
		console.log(data)
		navigate('/')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='w-96 p-6 bg-white shadow-md rounded-lg'>
				<div className='text-center'>
					<h4 className='text-primary text-base font-medium mt-2'>Welcome Back !</h4>
					<p className='mt-2 text-gray'>Sign in to continue to Dashboard.</p>
				</div>
				<div className='mt-6'>
					<InputText
						label='Username'
						placeholder='Enter username'
						errorMessage={errors.username?.message}
						{...register('username')}
					/>
					<InputText
						password
						label='Password'
						placeholder='Enter password'
						errorMessage={errors.password?.message}
						{...register('password')}
					/>
					<Checkbox label='Remember me' {...register('rememberMe')} />
				</div>
				<div className='mt-6'>
					<button
						type='submit'
						className='cursor-pointer bg-success w-full py-2 rounded text-white	font-normal hover:bg-[#099885] transition-colors'
					>
						Sign In
					</button>
				</div>
			</div>
		</form>
	)
}

export default Login
