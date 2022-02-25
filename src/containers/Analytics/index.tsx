import { Box, Header, IBreadcrumb } from '../../components'
import { CardList, HeatChart } from './components'

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
			<CardList className='mb-5' />
			<div className='grid grid-cols-2 gap-6 mb-5'>
				<Box>
					<div className='px-2'>
						<HeatChart />
					</div>
				</Box>
			</div>
		</div>
	)
}

export default Analytics
