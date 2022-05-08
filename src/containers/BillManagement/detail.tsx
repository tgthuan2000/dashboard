import { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Bill, BillDetail, BillStatus } from '../../@types'
import { client, urlFor } from '../../client/sanity'
import { Box, ColHeader, Loading, SortDropDown } from '../../components'
import { headerHOC } from '../../hoc'
import { useQuery } from '../../hooks'
import { BILLSTATUS_QUERY, GET_BILL_BY_ID } from '../../schema'
import { slug } from '../../utils/slug'
import { toastConfig } from '../../utils/toastConfig'
import { UserCard } from './components'

const DetailBill = () => {
    const params = useParams()
    const {
        data: [billData],
        loading: billLoading,
    } = useQuery<Bill>(GET_BILL_BY_ID, [], { _id: params.id })
    const { data: statusData, loading: statusLoading } = useQuery<BillStatus>(BILLSTATUS_QUERY)
    const [sortSelected, setSortSelected] = useState<BillStatus>()

    useEffect(() => {
        billData?.billStatus && setSortSelected(billData.billStatus)
    }, [billData])

    const handleSortChange = (_id: string) => {
        if (sortSelected?._id === _id) return
        const item = statusData.find((sort) => sort._id === _id)
        if (item) {
            params.id &&
                client
                    .patch(params.id)
                    .set({
                        billStatus: {
                            _ref: _id,
                        },
                    })
                    .commit()
                    .then(() => {
                        setSortSelected(item)
                    })
                    .then(() => {
                        toast('Lưu trạng thái thành công!', toastConfig)
                    })
        }
    }
    if (billLoading)
        return (
            <div className='w-full text-center pt-10'>
                <Loading />
            </div>
        )

    if (!billData) return <div>Error</div>

    return (
        <div className='grid grid-cols-3 gap-6 my-5'>
            <div className='col-span-2'>
                <div>
                    <Box
                        headerTitle='Bill Detail'
                        option={
                            <SortDropDown
                                loading={statusLoading}
                                sortTitle='Bill status:'
                                sortSelected={sortSelected}
                                sortData={statusData}
                                onSortChange={handleSortChange}
                            />
                        }
                        pagination={
                            <div className='p-4 flex justify-end items-center space-x-2'>
                                <span className='text-gray-dark dark:text-gray'>Total:</span>
                                <h4 className='font-semibold text-base text-primary dark:text-gray-light'>
                                    <NumberFormat
                                        value={billData.detail?.reduce((total: number, item) => total + item.price, 0)}
                                        thousandSeparator
                                        displayType='text'
                                    />
                                </h4>
                            </div>
                        }
                    >
                        <Table data={billData.detail} loading={billLoading} />
                    </Box>
                </div>
            </div>
            <div>
                <UserCard data={billData.user} />
            </div>
        </div>
    )
}

export default headerHOC(DetailBill, 'Detail Bill', [
    { title: 'Payments', to: slug.payments },
    { title: 'Bill Management', to: slug.billManagement },
])

const tableHeaders = ['Image', 'Product', 'Unit Price', 'Amount', 'Total Price']

interface TableProps {
    loading: boolean
    data?: BillDetail[]
}
const Table = ({ loading, data }: TableProps) => {
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
                        data && data.length > 0 ? (
                            data.map((d, i) => (
                                <tr
                                    key={i}
                                    className='dark:hover:bg-gray-dark dark:text-gray-light border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
                                >
                                    <td className='py-3 px-4 flex items-center justify-center'>
                                        <img
                                            src={urlFor(d.product.image)}
                                            alt={`img-${d._id}`}
                                            className='w-12 h-12 object-cover bg-gray-light rounded'
                                        />
                                    </td>
                                    <td className='pl-4'>
                                        <span className='flex flex-col items-start justify-between'>
                                            <p className='truncate max-w-2xl'>{d.product.name}</p>
                                            <span className='text-xs text-gray-dark dark:text-gray-light transition-colors'>
                                                Loại:{' '}
                                                <span className='text-gray'>{d.product.categoryProduct?.name}</span>
                                            </span>
                                        </span>
                                    </td>
                                    <td className='text-right px-4'>
                                        <NumberFormat value={d.product?.price} thousandSeparator displayType='text' />
                                    </td>
                                    <td className='text-right px-4'>
                                        <NumberFormat value={d.quantity} thousandSeparator displayType='text' />
                                    </td>
                                    <td className='text-right px-4'>
                                        <NumberFormat value={d.price} thousandSeparator displayType='text' />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <>
                                <tr>
                                    <td
                                        colSpan={tableHeaders.length}
                                        className='text-center py-36 text-gray select-none border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
                                    >
                                        Empty Data
                                    </td>
                                </tr>
                            </>
                        )
                    ) : (
                        <tr>
                            <td
                                colSpan={tableHeaders.length}
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
