import { Box, Header, IBreadcrumb } from '../../components'
import { ZoomableChart, ZoomableHeader } from './components'

const breadcrumb: IBreadcrumb[] = [
	{
		title: 'Dashboards',
		to: '/',
	},
	{
		title: 'CRM',
	},
]

const CRM = () => {
	return (
		<div className=''>
			<Header className='mb-5' title='CRM' data={breadcrumb} />
			<div className='grid grid-cols-2'>
				<Box headerTitle='Balance Overview' sortSelected='Current Year'>
					<div className='px-2'>
						<ZoomableHeader />
						<ZoomableChart />
					</div>
				</Box>
			</div>
		</div>
	)
}

export default CRM
