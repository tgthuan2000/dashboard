import { activeCls, cls } from '../../../utils/classname-supporter'

interface TextProps {
	value?: string | number
	title?: string
	hiddenBorder?: boolean
	valueType?: 'danger' | 'warning' | 'info' | 'primary' | 'success' | 'base'
}

const Text = ({
	value = 'value',
	title = 'Title',
	hiddenBorder = false,
	valueType = 'success',
}: TextProps) => {
	return (
		<div
			className={cls(
				'flex flex-col justify-center items-center p-4 border-t border-b border-dashed border-[#e9ebec] dark:border-[#32383e] transition-colors',
				activeCls(!hiddenBorder, 'border-r')
			)}
		>
			<p
				className={cls(
					'mb-1 text-lg font-medium',
					activeCls(valueType === 'base', 'text-[#495057] dark:text-[#ced4da]'),
					activeCls(valueType === 'danger', 'text-danger'),
					activeCls(valueType === 'warning', 'text-warning'),
					activeCls(valueType === 'info', 'text-info'),
					activeCls(valueType === 'primary', 'text-primary'),
					activeCls(valueType === 'success', 'text-success')
				)}
			>
				{value}
			</p>
			<span className='text-[#878a99]'>{title}</span>
		</div>
	)
}

export default Text
