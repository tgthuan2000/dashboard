import React from 'react'

interface BoxChildProps {
	children?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}
const BoxChild = ({ children = 'Option', onClick }: BoxChildProps) => {
	return (
		<li className='w-full'>
			<button
				onClick={onClick}
				className='inline-block text-left w-full px-5 py-2 text-dark dark:text-[#b9bfc4] hover:text-[#1e2125] dark:hover:bg-[#2f343a] hover:bg-[#f3f6f9] bg-transparent'
			>
				{children}
			</button>
		</li>
	)
}
export default BoxChild
