import { Icon } from '@mui/material'
import React from 'react'
import { colorStyles } from '../../../@types'
import { cls, oneOfStyle } from '../../../utils/classname-supporter'

interface CardLogoProps {
    icon: React.ElementType
    color: colorStyles
}

const CardLogo = ({ icon, color }: CardLogoProps) => {
    return (
        <span
            className={cls(
                'w-12 h-12 rounded-md flex items-center justify-center',
                oneOfStyle(
                    color,
                    ['success', 'info', 'primary', 'warning'],
                    [
                        'bg-[rgba(10,179,156,.18)]',
                        'bg-[rgba(41,156,219,.18)]',
                        'bg-[rgba(64,81,137,.18)]',
                        'bg-[rgba(247,184,75,.18)]',
                    ]
                )
            )}
        >
            <Icon
                component={icon}
                className={cls(
                    oneOfStyle(
                        color,
                        ['success', 'info', 'primary', 'warning'],
                        ['text-success', 'text-info', 'text-primary', 'text-warning']
                    )
                )}
            />
        </span>
    )
}

export default CardLogo
