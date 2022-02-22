import React from 'react'

interface NavItemProps {
	title: string
	onClick: React.MouseEventHandler<HTMLLIElement>
}
const NavItem = ({ title, onClick }: NavItemProps) => {
	return (
		<li
			onClick={onClick}
			className='cursor-pointer w-full inline-flex pl-12 py-2 pr-6 hover:text-white transition-colors'
		>
			<p className='text-sm relative before:absolute before:content-["-"] before:-left-5 before:font-bold'>
				{title}
			</p>
		</li>
	)
}

export default NavItem
