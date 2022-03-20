import { ApexOptions } from 'apexcharts'
import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { Box, SortDropDown } from '../../../components'
import { cls } from '../../../utils/classname-supporter'

interface HeatChartProps {
	className?: string
}

const HeatChart = ({ className }: HeatChartProps) => (
	<div className={cls('h-full', className)}>
		<Box option={<SortDropDown />}>
			<div className='flex-1 py-2'>
				<ReactApexChart options={options} series={series} type='heatmap' height='100%' />
			</div>
		</Box>
	</div>
)

export default React.memo(HeatChart)

const options: ApexOptions = {
	plotOptions: {
		heatmap: {
			colorScale: {
				ranges: [
					{
						from: 0,
						to: 50,
						color: '#0ab39c',
						name: '0 - 50',
					},
					{
						from: 51,
						to: 100,
						color: '#299cdb',
						name: '51 - 100',
					},
				],
			},
		},
	},
	chart: {
		type: 'heatmap',
		toolbar: { show: false },
		fontFamily: 'Poppins, sans-serif',
		foreColor: '#adb5bd',
	},
	legend: {
		show: true,
		horizontalAlign: 'center',
		position: 'top',
		showForSingleSeries: true,
		showForNullSeries: false,
		labels: { colors: '#878a99' },
		markers: {
			width: 20,
			height: 6,
		},
		fontSize: '12px',
		fontWeight: 400,
		itemMargin: { horizontal: 12 },
		height: 20,
		offsetY: 15,
		onItemHover: {
			highlightDataSeries: true,
		},
	},
	dataLabels: { enabled: false },
	colors: ['#008FFB'],
}

