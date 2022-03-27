import { Icon } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

interface IconButtonProps {
    to?: string
    icon: React.ElementType<any>
    title: string
}

const IconButton = ({ to, icon, title }: IconButtonProps) =>
    to ? (
        <Link
            to={to}
            className='flex gap-1 tracking-wide hover:bg-success hover:text-white transition-colors items-center py-2 px-4 rounded text-success bg-[rgba(41,156,219,.18)]'
        >
            <Icon component={icon} style={{ fontSize: 16 }} />
            {title}
        </Link>
    ) : (
        <button className='flex gap-1 tracking-wide hover:bg-success hover:text-white transition-colors items-center py-2 px-4 rounded text-success bg-[rgba(41,156,219,.18)]'>
            <Icon component={icon} style={{ fontSize: 16 }} />
            {title}
        </button>
    )

export default IconButton
