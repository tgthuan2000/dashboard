import { ReactElement } from 'react'
import { activeCls, cls } from '../utils/classname-supporter'

interface ColHeaderProps {
	children?: ReactElement<any, any> | string
	isCenter?: boolean
}

const ColHeader = ({ children, isCenter = false }: ColHeaderProps) => {
	return (
		<th
			className={cls(
				'font-semibold py-3 px-2',
				activeCls(isCenter, 'text-center', 'text-left')
			)}
		>
			{children}
		</th>
	)
}

export default ColHeader
