import { useDropdown } from '../../hooks'
import { dataDropdowns } from '../../constants'
import { NavMenu, NavList, NavItem } from './components'
import { motion } from 'framer-motion'

const NavbarVertical = () => {
	const { dropdowns, onClick } = useDropdown(dataDropdowns)

	return (
		<motion.div
			initial={{ opacity: 0, x: '-50vw' }}
			animate={{ opacity: 1, x: 0 }}
			className='fixed top-[calc(70px+1.5rem)] bottom-6 z-10 bg-primary dark:bg-dark w-[250px] rounded-md py-[10px] select-none overflow-y-auto hidden md:block transition-all'
		>
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
		</motion.div>
	)
}

export default NavbarVertical
