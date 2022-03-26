import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PersonItem } from '.'
import { Avatar } from '../../../components'
import { dataPersonConfigs } from '../../../constants'
import { useAccount } from '../../../features'
import { cls } from '../../../utils/classname-supporter'

interface PersonConfigProps {
    className?: string
    title?: string
    description?: string
    active?: boolean
    onClick: React.MouseEventHandler<HTMLSpanElement>
    onBlur?: React.FocusEventHandler<HTMLSpanElement>
}

const PersonConfig = ({ className, active = false, onClick, onBlur }: PersonConfigProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { fullName } = useAccount()
    return (
        <div
            tabIndex={0}
            onClick={onClick}
            onBlur={onBlur}
            className={cls(
                'cursor-pointer select-none h-full bg-[#f3f3f9] dark:bg-[#31373c] transition-colors py-2 px-4 relative flex items-center max-w-[300px]',
                className
            )}
        >
            <Avatar alt={fullName?.[0]} />
            <div className='flex-1 overflow-hidden flex ml-3 flex-col justify-between'>
                <h3 className='leading-normal text-sm text-[#495057] dark:text-[#cde4ca] font-medium overflow-hidden text-ellipsis whitespace-nowrap'>
                    {fullName}
                </h3>
                <p className='text-xs text-[#878a99] dark:text-[#878a99] overflow-hidden whitespace-nowrap text-ellipsis'>
                    Admin
                </p>
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className='absolute top-[95%] right-0 min-w-[10rem] py-2 text-sm bg-white dark:bg-[#292e33] rounded-md shadow-md'
                    >
                        {dataPersonConfigs.map((config) => (
                            <PersonItem
                                key={config.title}
                                text={config.title}
                                icon={config.icon}
                                onClick={() => config.action(dispatch, navigate)}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
export default PersonConfig
