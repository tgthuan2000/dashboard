import React from 'react'
import { activeCls, cls } from '../../../utils/classname-supporter'

interface ButtonProps {
	children?: string
	className?: string
	color?: 'info' | 'primary'
	active?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({
	children = 'Button',
	className,
	color = 'info',
	active = false,
	onClick,
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cls(
				'cursor-pointer px-2 py-1 rounded text-center transition-colors',
				activeCls(
					color === 'info',
					'text-info bg-[rgba(53,119,241,.1)] hover:bg-[#3577f1] hover:text-white',
					'bg-[#3577f1] text-white',
					active
				),
				activeCls(
					color === 'primary',
					'text-primary bg-[rgba(64,81,137,.1)] hover:bg-primary hover:text-white',
					'bg-primary text-white',
					active
				),
				className
			)}
		>
			{children}
		</button>
	)
}

export default Button
