import { Table } from '.'
import { Box, Pagination, SortDropDown } from '../../../components'
import { cls } from '../../../utils/classname-supporter'

interface PotentialCustomerProps {
	className?: string
}

const PotentialCustomer = ({ className }: PotentialCustomerProps) => {
	return (
		<div className={cls('h-full', className)}>
			<Box
				headerTitle='Potential Customers'
				options={<SortDropDown sortSelected='Current Year' />}
			>
				<Table />
				<Pagination />
			</Box>
		</div>
	)
}

export default PotentialCustomer
