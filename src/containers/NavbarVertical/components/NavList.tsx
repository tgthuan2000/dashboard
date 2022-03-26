import { ArrowForwardIosOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { activeCls, cls } from '../../../utils/classname-supporter'

interface NavListProps {
    title: string
    icon: React.ElementType
    children: JSX.Element[] | JSX.Element
    active?: boolean
    onClick?: React.MouseEventHandler<HTMLSpanElement>
    links: string[]
}

const NavList = ({ icon, title, children, active = false, onClick, links }: NavListProps) => {
    const { pathname } = useLocation()
    return (
        <div className='w-full'>
            <span
                onClick={onClick}
                className={cls(
                    'cursor-pointer w-full inline-flex items-center justify-between px-6 py-[.625rem] transition-colors',
                    activeCls(
                        active || links.includes(pathname.split('/')[1]),
                        'text-white',
                        'text-[#abb9e8] dark:text-gray hover:text-white'
                    )
                )}
            >
                <div className='inline-flex items-center'>
                    <Icon component={icon} style={{ fontSize: 18 }} />
                    <p className='ml-2 text-sm'>{title}</p>
                </div>
                <span className={cls('transition-transform', activeCls(active, 'rotate-90'))}>
                    <Icon component={ArrowForwardIosOutlined} style={{ fontSize: 12 }} />
                </span>
            </span>
            <AnimatePresence initial={false}>
                {active && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className='w-full text-[#abb9e8] dark:text-[#7c7f90]'
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default NavList
