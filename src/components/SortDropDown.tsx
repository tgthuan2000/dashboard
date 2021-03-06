import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BoxChild, Loading } from '.'
import { tempDataSort } from '../constants'

export interface SortType {
    _id: string
    name: string
}

interface SortDropDownProps {
    sortData?: SortType[]
    sortTitle?: string
    sortSelected?: SortType
    onSortChange?: (_id: string) => void
    loading?: boolean
}

const SortDropDown = ({
    sortData = tempDataSort,
    sortSelected = { _id: '0', name: 'Current Week' },
    sortTitle,
    onSortChange,
    loading = false,
}: SortDropDownProps) => {
    const [showDropdown, setShowDropdown] = useState(false)

    const handleSortClick = (_id: string) => {
        setShowDropdown(false)
        onSortChange?.(_id)
    }

    if (loading) return <Loading size='extra-small' />

    return (
        <div
            // tabIndex={-1}
            // onBlur={() => setShowDropdown(false)}
            className='relative flex-shrink-0 cursor-pointer select-none ml-2'
        >
            <div onClick={() => setShowDropdown(!showDropdown)}>
                <span className='font-semibold uppercase text-xs dark:text-[#ced4da]'>{sortTitle}</span>
                <span className='ml-2 text-gray inline-flex items-center'>
                    {sortSelected?.name}
                    <Icon className='ml-1' component={KeyboardArrowDownOutlined} style={{ fontSize: 16 }} />
                </span>
            </div>
            <AnimatePresence>
                {showDropdown && (
                    <motion.ul
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className='absolute z-10 right-0 top-[calc(100%+10px)] py-2 min-w-[10rem] shadow-md rounded bg-white dark:bg-dark'
                    >
                        {sortData.map(({ _id, name }) => (
                            <BoxChild key={_id} onClick={() => handleSortClick(_id)}>
                                {name}
                            </BoxChild>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SortDropDown
