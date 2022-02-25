import { Icon } from '@mui/material'
import React from 'react'
import { activeCls, cls } from '../../../utils/classname-supporter'

interface ButtonPaginateProps {
	value?: string | number
	icon?: React.ElementType
	className?: string
	active?: boolean
}
const ButtonPaginate = ({ value = '0', icon, className, active = false }: ButtonPaginateProps) => {
	return (
		<button
			className={cls(
				'px-2 py-1 rounded border text-xs transition-colors',
				activeCls(
					active,
					'bg-primary text-white dark:border-primary pointer-events-none',
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
