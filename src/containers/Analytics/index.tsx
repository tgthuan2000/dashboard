import { Header, IBreadcrumb } from '../../components'
import { dataCardAnalytics } from '../../constants'
import { Card } from './components'

const breadcrumb: IBreadcrumb[] = [
	{
		title: 'Dashboards',
		to: '/',
	},
	{
		title: 'Analytics',
	},
]

const Analytics = () => {
	return (
		<div>
			<Header title='analytics' data={breadcrumb} />
			<CardList />
		</div>
	)
}

export default Analytics

const CardList = () => (
	<div className='grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6'>
		{dataCardAnalytics.map((props) => (
			<Card key={props.title} {...props} />
		))}
	</div>
)
