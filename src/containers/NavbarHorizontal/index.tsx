import {
	Close,
	DarkModeOutlined,
	LightModeOutlined,
	NotificationsNoneOutlined,
	Search,
} from '@mui/icons-material'
import { Icon } from '@mui/material'
import { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { NavIcon, PersonConfig } from './components'

const NavbarHorizontal = () => {
	const [input, setInput] = useState('')
	const [showNotify, setShowNotify] = useState(false)
	const [showPersonConfig, setShowPersonConfig] = useState(false)
	const [darkMode, setDarkMode] = useState(
		localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
	)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(input)
	}

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
		<div className='fixed z-10 top-0 left-0 right-0 shadow-sm bg-white dark:bg-[#292e32] transition-colors'>
			<div className='h-[70px] max-w-[95%] px-6 bg-transparent mx-auto flex items-center justify-between'>
				{/* left */}
				<div className='flex items-center'>
					<span className='inline-block text-4xl font-light dark:text-white cursor-pointer'>
						Dashboard
					</span>
					<div className='relative bg-[#f3f3f9] dark:bg-[#202328] ml-[74px] flex items-center border-0 rounded transition-colors'>
						<Icon
							className='ml-3 mr-2 text-gray dark:text-[#ced4da]'
							style={{ fontSize: 18 }}
							component={Search}
						/>
						<form onSubmit={handleSubmit}>
							<input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								type='text'
								placeholder='Search...'
								className='bg-transparent dark:text-[#ced4da] h-[38px] max-w-[282px] pr-8 text-sm outline-none'
							/>
						</form>
						{input.length > 0 && (
							<span
								className='w-4 h-4 rounded-full bg-gray absolute right-2 text-white dark:text-dark flex items-center justify-center'
								onClick={() => setInput('')}
							>
								<Icon style={{ fontSize: 14 }} component={Close} />
							</span>
						)}
					</div>
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
		</div>
	)
}

export default NavbarHorizontal
