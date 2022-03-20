import { ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material'
import { ButtonPaginate } from '../../../components'
import { StatusDropdown } from '.'

const Pagination = () => {
	return (
		<div className='flex justify-between items-center p-4'>
			<div className='flex items-center gap-10'>
				<StatusDropdown />
			</div>
			<div className='flex gap-1 items-center'>
				<div className='text-[#878a99] mr-2'>
					Showing <span className='font-semibold'>5</span> of{' '}
					<span className='font-semibold'>25</span> Results
				</div>
				<ButtonPaginate icon={ArrowBackOutlined} />
				<ButtonPaginate icon={ArrowForwardOutlined} />
			</div>
		</div>
	)
}

export default Pagination
