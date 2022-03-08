import { Close, Search } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { FormEvent, useState } from 'react'
import { cls } from '../../../utils/classname-supporter'
import { motion } from 'framer-motion'

interface SearchFormProps {
	className?: string
}

const SearchForm = ({ className }: SearchFormProps) => {
	const [input, setInput] = useState('')
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(input)
	}
	return (
		<motion.div
			viewport={{ once: true }}
			whileInView={{ opacity: [0, 1] }}
			className={cls(
				'relative bg-white shadow-md dark:bg-[#202328] flex items-center border-0 rounded transition-colors',
				className
			)}
		>
			<Icon
				className='ml-3 mr-2 text-gray dark:text-dark-white'
				style={{ fontSize: 18 }}
				component={Search}
			/>
			<form onSubmit={handleSubmit} className='flex-1'>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type='text'
					placeholder='Search...'
					className='bg-transparent dark:text-dark-white h-[38px] min-w-[282px] w-full pr-8 text-sm outline-none'
				/>
			</form>
			{input.length > 0 && (
				<span
					className='w-4 h-4 rounded-full bg-gray absolute right-2 text-white dark:text-dark flex items-center justify-center'
					onClick={() => setInput('')}
				>
					<Icon style={{ fontSize: 14 }} component={Close} />
				</span>
			)}
		</motion.div>
	)
}

export default SearchForm
