import React from 'react'
import { Icon } from '@mui/material'
import { cls, activeCls } from '../../../utils/classname-supporter'

interface NavIconProps {
	className?: string
	onClick: React.MouseEventHandler<HTMLSpanElement>
	onBlur?: React.FocusEventHandler<HTMLSpanElement>
	component: React.ElementType
	numberMessage?: number
	typeMessage?: 'danger' | 'info' | 'success' | 'warning'
	children?: JSX.Element
	active?: boolean
}

const NavIcon = ({
	className,
	onClick,
	onBlur,
	component,
	children,
	numberMessage,
	typeMessage = 'danger',
	active = false,
}: NavIconProps) => {
	return (
		<div
			tabIndex={0}
			onBlur={onBlur}
			className={cls('cursor-default h-10 w-10 rounded-full relative', className)}
		>
			<span
				className={cls(
					'group transition-colors cursor-pointer w-full h-full inline-flex items-center justify-center rounded-full',
					activeCls(active, 'bg-[rgba(53,119,241,.1)]', 'hover:bg-[rgba(53,119,241,.1)]')
				)}
				onClick={onClick}
			>
				<Icon
					className={cls(
						'text-gray-dark dark:text-white',
						activeCls(active, 'text-secondary', 'group-hover:text-secondary')
					)}
					style={{ fontSize: 22 }}
					component={component}
				/>
			</span>
			{numberMessage && (
				<span
					className={cls(
						'absolute select-none -top-1 right-0 text-[10px] inline-flex w-4 h-4 rounded-full items-center justify-center font-semibold text-white',
						typeMessage === 'danger' && 'bg-danger',
						typeMessage === 'info' && 'bg-info',
						typeMessage === 'success' && 'bg-success',
						typeMessage === 'warning' && 'bg-warning'
					)}
				>
					{numberMessage}
				</span>
			)}
			{active && children && <div className='absolute right-0 -bottom-10'>{children}</div>}
		</div>
	)
}

export default NavIcon
