import { RemoveRedEyeOutlined, VisibilityOffOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { useState, forwardRef, HTMLInputTypeAttribute } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { activeCls, cls } from '../utils/classname-supporter'

interface InputTextProps {
    placeholder?: string
    label?: string
    password?: boolean
    errorMessage?: string
    autoFocus?: boolean
    disabled?: boolean
    type?: HTMLInputTypeAttribute
}

type FormInputs = {
    username: string
    password: string
    rememberMe: boolean
    name: string
}

const InputText = forwardRef<HTMLInputElement, InputTextProps & ReturnType<UseFormRegister<FormInputs>>>(
    (
        {
            placeholder = 'Enter Placeholder',
            label = 'Label',
            password = false,
            errorMessage,
            autoFocus = false,
            disabled = false,
            type = 'text',
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false)
        return (
            <div className='mb-4'>
                <div className={cls('flex flex-col', activeCls(password, 'relative'))}>
                    <label className='mb-2 font-medium dark:text-gray-light' htmlFor={`input-${label}`}>
                        {label}
                    </label>
                    <input
                        {...props}
                        ref={ref}
                        className={cls(
                            'outline-none focus:ring-transparent focus:border-primary text-sm border border-[#ced4da] py-2 px-4 rounded font-normal text-dark bg-white',
                            activeCls(password, 'pr-10')
                        )}
                        placeholder={placeholder}
                        id={`input-${label}`}
                        type={password ? (showPassword ? 'text' : 'password') : type}
                        autoFocus={autoFocus}
                        disabled={disabled}
                    />
                    {password && (
                        <span
                            className='absolute right-0 bottom-0 w-[38px] h-[38px] flex items-center justify-center'
                            onClick={() => !disabled && setShowPassword(!showPassword)}
                        >
                            <Icon
                                className={cls('text-gray', !disabled && 'cursor-pointer')}
                                component={showPassword ? RemoveRedEyeOutlined : VisibilityOffOutlined}
                                style={{ fontSize: 16 }}
                            />
                        </span>
                    )}
                </div>
                {errorMessage && <span className='text-danger p-1'>{errorMessage}</span>}
            </div>
        )
    }
)

export default InputText
