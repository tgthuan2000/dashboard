import { Breadcrumb, IBreadcrumb } from '.'
import { cls } from '../utils/classname-supporter'

interface HeaderProps {
	data: IBreadcrumb[]
	title: string
	className?: string
}

const Header = ({ title, data, className }: HeaderProps) => {
	return (
		<div className={cls('flex justify-between', className)}>
			<h4 className='font-bold text-sm uppercase text-[#495057] dark:text-[#ced4da]'>
				{title}
			</h4>
			<Breadcrumb data={data} />
		</div>
	)
}

export default Header
