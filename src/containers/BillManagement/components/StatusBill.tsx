import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { SortType } from '../../../components'
import { tempDataSort } from '../../../constants'

interface StatusBillProps {
    sortData?: SortType[]
    sortSelected?: SortType
    isOpen?: boolean
}

const StatusBill = ({
    sortData = tempDataSort,
    sortSelected = { _id: '0', name: 'Chờ xác nhận' },
    isOpen,
}: StatusBillProps) => {
    const [showStatus, setShowStatus] = useState(false)
    const [selected, setSelected] = useState(sortData[0])

    if (!isOpen) return null

    return (
        <div className='select-none relative'>
            <span className='text-gray relative after:content-[">"] after:absolute after:dark:text-white after:text-dark after:-right-5 after:top-0 after:translate-x-1/2 mr-10'>
                {sortSelected.name}
            </span>
            <AnimatePresence>
                {!showStatus && (
                    <motion.div
                        initial={{ y: '50%', opacity: 0 }}
                        animate={{ y: '-50%', opacity: 1 }}
                        exit={{ y: '-150%', opacity: 0 }}
                        className='absolute left-full top-1/2 -translate-y-1/2 flex items-center whitespace-nowrap'
                    >
                        <span className='dark:text-white'>{selected.name}</span>
                        <button className='ml-8 bg-danger px-3 py-1 rounded text-white font-semibold hover:opacity-80 transition-opacity'>
                            Save changed
                        </button>
                        <button
                            onClick={() => setShowStatus(true)}
                            className='ml-2 hover:bg-info border border-info text-info px-2 py-1 rounded hover:text-white font-semibold transition-color'
                        >
                            Change
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showStatus && (
                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        className='absolute left-full top-0 flex gap-3 items-center whitespace-nowrap'
                    >
                        {sortData.map((data, index) => (
                            <div
                                key={data._id}
                                className='cursor-pointer hover:opacity-75 dark:text-gray-light'
                                onClick={() => {
                                    setShowStatus(false)
                                    setSelected(data)
                                }}
                            >
                                {data.name}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default StatusBill
