interface BoxChildProps {
	children?: string
}
const BoxChild = ({ children = 'Option' }: BoxChildProps) => {
	return (
		<li className='w-full'>
			<button className='inline-block text-left w-full px-5 py-2 text-dark dark:text-[#b9bfc4] hover:text-[#1e2125] dark:hover:bg-[#2f343a] hover:bg-[#f3f6f9] bg-transparent'>
				{children}
			</button>
		</li>
	)
}
export default BoxChild
