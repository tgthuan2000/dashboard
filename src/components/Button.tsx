import { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { colorStyles } from '../@types'
import { cls, oneOfStyle } from '../utils/classname-supporter'

interface ButtonProps {
    to?: string
    title?: string
    className?: string
    style?: colorStyles
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ to, title = 'Title', className, style = 'primary', onClick }: ButtonProps) => {
    return to ? (
        <Link
            className={cls(
                'py-1 px-3.5 font-medium text-xs rounded text-center cursor-pointer select-none transition-colors hover:text-white',
                oneOfStyle(
                    style,
                    ['success', 'danger', 'warning', 'info', 'primary'],
                    [
                        'bg-[rgba(10,179,156,.18)] text-success hover:bg-success',
                        'bg-[rgba(240,101,72,.1)] text-danger hover:bg-danger',
                        'bg-[rgba(247,184,75,.18)] text-warning hover:bg-warning',
                        'bg-[rgba(41,156,219,.18)] text-info hover:bg-info',
                        'bg-[rgba(64,81,137,.1)] text-primary hover:bg-primary',
                    ]
                ),
                className
            )}
            to={to}
        >
            {title}
        </Link>
    ) : (
        <button
            onClick={onClick}
            className={cls(
                'py-1 px-3.5 font-medium text-xs rounded text-center cursor-pointer select-none transition-colors hover:text-white',
                oneOfStyle(
                    style,
                    ['success', 'danger', 'warning', 'info', 'primary'],
                    [
                        'bg-[rgba(10,179,156,.18)] text-success hover:bg-success',
                        'bg-[rgba(240,101,72,.1)] text-danger hover:bg-danger',
                        'bg-[rgba(247,184,75,.18)] text-warning hover:bg-warning',
                        'bg-[rgba(41,156,219,.18)] text-info hover:bg-info',
                        'bg-[rgba(64,81,137,.1)] text-primary hover:bg-primary',
                    ]
                ),
                className
            )}
        >
            {title}
        </button>
    )
}

export default Button
