import { ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material'
import { ButtonPaginate, Table } from '.'
import { Box, SortDropDown } from '../../../components'
import { cls } from '../../../utils/classname-supporter'

interface BestSellingProductProps {
	className?: string
}

const BestSellingProduct = ({ className }: BestSellingProductProps) => {
	return (
		<div className={cls(className)}>
			<Box
				headerTitle='Best Selling Products'
				className='mb-5'
				options={
					<SortDropDown
						sortSelected='Today'
						sortData={[
							'Today',
							'Yesterday',
							'Last 7 days',
							'Last 30 days',
							'This Month',
							'Last Month',
						]}
					/>
				}
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
	)
}

export default BestSellingProduct
