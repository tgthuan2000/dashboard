import { ApexOptions } from 'apexcharts'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

const ZoomableChart = () => (
	<ReactApexChart options={options} series={series} type='area' height={290} />
)

export default React.memo(ZoomableChart)

const options: ApexOptions = {
	chart: {
		type: 'area',
		toolbar: { show: false },
		foreColor: '#adb5bd',
		fontFamily: 'Poppins, sans-serif',
	},
	legend: {
		show: true,
		horizontalAlign: 'center',
		position: 'bottom',
		showForSingleSeries: true,
		showForNullSeries: false,
		labels: { colors: '#878a99' },
		fontSize: '13px',
		fontWeight: 400,
		itemMargin: { horizontal: 12 },
		height: 40,
		offsetY: 5,
	},
	colors: ['#0ab39c', '#f06548'],
	dataLabels: { enabled: false },
	stroke: {
		curve: 'smooth',
		width: 2,
	},
	grid: {
		strokeDashArray: 0.1,
	},
	xaxis: {
		type: 'category',
		categories: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dev',
		],
	},
	yaxis: {
		labels: {
			formatter: (number) => `$${number}k`,
		},
	},
	fill: { type: 'solid', opacity: 0.1 },
}

const series: any[] = [
	{
		name: 'Revenue',
		data: [
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
			Math.round(Math.random() * 500),
		],
	},
	{
		name: 'Expense',
		data: [
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
			Math.round(Math.random() * 200),
		],
	},
]
