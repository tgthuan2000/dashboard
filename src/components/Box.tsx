import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { useState } from 'react'
import { BoxChild } from '.'
import { cls } from '../utils/classname-supporter'

interface BoxProps {
	className?: string
	children?: JSX.Element | JSX.Element[]
	headerTitle?: string
	sortData?: string[]
	sortSelected?: string
}

const Box = ({
	className,
	children,
	headerTitle = 'Audiences Sessions by Country',
	sortData = ['Today', 'Last week', 'Last Month', 'Current Year'],
	sortSelected = 'Current Week',
}: BoxProps) => {
	const [showDropdown, setShowDropdown] = useState(false)
	return (
		<div
			className={cls('bg-white dark:bg-dark transition-colors shadow-md rounded', className)}
		>
			<div className='flex justify-between items-center p-4 border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'>
				<h4 className='flex-1 text-base text-[#495057] dark:text-[#ced4da] font-medium whitespace-nowrap overflow-hidden text-ellipsis'>
					{headerTitle}
				</h4>
				<div
					tabIndex={0}
					className='relative flex items-center flex-shrink-0 cursor-pointer select-none ml-2'
					onClick={() => setShowDropdown(!showDropdown)}
					onBlur={() => setShowDropdown(false)}
				>
					<span className='font-semibold uppercase text-xs dark:text-[#ced4da]'>
						Sort by:
					</span>
					<span className='ml-2 text-gray inline-flex items-center'>
						{sortSelected}
						<Icon
							className='ml-1'
							component={KeyboardArrowDownOutlined}
							style={{ fontSize: 16 }}
						/>
					</span>
					{showDropdown && (
						<ul className='ml-2 absolute z-10 right-0 top-[calc(100%+10px)] py-2 min-w-[10rem] shadow-md rounded bg-white dark:bg-dark'>
							{sortData.map((x, i) => (
								<BoxChild key={i}>{x}</BoxChild>
							))}
						</ul>
					)}
				</div>
			</div>
			{children}
		</div>
	)
}

export default Box
