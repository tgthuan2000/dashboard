import { Icon } from '@mui/material'
import React from 'react'
import { activeCls, cls } from '../../../utils/classname-supporter'

export type CardLogoColor = 'success' | 'info' | 'primary' | 'warning'

interface CardLogoProps {
	icon: React.ElementType
	color: CardLogoColor
}

const CardLogo = ({ icon, color }: CardLogoProps) => {
	return (
		<span
			className={cls(
				'w-12 h-12 rounded-md flex items-center justify-center',
				activeCls(color === 'success', 'bg-[rgba(10,179,156,.18)]'),
				activeCls(color === 'info', 'bg-[rgba(41,156,219,.18)]'),
				activeCls(color === 'primary', 'bg-[rgba(64,81,137,.18)]'),
				activeCls(color === 'warning', 'bg-[rgba(247,184,75,.18)]')
			)}
		>
			<Icon
				component={icon}
				className={cls(
					activeCls(color === 'success', 'text-success'),
					activeCls(color === 'info', 'text-info'),
					activeCls(color === 'primary', 'text-primary'),
					activeCls(color === 'warning', 'text-warning')
				)}
			/>
		</span>
	)
}

export default CardLogo
