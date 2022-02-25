import { activeCls, cls } from '../../../utils/classname-supporter'

interface ColProps {
	title?: string
	value?: string | number
	stock?: boolean
	stockMessage?: string
	type?: 'danger' | 'warning' | 'info' | 'success' | 'primary'
}

const Col = ({
	title = 'Col title',
	value = 'Col value',
	stock = false,
	stockMessage = 'Stock',
	type = 'danger',
}: ColProps) => {
	return (
		<td className='p-3'>
			<div className='flex flex-col justify-around h-12'>
				{stock ? (
					<div
						className={cls(
							'text-center rounded text-xs font-semibold whitespace-nowrap p-1',
							activeCls(type === 'danger', 'bg-[rgba(240,101,72,.1)] text-danger'),
							activeCls(type === 'warning', 'bg-[rgba(247,184,75,.18)] text-warning'),
							activeCls(type === 'info', 'bg-[rgba(41,156,219,.18)] text-info'),
							activeCls(type === 'success', 'bg-[rgba(10,179,156,.18)] text-success'),
							activeCls(type === 'primary', 'bg-[rgba(64,81,137,.18)] text-primary')
						)}
					>
						{stockMessage}
					</div>
				) : (
					<p className='text-[#495057] dark:text-[#ced4da]'>{value}</p>
				)}
				<span className='text-gray'>{title}</span>
			</div>
		</td>
	)
}

export default Col
