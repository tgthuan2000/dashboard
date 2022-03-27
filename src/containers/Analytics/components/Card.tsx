import { AbcOutlined, ArrowDownwardOutlined, ArrowUpwardOutlined, RemoveOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { activeStyleByZero, cls } from '../../../utils/classname-supporter'
import CountUp from 'react-countup'

interface CardProps {
    title?: string
    icon?: React.ElementType
    value?: string | number
    rate?: string | number
}

const Card = ({ title = 'Card title', icon = AbcOutlined, value = '10m 30sec', rate = '0.00' }: CardProps) => {
    return (
        <div className='shadow-md rounded bg-white dark:bg-dark transition-all p-4 hover:shadow-lg hover:-translate-y-1'>
            <div className='flex justify-between'>
                <div className='flex-1'>
                    <p className='font-medium text-gray overflow-hidden text-ellipsis whitespace-nowrap'>{title}</p>
                    <p className='font-medium mt-6 text-[#495057] dark:text-[#ced4da] text-2xl mb-2'>{value}</p>
                    <span className='text-gray'>
                        <span
                            className={cls(
                                'bg-[rgba(0,0,0,.05)] dark:bg-[#eff2f7] rounded-md px-1',
                                activeStyleByZero(rate, 'text-gray', 'text-danger', 'text-success')
                            )}
                        >
                            <Icon
                                component={
                                    rate > 0 ? ArrowUpwardOutlined : rate < 0 ? ArrowDownwardOutlined : RemoveOutlined
                                }
                                style={{ fontSize: 12 }}
                                className='mr-1'
                            />
                            <CountUp end={Number(rate)} />%
                        </span>{' '}
                        vs. previous month
                    </span>
                </div>
                <div className='flex-shrink-0'>
                    <span className='w-12 h-12 rounded-full flex justify-center items-center bg-[rgba(41,156,219,.18)]'>
                        <Icon component={icon} className='text-info' />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card
