import { Breadcrumb, IBreadcrumb } from '.'

interface HeaderProps {
	data: IBreadcrumb[]
	title: string
}

const Header = ({ title, data }: HeaderProps) => {
	return (
		<div className='flex justify-between mb-5'>
			<h4 className='font-bold text-sm uppercase text-[#495057] dark:text-[#ced4da]'>
				{title}
			</h4>
			<Breadcrumb data={data} />
		</div>
	)
}

export default Header
