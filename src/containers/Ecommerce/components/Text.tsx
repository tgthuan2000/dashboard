import { activeCls, cls, oneOfStyle } from '../../../utils/classname-supporter'
import { colorStyles } from '../../../utils/interfaces'

interface TextProps {
	value?: string | number
	title?: string
	hiddenBorder?: boolean
	valueType?: colorStyles | 'base'
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
					oneOfStyle(
						valueType,
						['base', 'danger', 'warning', 'info', 'primary', 'success'],
						[
							'text-[#495057] dark:text-[#ced4da]',
							'text-danger',
							'text-warning',
							'text-info',
							'text-primary',
							'text-success',
						]
					)
				)}
			>
				{value}
			</p>
			<span className='text-[#878a99]'>{title}</span>
		</div>
	)
}

export default Text
