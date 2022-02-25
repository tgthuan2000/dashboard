import {
	AbcOutlined,
	ArrowDownwardOutlined,
	ArrowUpwardOutlined,
	RemoveOutlined,
} from '@mui/icons-material'
import { Icon } from '@mui/material'
import { activeCls, cls } from '../../../utils/classname-supporter'

interface CardProps {
	title?: string
	icon?: React.ElementType
	value?: string | number
	rate?: string | number
}

const Card = ({
	title = 'Card title',
	icon = AbcOutlined,
	value = '10m 30sec',
	rate = '0.00',
}: CardProps) => {
	return (
		<div className='shadow-md rounded bg-white dark:bg-dark transition-colors p-4'>
			<div className='flex justify-between'>
				<div className='flex-1'>
					<p className='font-medium text-gray overflow-hidden text-ellipsis whitespace-nowrap'>
						{title}
					</p>
					<p className='font-medium mt-6 text-[#495057] dark:text-[#ced4da] text-2xl mb-2'>
						{value}
					</p>
					<span className='text-gray'>
						<span
							className={cls(
								'bg-[rgba(0,0,0,.05)] dark:bg-[#eff2f7] rounded-md px-1',
								activeCls(rate > 0, 'text-success'),
								activeCls(rate == 0, 'text-gray '),
								activeCls(rate < 0, 'text-danger ')
							)}
						>
							<Icon
								component={
									rate > 0
										? ArrowUpwardOutlined
										: rate < 0
										? ArrowDownwardOutlined
										: RemoveOutlined
								}
								style={{ fontSize: 12 }}
								className='mr-1'
							/>
							{rate}%
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
