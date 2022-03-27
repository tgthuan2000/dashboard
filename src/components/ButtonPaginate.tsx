import { Icon } from '@mui/material'
import React, { MouseEventHandler } from 'react'
import { activeCls, cls } from '../utils/classname-supporter'

interface ButtonPaginateProps {
    value?: string | number
    icon?: React.ElementType
    className?: string
    active?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}
const ButtonPaginate = ({ value = '0', icon, className, active = false, onClick, disabled }: ButtonPaginateProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cls(
                'w-6 h-6 rounded border text-xs transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed',
                activeCls(
                    active,
                    'bg-primary border-primary text-white dark:border-primary pointer-events-none',
                    'bg-white dark:text-[#ced4da] dark:bg-dark dark:border-[#32383e] text-primary border-[#e9ebec] hover:bg-[#eff2f7] dark:hover:bg-[#2a2f34]'
                ),
                className
            )}
        >
            {icon ? <Icon component={icon} style={{ fontSize: 12 }} /> : value}
        </button>
    )
}

export default ButtonPaginate
