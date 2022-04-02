import { colorStyles } from '../../../@types'
import { cls, oneOfStyle } from '../../../utils/classname-supporter'

interface ButtonProps {
    style?: colorStyles | 'dark'
    children?: string
    className?: string
}

const Button = ({ style = 'danger', className, children }: ButtonProps) => {
    return (
        <button
            className={cls(
                'py-1 px-3 text-xs font-semibold rounded text-center cursor-default select-none',
                oneOfStyle(
                    style,
                    ['success', 'danger', 'primary', 'warning', 'info', 'dark'],
                    [
                        'bg-[rgba(10,179,156,.18)] text-success',
                        'bg-[rgba(240,101,72,.1)] text-danger',
                        'bg-[rgba(64,81,137,.1)] text-primary',
                        'bg-[rgba(247,184,75,.18)] text-warning',
                        'bg-[rgba(41,156,219,.18)] text-info',
                        'bg-[rgba(33,34,36,0.1)] text-gray-dark dark:text-dark dark:bg-gray transition-colors',
                    ]
                ),
                className
            )}
        >
            {children}
        </button>
    )
}

export default Button
