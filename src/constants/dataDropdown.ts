import {
	AdminPanelSettingsOutlined,
	InventoryOutlined,
	MonetizationOnOutlined,
	SpeedOutlined,
} from '@mui/icons-material'

export interface DataDropdown {
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
						to: 'dashboards/ecommerce',
					},
					{
						title: 'Analytics',
						to: 'dashboards/analytics',
					},
					{
						title: 'CRM',
						to: 'dashboards/crm',
					},
				],
			},
			{
				title: 'Payments',
				icon: MonetizationOnOutlined,
				data: [
					{
						title: 'Bill Management',
						to: 'payments/bill-management',
					},
				],
			},
			{
				title: 'Product Managements',
				icon: InventoryOutlined,
				data: [
					{
						title: 'Products',
						to: 'product-managements/products',
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
				icon: AdminPanelSettingsOutlined,
				data: [
					{
						title: 'Password reset',
						to: 'authentication/password-reset',
					},
					{
						title: 'Sign up',
						to: 'authentication/sign-up',
					},
				],
			},
		],
	},
]
export default dataDropdowns
