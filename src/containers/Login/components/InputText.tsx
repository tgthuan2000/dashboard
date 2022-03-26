import { RemoveRedEyeOutlined, VisibilityOffOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { useState, forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormInputs } from '..'
import { activeCls, cls } from '../../../utils/classname-supporter'

interface InputTextProps {
    placeholder?: string
    label?: string
    password?: boolean
    errorMessage?: string
    autoFocus?: boolean
}

const InputText = forwardRef<HTMLInputElement, InputTextProps & ReturnType<UseFormRegister<FormInputs>>>(
    (
        {
            placeholder = 'Enter Placeholder',
            label = 'Label',
            password = false,
            errorMessage,
            autoFocus = false,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false)
        return (
            <div className={cls('flex flex-col mb-4', activeCls(password, 'relative'))}>
                <label className='mb-2 font-medium dark:text-gray-light' htmlFor={`input-${label}`}>
                    {label}
                </label>
                <input
                    {...props}
                    ref={ref}
                    className={cls(
                        'outline-none border border-[#ced4da] py-2 px-4 rounded font-normal text-dark bg-white',
                        activeCls(password, 'pr-10')
                    )}
                    placeholder={placeholder}
                    id={`input-${label}`}
                    type={password ? (showPassword ? 'text' : 'password') : 'text'}
                    autoFocus={autoFocus}
                />
                {password && (
                    <span
                        className='absolute right-0 bottom-0 w-[38px] h-[38px] flex items-center justify-center'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <Icon
                            className='text-gray cursor-pointer'
                            component={showPassword ? RemoveRedEyeOutlined : VisibilityOffOutlined}
                            style={{ fontSize: 16 }}
                        />
                    </span>
                )}
                {errorMessage && <span className='text-danger p-1'>{errorMessage}</span>}
            </div>
        )
    }
)

export default InputText
