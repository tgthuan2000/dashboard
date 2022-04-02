import { Table } from '.'
import { Box, Pagination, SortDropDown } from '../../../components'
import { cls } from '../../../utils/classname-supporter'

interface BestSellingProductProps {
    className?: string
}

const BestSellingProduct = ({ className }: BestSellingProductProps) => {
    return (
        <div className={cls('h-full', className)}>
            <Box
                headerTitle='Best Selling Products'
                className='mb-5'
                option={<SortDropDown sortSelected={{ _id: '0', name: 'Today' }} />}
                pagination={<Pagination />}
            >
                <Table />
            </Box>
        </div>
    )
}

export default BestSellingProduct
