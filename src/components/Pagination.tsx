import { ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material'
import { ButtonPaginate } from '.'

const Pagination = () => {
	return (
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
	)
}

export default Pagination
