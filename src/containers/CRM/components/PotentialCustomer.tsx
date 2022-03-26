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
                option={<SortDropDown sortSelected='Current Year' />}
                pagination={<Pagination />}
            >
                <Table />
            </Box>
        </div>
    )
}

export default PotentialCustomer
