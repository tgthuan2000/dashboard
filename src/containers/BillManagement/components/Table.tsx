import moment from 'moment'
import { Link } from 'react-router-dom'
import { Col, Button } from '.'
import { Bill } from '../../../@types'
import { Avatar, ColHeader, Loading } from '../../../components'
import NumberFormat from 'react-number-format'

const tableHeaders = ['Date', 'Customer Name', 'Amount', 'Total Prices', 'Bill Status', '']

interface TableProps {
    onRowChecked?: (value: any, index: number) => void
    data?: Bill[]
    loading?: boolean
    end?: boolean
    page?: number
    totalPage?: number
}

const Table = ({ data, onRowChecked, loading, end, page, totalPage }: TableProps) => {
    const handleClickItem = (_id: string, index: number) => {
        onRowChecked?.(_id, index)
    }

    return (
        <div className='flex-1 w-ful'>
            <table className='w-full'>
                <thead className='bg-gray-light dark:bg-[#2a2f34] border-b border-[#e9ebec] dark:border-[#32383e] text-gray transition-colors'>
                    <tr>
                        <ColHeader isCenter>
                            <input type='checkbox' className='disabled:cursor-not-allowed cursor-pointer' disabled />
                        </ColHeader>
                        {tableHeaders.map((value, index) => (
                            <ColHeader key={`${value}-${index}`}>{value}</ColHeader>
                        ))}
                    </tr>
                </thead>
                <tbody className='max-h-[100px] overflow-auto'>
                    {!loading ? (
                        <>
                            {data?.map(({ _id, _createdAt, user, billStatus, amount }, i) => (
                                <tr
                                    className='odd:bg-white even:bg-gray-light dark:odd:bg-dark dark:even:bg-[#2a2f34] dark:text-gray-light border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
                                    key={_id}
                                >
                                    <td className='text-center'>
                                        <label className='block h-full py-3'>
                                            <input
                                                type='checkbox'
                                                className='cursor-pointer disabled:cursor-not-allowed'
                                                onClick={() => handleClickItem(_id, i)}
                                            />
                                        </label>
                                    </td>
                                    <Col>{moment.utc(_createdAt).local().format('HH:mm - DD/MM/YYYY')}</Col>
                                    <Col>
                                        <div className='flex items-center'>
                                            <Avatar alt={user.fullName[0]} />
                                            <div className='flex-1 overflow-hidden max-w-[200px] ml-3'>
                                                <h3 className='leading-normal text-sm text-[#495057] dark:text-[#cde4ca] font-medium overflow-hidden text-ellipsis whitespace-nowrap'>
                                                    {user.fullName}
                                                </h3>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <NumberFormat value={amount} displayType='text' thousandSeparator />
                                    </Col>
                                    <Col>0</Col>
                                    <Col>
                                        <Button style={billStatus.style}>{billStatus.name}</Button>
                                    </Col>
                                    <Col>
                                        <Link
                                            to={`detail/${_id}`}
                                            className='underline text-primary cursor-pointer hover:opacity-60'
                                        >
                                            Detail
                                        </Link>
                                    </Col>
                                </tr>
                            ))}
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
                                className='text-center py-28 text-gray select-none border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
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
