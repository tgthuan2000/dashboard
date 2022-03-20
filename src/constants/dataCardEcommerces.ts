import {
	AccountCircleOutlined,
	MonetizationOnOutlined,
	WorkOutlineOutlined,
} from '@mui/icons-material'
import { CardLogoColor } from '../containers/Ecommerce/components'

interface DataCardEcommerce {
	title: string
	rate: number | string
	value: string | number
	icon: React.ElementType
	color: CardLogoColor
	linkTitle: string
	linkTo: string
}

const dataCardEcommerces: DataCardEcommerce[] = [
	{
		title: 'total earnings',
		rate: -16,
		value: '100k',
		icon: MonetizationOnOutlined,
		color: 'success',
		linkTitle: 'View net earnings',
		linkTo: '/',
	},
	{
		title: 'orders',
		rate: 16,
		value: '132.123k',
		icon: WorkOutlineOutlined,
		color: 'info',
		linkTitle: 'View all orders',
		linkTo: '/',
	},
	{
		title: 'customers',
		rate: '0.015',
		value: '40000k',
		icon: AccountCircleOutlined,
		color: 'warning',
		linkTitle: 'See detail',
		linkTo: '/',
	},
]

export default dataCardEcommerces
