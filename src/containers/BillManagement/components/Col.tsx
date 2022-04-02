import { MouseEventHandler, ReactElement } from 'react'
import { cls } from '../../../utils/classname-supporter'

interface ColProps {
    children?: string | ReactElement<any, any>
    className?: string
}

const Col = ({ children, className }: ColProps) => {
    return <td className={cls('py-3 px-2', className)}>{children}</td>
}

export default Col
