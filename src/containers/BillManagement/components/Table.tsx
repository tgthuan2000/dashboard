import moment from 'moment'
import { Link } from 'react-router-dom'
import { Col } from '.'
import { Bill } from '../../../@types'
import { Avatar, Badge, Checkbox, ColHeader, Loading } from '../../../components'
import NumberFormat from 'react-number-format'
import { useEffect, useRef, useState } from 'react'
import { urlFor } from '../../../client/sanity'

const tableHeaders = ['Date', 'Customer Name', 'Amount', 'Total Prices', 'Bill Status', '']

interface TableProps {
    onRowChecked: (data: Bill[]) => void
    data: Bill[]
    loading?: boolean
    end?: boolean
    page?: number
    totalPage?: number
    checkList: Bill[]
}

const Table = ({ data, onRowChecked, loading, end, page, totalPage, checkList }: TableProps) => {
    const [checkAll, setCheckAll] = useState(false)
    const checkbox = useRef<HTMLInputElement>(null)
    const [indeterminate, setIndeterminate] = useState(false)

    useEffect(() => {
        const isIndeterminate = checkList.length > 0 && checkList.length < data.length
        setCheckAll(data.length > 0 && checkList.length === data.length)
        setIndeterminate(isIndeterminate)
        if (checkbox.current) checkbox.current.indeterminate = isIndeterminate
    }, [checkList])

    useEffect(() => {
        setCheckAll(false)
    }, [data])

    const toggleAll = () => {
        onRowChecked(checkAll || indeterminate ? [] : data)
        setCheckAll(!checkAll && !indeterminate)
        setIndeterminate(false)
    }

    return (
        <div className='flex-1 w-full'>
            <table className='w-full'>
                <thead className='bg-gray-light dark:bg-[#2a2f34] border-b border-[#e9ebec] dark:border-[#32383e] text-gray transition-colors'>
                    <tr>
                        <ColHeader isCenter>
                            <Checkbox cbRef={checkbox} checked={checkAll} onChange={toggleAll} />
                        </ColHeader>
                        {tableHeaders.map((value, index) => (
                            <ColHeader key={`${value}-${index}`} isCenter>
                                {value}
                            </ColHeader>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!loading ? (
                        <>
                            {data?.map((d, i) => (
                                <tr
                                    className='odd:bg-white even:bg-gray-light dark:odd:bg-dark dark:even:bg-[#2a2f34] dark:text-gray-light border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
                                    key={d._id}
                                >
                                    <td className='text-center'>
                                        <label className='block h-full py-3'>
                                            <Checkbox
                                                checked={checkList?.includes(d)}
                                                onChange={({ target: { checked } }) =>
                                                    onRowChecked(
                                                        checked ? [...checkList, d] : checkList.filter((i) => i !== d)
                                                    )
                                                }
                                            />
                                        </label>
                                    </td>
                                    <Col>{moment(d._createdAt).format('HH:mm - DD/MM/YYYY')}</Col>
                                    <Col>
                                        <div className='flex items-center'>
                                            <Avatar
                                                src={d.user.image && urlFor(d.user.image)}
                                                alt={d.user?.fullName[0]}
                                            />
                                            <div className='flex-1 overflow-hidden max-w-[200px] ml-3'>
                                                <h3 className='leading-normal text-sm text-[#495057] dark:text-[#cde4ca] font-medium overflow-hidden text-ellipsis whitespace-nowrap'>
                                                    {d.user?.fullName}
                                                </h3>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='text-right'>
                                        <NumberFormat value={d.amount} displayType='text' thousandSeparator />
                                    </Col>
                                    <Col className='text-right'>
                                        <NumberFormat
                                            value={d.prices.reduce((total, price) => total + price, 0)}
                                            displayType='text'
                                            thousandSeparator
                                            defaultValue={'-'}
                                        />
                                    </Col>
                                    <Col className='text-center'>
                                        <Badge style={d.billStatus?.style}>{d.billStatus?.name}</Badge>
                                    </Col>
                                    <Col>
                                        <Link
                                            to={`detail/${d._id}`}
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
