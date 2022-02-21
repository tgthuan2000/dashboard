import { LogoutOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import React from 'react'
import { cls } from '../utils/classname-supporter'

interface PersonConfigProps {
	className?: string
	title?: string
	description?: string
	active?: boolean
	onClick: React.MouseEventHandler<HTMLSpanElement>
	onBlur?: React.FocusEventHandler<HTMLSpanElement>
}

const PersonConfig = ({
	className,
	title = 'Tran Gia Thuan',
	description = 'Leader',
	active = false,
	onClick,
	onBlur,
}: PersonConfigProps) => {
	return (
		<div
			tabIndex={0}
			onClick={onClick}
			onBlur={onBlur}
			className={cls(
				'cursor-pointer select-none h-full bg-[#f3f3f9] dark:bg-[#31373c] transition-colors py-2 px-4 relative flex items-center max-w-[300px]',
				className
			)}
		>
			<img
				className='w-8 h-8 rounded-full flex items-center justify-center bg-gray shrink-0'
				src=''
				alt='T'
			/>
			<div className='flex-1 overflow-hidden flex ml-3 flex-col justify-between'>
				<h3 className='leading-normal text-sm text-[#495057] dark:text-[#cde4ca] font-medium overflow-hidden text-ellipsis whitespace-nowrap'>
					{title}
				</h3>
				<p className='text-xs text-[#878a99] dark:text-[#878a99] overflow-hidden whitespace-nowrap text-ellipsis'>
					{description}
				</p>
			</div>

			{/* Dropdown */}
			{active && (
				<div className='absolute z-10 top-[95%] right-0 min-w-[10rem] py-2 text-sm bg-white dark:bg-[#292e33] rounded-md shadow-md'>
					<PersonItem text='Logout' icon={LogoutOutlined} />
				</div>
			)}
		</div>
	)
}

interface PersonItemProps {
	text: string
	icon: React.ElementType
}
const PersonItem = ({ text, icon }: PersonItemProps) => {
	return (
		<div className='w-full px-5 py-1 text-dark dark:text-[#b9bfc4] hover:text-[#1e2125] dark:hover:bg-[#2f343a] hover:bg-[#f3f6f9] bg-transparent flex items-center'>
			<Icon className='text-[#878a99]' component={icon} style={{ fontSize: 16 }} />
			<p className='font-normal text-sm whitespace-nowrap ml-2'>{text}</p>
		</div>
	)
}

export default PersonConfig
