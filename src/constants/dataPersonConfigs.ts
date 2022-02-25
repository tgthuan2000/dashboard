import { LogoutOutlined } from '@mui/icons-material'
import React from 'react'

interface DataPersonConfig {
	title: string
	icon: React.ElementType
	link: string
}

const dataPersonConfigs: DataPersonConfig[] = [
	{
		title: 'Logout',
		icon: LogoutOutlined,
		link: '/auth',
	},
]

export default dataPersonConfigs
