import { colorStyles } from '../@types'
import { activeCls, cls, oneOfStyle } from '../utils/classname-supporter'

interface ColProps {
    title?: string
    value?: string | number
    stock?: boolean
    stockMessage?: string
    type?: colorStyles
    bold?: boolean
}

const Col = ({
    title = 'Col title',
    value = 'Col value',
    stock = false,
    stockMessage = 'Stock',
    type = 'danger',
    bold = false,
}: ColProps) => {
    return (
        <td className='p-3'>
            <div className='flex flex-col justify-around h-12'>
                {stock ? (
                    <div
                        className={cls(
                            'text-center rounded text-xs font-semibold whitespace-nowrap p-1 select-none',
                            oneOfStyle(
                                type,
                                ['danger', 'warning', 'info', 'success', 'primary'],
                                [
                                    'bg-[rgba(240,101,72,.1)] text-danger',
                                    'bg-[rgba(247,184,75,.18)] text-warning',
                                    'bg-[rgba(41,156,219,.18)] text-info',
                                    'bg-[rgba(10,179,156,.18)] text-success',
                                    'bg-[rgba(64,81,137,.18)] text-primary',
                                ]
                            )
                        )}
                    >
                        {stockMessage}
                    </div>
                ) : (
                    <p className={cls('text-[#495057] dark:text-[#ced4da]', activeCls(bold, 'font-semibold text-sm'))}>
                        {value}
                    </p>
                )}
                <span className='text-gray'>{title}</span>
            </div>
        </td>
    )
}

export default Col
