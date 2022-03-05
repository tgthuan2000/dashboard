import { motion } from 'framer-motion'
import { activeCls, cls } from '../utils/classname-supporter'

interface BoxProps {
	className?: string
	children?: JSX.Element | JSX.Element[]
	headerTitle?: string
	options?: JSX.Element
	hiddenBorder?: boolean
}

const Box = ({
	className,
	children,
	headerTitle = 'Audiences Sessions by Country',
	options,
	hiddenBorder = false,
}: BoxProps) => {
	return (
		<motion.div
			viewport={{ once: true }}
			whileInView={{ opacity: [0, 1] }}
			className={cls(
				'bg-white dark:bg-dark transition-colors shadow-md rounded flex flex-col h-full',
				className
			)}
		>
			<div
				className={cls(
					'flex justify-between items-center p-4',
					activeCls(
						!hiddenBorder,
						'border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
					)
				)}
			>
				<h4 className='flex-1 text-base text-[#495057] dark:text-[#ced4da] font-medium whitespace-nowrap overflow-hidden text-ellipsis'>
					{headerTitle}
				</h4>
				{options}
			</div>
			{children}
		</motion.div>
	)
}

export default Box