const series = [
	{
		name: 'Sun',
		data: [
			{ x: '1h', y: Math.round(Math.random() * 100) },
			{ x: '2h', y: Math.round(Math.random() * 100) },
			{ x: '3h', y: Math.round(Math.random() * 100) },
			{ x: '4h', y: Math.round(Math.random() * 100) },
			{ x: '5h', y: Math.round(Math.random() * 100) },
			{ x: '6h', y: Math.round(Math.random() * 100) },
			{ x: '7h', y: Math.round(Math.random() * 100) },
			{ x: '8h', y: Math.round(Math.random() * 100) },
			{ x: '9h', y: Math.round(Math.random() * 100) },
			{ x: '10h', y: Math.round(Math.random() * 100) },
			{ x: '11h', y: Math.round(Math.random() * 100) },
			{ x: '12h', y: Math.round(Math.random() * 100) },
			{ x: '13h', y: Math.round(Math.random() * 100) },
			{ x: '14h', y: Math.round(Math.random() * 100) },
			{ x: '15h', y: Math.round(Math.random() * 100) },
			{ x: '16h', y: Math.round(Math.random() * 100) },
			{ x: '17h', y: Math.round(Math.random() * 100) },
			{ x: '18h', y: Math.round(Math.random() * 100) },
		],
	},
	{
		name: 'Mon',
		data: [
			{ x: '1h', y: Math.round(Math.random() * 100) },
			{ x: '2h', y: Math.round(Math.random() * 100) },
			{ x: '3h', y: Math.round(Math.random() * 100) },
			{ x: '4h', y: Math.round(Math.random() * 100) },
			{ x: '5h', y: Math.round(Math.random() * 100) },
			{ x: '6h', y: Math.round(Math.random() * 100) },
			{ x: '7h', y: Math.round(Math.random() * 100) },
			{ x: '8h', y: Math.round(Math.random() * 100) },
			{ x: '9h', y: Math.round(Math.random() * 100) },
			{ x: '10h', y: Math.round(Math.random() * 100) },
			{ x: '11h', y: Math.round(Math.random() * 100) },
			{ x: '12h', y: Math.round(Math.random() * 100) },
			{ x: '13h', y: Math.round(Math.random() * 100) },
			{ x: '14h', y: Math.round(Math.random() * 100) },
			{ x: '15h', y: Math.round(Math.random() * 100) },
			{ x: '16h', y: Math.round(Math.random() * 100) },
			{ x: '17h', y: Math.round(Math.random() * 100) },
			{ x: '18h', y: Math.round(Math.random() * 100) },
		],
	},
	{
		name: 'Tue',
		data: [
			{ x: '1h', y: Math.round(Math.random() * 100) },
			{ x: '2h', y: Math.round(Math.random() * 100) },
			{ x: '3h', y: Math.round(Math.random() * 100) },
			{ x: '4h', y: Math.round(Math.random() * 100) },
			{ x: '5h', y: Math.round(Math.random() * 100) },
			{ x: '6h', y: Math.round(Math.random() * 100) },
			{ x: '7h', y: Math.round(Math.random() * 100) },
			{ x: '8h', y: Math.round(Math.random() * 100) },
			{ x: '9h', y: Math.round(Math.random() * 100) },
			{ x: '10h', y: Math.round(Math.random() * 100) },
			{ x: '11h', y: Math.round(Math.random() * 100) },
			{ x: '12h', y: Math.round(Math.random() * 100) },
			{ x: '13h', y: Math.round(Math.random() * 100) },
			{ x: '14h', y: Math.round(Math.random() * 100) },
			{ x: '15h', y: Math.round(Math.random() * 100) },
			{ x: '16h', y: Math.round(Math.random() * 100) },
			{ x: '17h', y: Math.round(Math.random() * 100) },
			{ x: '18h', y: Math.round(Math.random() * 100) },
		],
	},
	{
		name: 'Web',
		data: [
			{ x: '1h', y: Math.round(Math.random() * 100) },
			{ x: '2h', y: Math.round(Math.random() * 100) },
			{ x: '3h', y: Math.round(Math.random() * 100) },
			{ x: '4h', y: Math.round(Math.random() * 100) },
			{ x: '5h', y: Math.round(Math.random() * 100) },
			{ x: '6h', y: Math.round(Math.random() * 100) },
			{ x: '7h', y: Math.round(Math.random() * 100) },
			{ x: '8h', y: Math.round(Math.random() * 100) },
			{ x: '9h', y: Math.round(Math.random() * 100) },
			{ x: '10h', y: Math.round(Math.random() * 100) },
			{ x: '11h', y: Math.round(Math.random() * 100) },
			{ x: '12h', y: Math.round(Math.random() * 100) },
			{ x: '13h', y: Math.round(Math.random() * 100) },
			{ x: '14h', y: Math.round(Math.random() * 100) },
			{ x: '15h', y: Math.round(Math.random() * 100) },
			{ x: '16h', y: Math.round(Math.random() * 100) },
			{ x: '17h', y: Math.round(Math.random() * 100) },
			{ x: '18h', y: Math.round(Math.random() * 100) },
		],
	},
	{
		name: 'Thu',
		data: [
			{ x: '1h', y: Math.round(Math.random() * 100) },
			{ x: '2h', y: Math.round(Math.random() * 100) },
			{ x: '3h', y: Math.round(Math.random() * 100) },
			{ x: '4h', y: Math.round(Math.random() * 100) },
			{ x: '5h', y: Math.round(Math.random() * 100) },
			{ x: '6h', y: Math.round(Math.random() * 100) },
			{ x: '7h', y: Math.round(Math.random() * 100) },
			{ x: '8h', y: Math.round(Math.random() * 100) },
			{ x: '9h', y: Math.round(Math.random() * 100) },
			{ x: '10h', y: Math.round(Math.random() * 100) },
			{ x: '11h', y: Math.round(Math.random() * 100) },
			{ x: '12h', y: Math.round(Math.random() * 100) },
			{ x: '13h', y: Math.round(Math.random() * 100) },
			{ x: '14h', y: Math.round(Math.random() * 100) },
			{ x: '15h', y: Math.round(Math.random() * 100) },
			{ x: '16h', y: Math.round(Math.random() * 100) },
			{ x: '17h', y: Math.round(Math.random() * 100) },
			{ x: '18h', y: Math.round(Math.random() * 100) },
		],
	},
	{
		name: 'Fri',
		data: [
			{ x: '1h', y: Math.round(Math.random() * 100) },
			{ x: '2h', y: Math.round(Math.random() * 100) },
			{ x: '3h', y: Math.round(Math.random() * 100) },
			{ x: '4h', y: Math.round(Math.random() * 100) },
			{ x: '5h', y: Math.round(Math.random() * 100) },
			{ x: '6h', y: Math.round(Math.random() * 100) },
			{ x: '7h', y: Math.round(Math.random() * 100) },
			{ x: '8h', y: Math.round(Math.random() * 100) },
			{ x: '9h', y: Math.round(Math.random() * 100) },
			{ x: '10h', y: Math.round(Math.random() * 100) },
			{ x: '11h', y: Math.round(Math.random() * 100) },
			{ x: '12h', y: Math.round(Math.random() * 100) },
			{ x: '13h', y: Math.round(Math.random() * 100) },
			{ x: '14h', y: Math.round(Math.random() * 100) },
			{ x: '15h', y: Math.round(Math.random() * 100) },
			{ x: '16h', y: Math.round(Math.random() * 100) },
			{ x: '17h', y: Math.round(Math.random() * 100) },
			{ x: '18h', y: Math.round(Math.random() * 100) },
		],
	},
	{
		name: 'Sat',
		data: [
			{ x: '1h', y: Math.round(Math.random() * 100) },
			{ x: '2h', y: Math.round(Math.random() * 100) },
			{ x: '3h', y: Math.round(Math.random() * 100) },
			{ x: '4h', y: Math.round(Math.random() * 100) },
			{ x: '5h', y: Math.round(Math.random() * 100) },
			{ x: '6h', y: Math.round(Math.random() * 100) },
			{ x: '7h', y: Math.round(Math.random() * 100) },
			{ x: '8h', y: Math.round(Math.random() * 100) },
			{ x: '9h', y: Math.round(Math.random() * 100) },
			{ x: '10h', y: Math.round(Math.random() * 100) },
			{ x: '11h', y: Math.round(Math.random() * 100) },
			{ x: '12h', y: Math.round(Math.random() * 100) },
			{ x: '13h', y: Math.round(Math.random() * 100) },
			{ x: '14h', y: Math.round(Math.random() * 100) },
			{ x: '15h', y: Math.round(Math.random() * 100) },
			{ x: '16h', y: Math.round(Math.random() * 100) },
			{ x: '17h', y: Math.round(Math.random() * 100) },
			{ x: '18h', y: Math.round(Math.random() * 100) },
		],
	},
]
