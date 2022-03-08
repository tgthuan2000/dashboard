import { Box, Pagination, SortDropDown } from '../../components'
import { headerHOC } from '../../hoc'
import { SearchForm, Calendar } from './components'

const BillManagement = () => {
	return (
		<div className=''>
			<div className='flex gap-5'>
				<SearchForm className='flex-1' />
				<Calendar />
			</div>
			<Box
				headerTitle='Bills'
				className='mt-5'
				options={
					<SortDropDown
						sortTtile='Order status:'
						sortSelected='Tất cả'
						sortData={[
							'Chờ xác nhận',
							'Đang giao hàng',
							'Đã giao hàng',
							'Hủy hàng',
							'Hoàn tiền',
						]}
					/>
				}
			>
				<Pagination />
			</Box>
		</div>
	)
}

export default headerHOC(BillManagement, 'Bill Management', [{ title: 'Dashboards', to: '/' }])
