import { activeCls, cls } from '../utils/classname-supporter'

interface RowProps {
	active?: boolean
	children: JSX.Element | JSX.Element[]
	className?: string
}

const Row = ({ active = false, children, className }: RowProps) => {
	return (
		<tr
			className={cls(
				'border-b border-[#e9ebec] dark:border-[#32383e] transition-colors',
				activeCls(
					active,
					'bg-[#f3f6f9] dark:bg-[#31373c]',
					'hover:bg-[#f3f6f9] dark:hover:bg-[#31373c]'
				),
				className
			)}
		>
			{children}
		</tr>
	)
}

export default Row
