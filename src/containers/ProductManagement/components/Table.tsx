import moment from 'moment'
import NumberFormat from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../../@types'
import { urlFor } from '../../../client/sanity'
import { Badge, ColHeader, Loading } from '../../../components'

const tableHeaders = ['Image', 'Product', 'Amount', 'Forecast', 'Price', 'Status', 'Created At', 'Updated At']

interface TableProps {
    loading: boolean
    data: Product[]
    end: boolean
    page: number
    totalPage: number
}
const Table = ({ loading, data, end, page, totalPage }: TableProps) => {
    const navigate = useNavigate()

    return (
        <div className='flex-1 w-ful'>
            <table className='w-full'>
                <thead className='bg-gray-light dark:bg-[#2a2f34] border-b border-[#e9ebec] dark:border-[#32383e] text-gray transition-colors'>
                    <tr>
                        {tableHeaders.map((value, index) => (
                            <ColHeader isCenter key={`${value}-${index}`}>
                                {value}
                            </ColHeader>
                        ))}
                    </tr>
                </thead>
                <tbody className='max-h-[100px] overflow-auto'>
                    {!loading ? (
                        <>
                            {data.map(
                                ({
                                    _id,
                                    _createdAt,
                                    _updatedAt,
                                    name,
                                    image,
                                    quantity,
                                    forecast,
                                    price,
                                    status,
                                    categoryProduct,
                                }) => (
                                    <tr
                                        className='hover:bg-gray-light dark:hover:bg-gray-dark cursor-pointer dark:text-gray-light border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
                                        key={_id}
                                        onClick={() => navigate(`edit/${_id}`)}
                                    >
                                        <td className='py-3 px-4 flex items-center justify-center'>
                                            <img
                                                src={urlFor(image)}
                                                alt={`img-${_id}`}
                                                className='w-12 h-12 object-cover bg-gray-light rounded'
                                            />
                                        </td>
                                        <td className='pl-4'>
                                            <span className='flex flex-col items-start justify-between'>
                                                <p className='truncate max-w-2xl'>{name}</p>
                                                <span className='text-xs text-gray-dark dark:text-gray-light transition-colors'>
                                                    Loại: <span className='text-gray'>{categoryProduct?.name}</span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className='text-right px-4'>
                                            <NumberFormat value={quantity} thousandSeparator displayType='text' />
                                        </td>
                                        <td className='text-right px-4'>
                                            <NumberFormat
                                                value={forecast}
                                                thousandSeparator
                                                displayType='text'
                                                defaultValue={'-'}
                                            />
                                        </td>
                                        <td className='text-right px-4'>
                                            <NumberFormat value={price} thousandSeparator displayType='text' />
                                        </td>
                                        <td className='text-center px-4'>
                                            <Badge style={status?.style}>{status?.name}</Badge>
                                        </td>
                                        <td className='text-center px-4'>
                                            {moment(_updatedAt).format('HH:mm - DD/MM/YYYY')}
                                        </td>
                                        <td className='text-center pl-4 pr-3'>
                                            {moment(_createdAt).format('HH:mm - DD/MM/YYYY')}
                                        </td>
                                    </tr>
                                )
                            )}
                            {end && page === totalPage && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className='text-center py-3 text-gray select-none border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
                                    >
                                        No infomation result
                                    </td>
                                </tr>
                            )}
                        </>
                    ) : (
                        <tr>
                            <td
                                colSpan={7}
                                className='text-center py-36 text-gray select-none border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
                            >
                                <Loading size='small' />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table
