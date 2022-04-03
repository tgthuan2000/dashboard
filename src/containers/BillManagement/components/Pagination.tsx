import { ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material'
import { ButtonPaginate, SortType } from '../../../components'
import { StatusBill } from '.'
import { MouseEventHandler } from 'react'
import { BillStatus } from '../../../@types'

interface PaginationProps {
    isOpen?: boolean
    sortSelected?: SortType
    onPrevPage?: MouseEventHandler<HTMLButtonElement>
    onNextPage?: MouseEventHandler<HTMLButtonElement>
    length?: number
    page?: number
    totalPage?: number
    end?: boolean
    statusData?: BillStatus[]
}
const Pagination = ({
    isOpen,
    sortSelected,
    onPrevPage,
    onNextPage,
    length,
    page,
    totalPage,
    end,
    statusData,
}: PaginationProps) => {
    return (
        <div className='flex justify-between items-center p-4'>
            <div className='flex items-center gap-4'>
                <StatusBill isOpen={isOpen} sortSelected={sortSelected} sortData={statusData} />
            </div>
            <div className='flex gap-1 items-center'>
                <div className='text-[#878a99] mr-2'>
                    Showing <span className='font-semibold'>{length}</span> Results
                </div>
                <ButtonPaginate icon={ArrowBackOutlined} onClick={onPrevPage} disabled={(page as number) <= 1} />
                <ButtonPaginate icon={ArrowForwardOutlined} onClick={onNextPage} disabled={end && page === totalPage} />
            </div>
        </div>
    )
}

export default Pagination
