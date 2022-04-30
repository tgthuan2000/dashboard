interface SelectionProps {
    placeholder?: string
    label?: string
    errorMessage?: string
    autoFocus?: boolean
    disabled?: boolean
}

const Selection = ({
    placeholder = 'Enter Placeholder',
    label = 'Label',
    errorMessage,
    autoFocus = false,
    disabled = false,
    ...props
}: SelectionProps) => {
    return (
        <div className={'flex flex-col mb-4'}>
            <label className='mb-2 font-medium dark:text-gray-light' htmlFor={`selection-${label}`}>
                {label}
            </label>
            <input
                {...props}
                className={
                    'outline-none focus:ring-transparent focus:border-primary text-sm border border-[#ced4da] py-2 px-4 rounded font-normal text-dark bg-white'
                }
                placeholder={placeholder}
                id={`selection-${label}`}
                type='text'
                autoFocus={autoFocus}
                disabled={disabled}
            />
            {errorMessage && <span className='text-danger p-1'>{errorMessage}</span>}
        </div>
    )
}

export default Selection
