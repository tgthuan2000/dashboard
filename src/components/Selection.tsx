import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { cls } from '../utils/classname-supporter'
import BoxChild from './BoxChild'

interface SelectionProps {
    placeholder?: string
    label?: string
    errorMessage?: string
    autoFocus?: boolean
    disabled?: boolean
    onChange?: (id: string) => void
    data?: { _id: string; name: string }[]
    selected?: string
}

const Selection = ({
    placeholder = 'Placeholder',
    label = 'Label',
    errorMessage,
    autoFocus = false,
    disabled = false,
    onChange,
    selected,
    data = [],
    ...props
}: SelectionProps) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedChange, setSelectedChange] = useState(data.find((i) => i._id === selected))

    const handleChange = (value: { _id: string; name: string }) => {
        setShowDropdown(false)
        onChange?.(value._id)
        setSelectedChange(value)
    }

    return (
        <div className='flex flex-col mb-4'>
            <label className='mb-2 font-medium dark:text-gray-light' htmlFor={`selection-${label}`}>
                {label}
            </label>
            <div className='relative'>
                <div
                    className='flex items-center justify-between outline-none focus:ring-transparent focus:border-primary text-sm border border-[#ced4da] py-2 rounded font-normal text-dark bg-white'
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <span
                        className={cls(
                            'ml-4 inline-flex items-center',
                            !selectedChange ? 'select-none text-gray' : 'text-dark'
                        )}
                    >
                        {selectedChange?.name || placeholder}
                    </span>
                    <Icon className='ml-1 mr-3' component={KeyboardArrowDownOutlined} style={{ fontSize: 16 }} />
                </div>
                <AnimatePresence>
                    {showDropdown && (
                        <motion.ul
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            className='absolute w-full border border-[#ced4da] z-10 right-0 top-[calc(100%+10px)] py-2 min-w-[10rem] shadow-md rounded bg-white dark:bg-dark'
                        >
                            {data.length > 0 ? (
                                data.map((value) => (
                                    <BoxChild key={value._id} onClick={() => handleChange(value)}>
                                        {value.name}
                                    </BoxChild>
                                ))
                            ) : (
                                <BoxChild disabled>No data</BoxChild>
                            )}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
            {errorMessage && <span className='text-danger p-1'>{errorMessage}</span>}
        </div>
    )
}

export default Selection
