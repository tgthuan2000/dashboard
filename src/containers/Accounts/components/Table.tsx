import { useNavigate } from 'react-router-dom'
import { User } from '../../../@types'
import { Badge, ColHeader, Loading } from '../../../components'
import moment from 'moment'
import { urlFor } from '../../../client/sanity'

const tableHeaders = ['Username / Full name', 'Email / Phone', 'Role', 'Updated At', 'Created At']

interface TableProps {
    loading: boolean
    data: User[]
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
                                (
                                    {
                                        _id,
                                        _createdAt,
                                        _updatedAt,
                                        image,
                                        address,
                                        email,
                                        fullName,
                                        phone,
                                        role,
                                        username,
                                    },
                                    i
                                ) => (
                                    <tr
                                        className='hover:bg-gray-light dark:hover:bg-gray-dark cursor-pointer dark:text-gray-light border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
                                        key={_id}
                                        onClick={() => navigate(`edit/${_id}`)}
                                    >
                                        <td className='text-left py-5 pl-4'>
                                            <div className='flex space-x-2 items-end'>
                                                <img
                                                    src={urlFor(image)}
                                                    alt={username[0].toUpperCase()}
                                                    className='w-12 h-12 object-cover bg-gray-light rounded flex items-center justify-center text-xl font-medium text-gray'
                                                />
                                                <span className='flex flex-col items-start'>
                                                    <p className='truncate'>{username || '-'}</p>
                                                    <span className='mt-1 text-xs text-gray-dark dark:text-gray-light transition-colors'>
                                                        <span className='text-gray'>{fullName || '-'}</span>
                                                    </span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className='text-left px-4 py-5'>
                                            <span className='flex flex-col items-start justify-between'>
                                                <p className='truncate'>{email || '-'}</p>
                                                <span className='mt-1 text-xs text-gray-dark dark:text-gray-light transition-colors'>
                                                    <span className='text-gray'>{phone || '-'}</span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className='text-center px-4 py-5'>
                                            {role ? <Badge style={role?.style}>{role?.name}</Badge> : '-'}
                                        </td>
                                        <td className='text-center px-4 py-5'>
                                            {moment(_updatedAt).format('HH:mm - DD/MM/YYYY')}
                                        </td>
                                        <td className='text-center pl-4 pr-3 py-5'>
                                            {moment(_createdAt).format('HH:mm - DD/MM/YYYY')}
                                        </td>
                                    </tr>
                                )
                            )}
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
                                className='text-center py-40 text-gray select-none border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
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
