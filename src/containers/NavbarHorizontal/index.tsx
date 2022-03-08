import {
	Close,
	DarkModeOutlined,
	LightModeOutlined,
	NotificationsNoneOutlined,
	Search,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { NavIcon, PersonConfig } from './components'

const NavbarHorizontal = () => {
	const [showNotify, setShowNotify] = useState(false)
	const [showPersonConfig, setShowPersonConfig] = useState(false)
	const [darkMode, setDarkMode] = useState(
		localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
	)

	const handleDarkModeClick = () => {
		if (darkMode) {
			document.documentElement.classList.remove('dark')
			localStorage.theme = 'light'
		} else {
			document.documentElement.classList.add('dark')
			localStorage.theme = 'dark'
		}
		setDarkMode(!darkMode)
	}
	const handleNotifyClick = () => {
		setShowNotify(!showNotify)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -100 }}
			animate={{ opacity: 1, y: 0 }}
			className='fixed z-10 top-0 left-0 right-0 shadow-sm bg-white dark:bg-[#292e32] transition-colors'
		>
			<div className='h-[70px] max-w-[95%] px-6 bg-transparent mx-auto flex items-center justify-between'>
				{/* left */}
				<div className='flex items-center'>
					<span className='inline-block text-4xl font-light dark:text-white cursor-pointer'>
						Dashboard
					</span>
				</div>
				{/* right */}
				<div className='flex items-center h-full'>
					<NavIcon
						component={darkMode ? LightModeOutlined : DarkModeOutlined}
						onClick={handleDarkModeClick}
					/>
					<NavIcon
						className='ml-1'
						component={NotificationsNoneOutlined}
						numberMessage={3}
						onClick={handleNotifyClick}
						onBlur={() => setShowNotify(false)}
						active={showNotify}
					>
						<div className=''>hello</div>
					</NavIcon>
					<PersonConfig
						className='ml-5'
						active={showPersonConfig}
						onClick={() => setShowPersonConfig(!showPersonConfig)}
						onBlur={() => setShowPersonConfig(false)}
					/>
				</div>
			</div>
		</motion.div>
	)
}

export default NavbarHorizontal
