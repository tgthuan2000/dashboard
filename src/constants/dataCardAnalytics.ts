import { AutoGraphOutlined, PeopleAltOutlined, QueryBuilderOutlined } from '@mui/icons-material'
import React from 'react'

interface DataCardAnalytic {
	title: string
	icon: React.ElementType
	value: string | number
	rate: string | number
}

const dataCardAnalytics: DataCardAnalytic[] = [
	{
		title: 'Users',
		icon: PeopleAltOutlined,
		value: '28.05k',
		rate: 16.24,
	},
	{
		title: 'Sessions',
		icon: AutoGraphOutlined,
		value: '97.66k',
		rate: -3.96,
	},
	{
		title: 'Avg. Visit Duration',
		icon: QueryBuilderOutlined,
		value: '3m 40sec',
		rate: '0.000',
	},
]

export default dataCardAnalytics
