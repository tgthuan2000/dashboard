import { ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material'
import { MouseEventHandler } from 'react'
import { ButtonPaginate } from '.'

interface PaginationProps {
    length?: number
    onNext?: MouseEventHandler<HTMLButtonElement>
    onPrev?: MouseEventHandler<HTMLButtonElement>
    page?: number
    totalPage?: number
    end?: boolean
}
const Pagination = ({ length, onNext, onPrev, page, totalPage, end }: PaginationProps) => {
    return (
        <div className='flex justify-between items-center p-4'>
            <div className='text-[#878a99]'>
                Showing <span className='font-semibold'>{length}</span> Results
            </div>
            <div className='gap-1 flex'>
                <ButtonPaginate icon={ArrowBackOutlined} onClick={onPrev} disabled={(page as number) <= 1} />
                <ButtonPaginate icon={ArrowForwardOutlined} onClick={onNext} disabled={end && page === totalPage} />
            </div>
        </div>
    )
}

export default Pagination
