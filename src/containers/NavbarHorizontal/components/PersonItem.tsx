import { Icon } from '@mui/material'

interface PersonItemProps {
	text: string
	icon: React.ElementType
	onClick?: React.MouseEventHandler<HTMLDivElement>
}

const PersonItem = ({ text, icon, onClick }: PersonItemProps) => {
	return (
		<div
			onClick={onClick}
			className='w-full px-5 py-2 text-dark dark:text-[#b9bfc4] hover:text-[#1e2125] dark:hover:bg-[#2f343a] hover:bg-[#f3f6f9] bg-transparent flex items-center'
		>
			<Icon className='text-[#878a99]' component={icon} style={{ fontSize: 16 }} />
			<p className='font-normal text-sm whitespace-nowrap ml-2'>{text}</p>
		</div>
	)
}

export default PersonItem
