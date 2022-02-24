import { useDropdown } from '../../hooks'
import { dataDropdowns } from '../../constants'
import { NavMenu, NavList, NavItem } from './components'

const NavbarVertical = () => {
	const { dropdowns, onClick } = useDropdown(dataDropdowns)

	return (
		<div className='fixed top-[calc(70px+1.5rem)] bottom-6 z-10 bg-primary dark:bg-dark transition-colors w-[250px] rounded-md py-[10px] select-none overflow-y-auto'>
			{dataDropdowns.map(({ title, list }, dropdownIndex) => (
				<NavMenu key={`${title}-${dropdownIndex}`} title={title}>
					{list.map(({ title, icon, data }, index) => (
						<NavList
							key={`${title}-${index}`}
							title={title}
							icon={icon}
							active={dropdowns[dropdownIndex][index]}
							links={data.map((x) => x.to)}
							onClick={() => {
								onClick(dropdownIndex, index)
							}}
						>
							{data.map(({ title, to }, index) => (
								<NavItem key={`${title}-${index}`} title={title} href={to} />
							))}
						</NavList>
					))}
				</NavMenu>
			))}
		</div>
	)
}

export default NavbarVertical
