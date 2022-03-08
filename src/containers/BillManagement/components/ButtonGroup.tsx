const ButtonGroup = () => {
	return (
		<div className='h-[38px] shadow-lg rounded flex-nowrap flex overflow-hidden border border-primary'>
			<Button>Tất cả</Button>
			<Button>Chờ giao hàng</Button>
			<Button>Đang giao hàng</Button>
			<Button>Hủy hàng</Button>
		</div>
	)
}

export default ButtonGroup

interface ButtonProps {
	children: string
}

const Button = ({ children }: ButtonProps) => {
	return (
		<button className='font-medium border-r first:bg-primary first:text-white last:border-r-0 border-primary px-2 hover:bg-[#405189] hover:text-white bg-[rgba(64,81,137,.1)] text-primary whitespace-nowrap'>
			{children}
		</button>
	)
}
