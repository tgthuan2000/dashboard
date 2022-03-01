import { useState } from 'react'
import { Button, Chart, Text } from '.'
import { Box } from '../../../components'
import { dataRevenue } from '../../../constants'
import { cls } from '../../../utils/classname-supporter'

interface RevenueProps {
	className?: string
}

const Revenue = ({ className }: RevenueProps) => {
	return (
		<div className={cls('h-full', className)}>
			<Box headerTitle='Revenue' hiddenBorder options={<ButtonGroup />}>
				<div className='grid grid-cols-4'>
					{dataRevenue.map((props, index) => (
						<Text
							key={`${props.title}-${index}`}
							hiddenBorder={index + 1 === dataRevenue.length}
							valueType={index + 1 === dataRevenue.length ? 'success' : 'base'}
							{...props}
						/>
					))}
				</div>
				<Chart />
			</Box>
		</div>
	)
}

export default Revenue

const ButtonGroup = () => {
	const [click, setClick] = useState(0)

	return (
		<div className='flex'>
			<Button onClick={() => setClick(0)} active={click === 0}>
				ALL
			</Button>
			<Button onClick={() => setClick(1)} active={click === 1} className='ml-1'>
				1M
			</Button>
			<Button onClick={() => setClick(2)} active={click === 2} className='ml-1'>
				6M
			</Button>
			<Button
				onClick={() => setClick(3)}
				active={click === 3}
				className='ml-1'
				color='primary'
			>
				1Y
			</Button>
		</div>
	)
}
