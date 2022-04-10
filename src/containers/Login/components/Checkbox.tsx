import { forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormInputs } from '..'
import { cls } from '../../../utils/classname-supporter'

interface CheckboxProps {
    label?: string
    checked?: boolean
    disabled?: boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps & ReturnType<UseFormRegister<FormInputs>>>(
    ({ label = 'Label', checked = false, disabled = false, ...props }, ref) => {
        return (
            <div className='mb-4'>
                <input
                    {...props}
                    defaultChecked={checked}
                    ref={ref}
                    className={disabled ? '' : 'cursor-pointer'}
                    type='checkbox'
                    id={label && `checbox-${label}`}
                    disabled={disabled}
                />
                {label && (
                    <label
                        className={cls(
                            'ml-2 select-nonedark:text-gray-light h-4 w-4 rounded text-primary',
                            !disabled && 'cursor-pointer'
                        )}
                        htmlFor={`checbox-${label}`}
                    >
                        {label}
                    </label>
                )}
            </div>
        )
    }
)

export default Checkbox
