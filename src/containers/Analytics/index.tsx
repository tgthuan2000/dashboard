import { Header, IBreadcrumb } from '../../components'
import { dataCardAnalytics } from '../../constants'
import { Card, HeatChart } from './components'

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
			<Header className='mb-5' title='analytics' data={breadcrumb} />
			<div className={'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 mb-6'}>
				<CardList />
			</div>
			<div className='grid grid-cols-2 gap-6 mb-5'>
				<HeatChart />
			</div>
		</div>
	)
}

export default Analytics

const CardList = () => {
	return (
		<>
			{dataCardAnalytics.map((props) => (
				<Card key={props.title} {...props} />
			))}
		</>
	)
}
