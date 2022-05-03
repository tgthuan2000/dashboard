import { Icon } from '@mui/material'
import { useState, forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { cls } from '../utils/classname-supporter'

interface TextAreaProps {
    placeholder?: string
    label?: string
    errorMessage?: string
    autoFocus?: boolean
    disabled?: boolean
    className?: string
}

type FormInputs = {
    name: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps & ReturnType<UseFormRegister<FormInputs>>>(
    (
        {
            placeholder = 'Enter Placeholder',
            label = 'Label',
            errorMessage,
            autoFocus = false,
            disabled = false,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div className={cls('flex flex-col mb-4', className)}>
                <label className='mb-2 font-medium dark:text-gray-light' htmlFor={`input-${label}`}>
                    {label}
                </label>
                <textarea
                    {...props}
                    rows={10}
                    ref={ref}
                    className={cls(
                        'outline-none focus:ring-transparent focus:border-primary text-sm border border-[#ced4da] py-2 px-4 rounded font-normal text-dark bg-white'
                    )}
                    placeholder={placeholder}
                    id={`input-${label}`}
                    autoFocus={autoFocus}
                    disabled={disabled}
                />
                {errorMessage && <span className='text-danger p-1'>{errorMessage}</span>}
            </div>
        )
    }
)

export default TextArea
