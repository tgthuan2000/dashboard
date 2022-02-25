import { ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material'
import { Box, Header, IBreadcrumb } from '../../components'
import { ButtonPaginate, CardList, Table } from './components'

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
			<CardList className='mb-5' />

			<div className='grid grid-cols-2 gap-6'>
				<Box
					headerTitle='Best Selling Products'
					className='mb-5'
					sortSelected='Today'
					sortData={[
						'Today',
						'Yesterday',
						'Last 7 days',
						'Last 30 days',
						'This Month',
						'Last Month',
					]}
				>
					<Table />
					<div className='flex justify-between items-center p-4'>
						<div className='text-[#878a99]'>
							Showing <span className='font-semibold'>5</span> of{' '}
							<span className='font-semibold'>25</span> Results
						</div>
						<div className=''>
							<ButtonPaginate icon={ArrowBackOutlined} />
							<ButtonPaginate className='ml-1' value={1} />
							<ButtonPaginate className='ml-1' value={2} active />
							<ButtonPaginate className='ml-1' value={3} />
							<ButtonPaginate className='ml-1' icon={ArrowForwardOutlined} />
						</div>
					</div>
				</Box>
			</div>
		</div>
	)
}

export default Ecommerce
