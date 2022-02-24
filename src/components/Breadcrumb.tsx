import { Link } from 'react-router-dom'
import { activeCls, cls } from '../utils/classname-supporter'

export interface IBreadcrumb {
	title: string
	to?: string
}

interface BreadcrumbProps {
	data: IBreadcrumb[]
}

const Breadcrumb = ({ data }: BreadcrumbProps) => {
	return (
		<div className='flex text-sm'>
			{data.map(({ title, to }, index) =>
				to ? (
					<Link
						className={cls(
							'text-[#495057] dark:text-[#ced4da] cursor-pointer',
							activeCls(
								index !== 0,
								'ml-8 relative before:content-[">"] before:absolute before:-left-5 before:text-gray'
							)
						)}
						to={to}
						key={`${title}-${index}`}
					>
						{title}
					</Link>
				) : (
					<span
						key={`${title}-${index}`}
						className='ml-8 cursor-default relative before:content-[">"] before:absolute before:-left-5 before:text-gray text-gray'
					>
						{title}
					</span>
				)
			)}
		</div>
	)
}

export default Breadcrumb
