interface NavMenuProps {
	children: JSX.Element
	title: string
}
const NavMenu = ({ children, title }: NavMenuProps) => {
	return (
		<div className='w-full'>
			<h4 className='uppercase text-[#838fb9] dark:text-[#5f6270] font-semibold text-[11px] px-5 py-4'>
				{title}
			</h4>
			<div className=''>{children}</div>
		</div>
	)
}

export default NavMenu
