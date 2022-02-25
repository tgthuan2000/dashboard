import { Header, IBreadcrumb } from '../../components'
import { CardList } from './components'

const breadcrumb: IBreadcrumb[] = [
	{
		title: 'Dashboards',
		to: '/',
	},
	{
		title: 'Ecommerce',
	},
]

const Ecommerce = () => {
	return (
		<div>
			<Header className='mb-5' title='ecommerce' data={breadcrumb} />
			<CardList />
		</div>
	)
}

export default Ecommerce
