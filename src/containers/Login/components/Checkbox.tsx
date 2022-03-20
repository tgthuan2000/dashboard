import { forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormInputs } from '..'

interface CheckboxProps {
	label?: string
}

const Checkbox = forwardRef<
	HTMLInputElement,
	CheckboxProps & ReturnType<UseFormRegister<FormInputs>>
>(({ label = 'Label', ...props }, ref) => {
	return (
		<div className='mb-4'>
			<input
				{...props}
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
})

export default Checkbox
