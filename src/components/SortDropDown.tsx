import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BoxChild } from '.'

interface SortDropDownProps {
    sortData?: string[]
    sortTtile?: string
    sortSelected?: string
}
const SortDropDown = ({
    sortData = ['Today', 'Last week', 'Last Month', 'Current Year'],
    sortSelected = 'Current Week',
    sortTtile,
}: SortDropDownProps) => {
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <div
            tabIndex={0}
            onBlur={() => setShowDropdown(false)}
            className='relative flex-shrink-0 cursor-pointer select-none ml-2'
        >
            <div onClick={() => setShowDropdown(!showDropdown)}>
                <span className='font-semibold uppercase text-xs dark:text-[#ced4da]'>{sortTtile}</span>
                <span className='ml-2 text-gray inline-flex items-center'>
                    {sortSelected}
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
                        {sortData.map((x, i) => (
                            <BoxChild key={i} onClick={() => setShowDropdown(false)}>
                                {x}
                            </BoxChild>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SortDropDown
