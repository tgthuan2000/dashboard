import { useNavigate } from 'react-router-dom'
import { urlFor } from '../../../client/sanity'
import { ColHeader, Loading } from '../../../components'
import { ProductData } from '../../../features'

const tableHeaders = ['Image', 'Product Name', 'Amount', 'Price', 'Status']

interface TableProps {
    loading: boolean
    data: ProductData[]
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
                            {data.map(({ _id, name, image, quantity, price }) => (
                                <tr
                                    className='hover:bg-gray-light dark:hover:bg-gray-dark cursor-pointer dark:text-gray-light border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
                                    key={_id}
                                    onClick={() => navigate(`edit/${_id}`)}
                                >
                                    <td className='py-3 flex items-center justify-center'>
                                        <img
                                            src={urlFor(image)}
                                            alt={`img-${_id}`}
                                            className='w-12 h-12 object-cover bg-gray-light rounded'
                                        />
                                    </td>
                                    <td className='py-5'>{name}</td>
                                    <td className='text-center py-5'>{quantity}</td>
                                    <td className='text-center py-5'>{price}</td>
                                    <td className='text-center py-5'></td>
                                </tr>
                            ))}
                            {end && page === totalPage && (
                                <tr>
                                    <td
                                        colSpan={5}
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
                                colSpan={5}
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
