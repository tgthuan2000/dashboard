import { SpeedOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavMenu, NavList, NavItem } from './components'
interface link {
	title: string
	to: string
}
const links: link[] = [
	{
		title: 'Home',
		to: '/',
	},
	{
		title: 'Ecommerce',
		to: '/ecommerce',
	},
	{
		title: 'RFID',
		to: '/rfid',
	},
]

const NavbarVertical = () => {
	const navigate = useNavigate()
	const [showDashboards, setShowDashboards] = useState(false)
	const handleDetailClick = (to: string) => {
		setShowDashboards(!showDashboards)
		navigate(to)
	}
	return (
		<div className='fixed top-[calc(70px+1.5rem)] bottom-6 z-10 bg-primary dark:bg-dark transition-colors w-[250px] rounded-md py-[10px] select-none'>
			<NavMenu title='menu'>
				<NavList
					title='Dashboards'
					icon={SpeedOutlined}
					active={showDashboards}
					onClick={() => setShowDashboards(!showDashboards)}
				>
					{links.map((link, index) => (
						<NavItem
							key={`${link}-${index}`}
							title={link.title}
							onClick={() => handleDetailClick(link.to)}
						/>
					))}
				</NavList>
			</NavMenu>
		</div>
	)
}

export default NavbarVertical
