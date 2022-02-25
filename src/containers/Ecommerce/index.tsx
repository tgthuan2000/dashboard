import { Box, Header, IBreadcrumb } from '../../components'
import { dataCardEcommerces } from '../../constants'
import { BestSellingProducts, Card, Revenue } from './components'

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
			<div className='grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 mb-5'>
				<CardList />
			</div>
			<div className='grid grid-cols-[70%,30%] gap-6 mb-5'>
				<Revenue />
			</div>
			<div className='grid grid-cols-2 gap-6'>
				<BestSellingProducts />
			</div>
		</div>
	)
}

export default Ecommerce

const CardList = () => {
	return (
		<>
			{dataCardEcommerces.map((props) => (
				<Card key={props.title} {...props} />
			))}
		</>
	)
}
