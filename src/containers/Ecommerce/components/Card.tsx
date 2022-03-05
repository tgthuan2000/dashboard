import { AbcOutlined, AddOutlined, NorthEastOutlined, SouthEastOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { CardLogo, CardLogoColor } from '.'
import { activeCls, cls } from '../../../utils/classname-supporter'

interface CardProps {
	title?: string
	rate?: number | string
	value?: string | number
	icon?: React.ElementType
	color?: CardLogoColor
	linkTitle?: string
	linkTo?: string
}

const Card = ({
	title = 'Title Card',
	rate = '0.00',
	value = '100.00',
	icon = AbcOutlined,
	color = 'primary',
	linkTitle = 'Link card',
	linkTo = '/',
}: CardProps) => {
	return (
		<motion.div
			viewport={{ once: true }}
			whileInView={{ opacity: [0, 1] }}
			className='shadow-md rounded flex flex-col bg-white dark:bg-dark transition-colors p-4'
		>
			<div className='flex justify-between items-center'>
				<p className='uppercase text-gray font-medium overflow-hidden whitespace-nowrap text-ellipsis flex-1'>
					{title}
				</p>
				<span
					className={cls(
						'text-sm font-medium flex-shrink-0 ml-1',
						activeCls(rate > 0, 'text-success'),
						activeCls(rate == 0, 'text-gray '),
						activeCls(rate < 0, 'text-danger ')
					)}
				>
					<Icon
						component={
							rate > 0
								? NorthEastOutlined
								: rate < 0
								? SouthEastOutlined
								: AddOutlined
						}
						style={{ fontSize: 12 }}
						className='mr-1'
					/>
					{rate > 0 ? `+${rate}` : rate} %
				</span>
			</div>
			<div className='mt-6 flex items-end justify-between'>
				<div className=''>
					<p className='font-medium text-[22px] mb-6 text-[#495057] dark:text-[#ced4da]'>
						${value}
					</p>
					<Link className='underline text-primary dark:text-[#ced4da]' to={linkTo}>
						{linkTitle}
					</Link>
				</div>
				<div className=''>
					<CardLogo icon={icon} color={color} />
				</div>
			</div>
		</motion.div>
	)
}

export default Card
