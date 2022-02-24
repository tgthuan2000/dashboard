import { Header, IBreadcrumb } from '../../components'
import { dataCardEcommerces } from '../../constants'
import { Card } from './components'

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
			<Header title='ecommerce' data={breadcrumb} />
			<CardList />
		</div>
	)
}

export default Ecommerce

const CardList = () => (
	<div className='grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6'>
		{dataCardEcommerces.map((props) => (
			<Card key={props.title} {...props} />
		))}
	</div>
)
