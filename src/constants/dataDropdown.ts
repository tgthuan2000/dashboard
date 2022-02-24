import { SpeedOutlined } from '@mui/icons-material'

interface DataDropdown {
	title: string
	list: {
		title: string
		icon: React.ElementType
		data: {
			title: string
			to: string
		}[]
	}[]
}

const dataDropdowns: DataDropdown[] = [
	{
		title: 'menu',
		list: [
			{
				title: 'Dashboards',
				icon: SpeedOutlined,
				data: [
					{
						title: 'Ecommerce',
						to: 'ecommerce',
					},
					{
						title: 'Analytics',
						to: 'analytics',
					},
					{
						title: 'CRM',
						to: 'crm',
					},
				],
			},
		],
	},
	{
		title: 'pages',
		list: [
			{
				title: 'Authentication',
				icon: SpeedOutlined,
				data: [
					{
						title: 'Password reset',
						to: 'password-reset',
					},
					{
						title: 'Sign up',
						to: 'sign-up',
					},
				],
			},
		],
	},
]
export default dataDropdowns
