import { forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormInputs } from '..'

interface CheckboxProps {
    label?: string
    checked?: boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps & ReturnType<UseFormRegister<FormInputs>>>(
    ({ label = 'Label', checked = false, ...props }, ref) => {
        return (
            <div className='mb-4'>
                <input
                    {...props}
                    defaultChecked={checked}
                    ref={ref}
                    className='cursor-pointer'
                    type='checkbox'
                    id={label && `checbox-${label}`}
                />
                {label && (
                    <label className='ml-2 select-none cursor-pointer' htmlFor={`checbox-${label}`}>
                        {label}
                    </label>
                )}
            </div>
        )
    }
)

export default Checkbox
