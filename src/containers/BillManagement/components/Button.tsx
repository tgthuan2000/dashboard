import { cls, oneOfStyle } from '../../../utils/classname-supporter'
import { colorStyles } from '../../../utils/interfaces'

interface ButtonProps {
    style?: colorStyles
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
                    ['success', 'danger', 'warning', 'info'],
                    [
                        'bg-[rgba(10,179,156,.18)] text-success',
                        'bg-[rgba(240,101,72,.1)] text-danger',
                        'bg-[rgba(247,184,75,.18)] text-warning',
                        'bg-[rgba(41,156,219,.18)] text-info',
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
