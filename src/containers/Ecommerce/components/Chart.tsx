import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const Chart = () => {
	return (
		<div className='flex-1 py-2'>
			<ReactApexChart options={options} series={series} type='area' height='100%' />
		</div>
	)
}

export default Chart

const options: ApexOptions = {
	plotOptions: {
		bar: {
			columnWidth: '30%',
		},
	},
	chart: {
		type: 'line',
		stacked: false,
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
		fontSize: '12px',
		fontWeight: 400,
		itemMargin: { horizontal: 12 },
		height: 40,
		offsetY: 5,
	},
	colors: ['#405189', '#0ab39c', '#f06548'],
	dataLabels: { enabled: false },
	stroke: {
		curve: 'straight',
		dashArray: [0, 0, 10],
		width: [2, 0, 2.5],
	},
	grid: { show: false },
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
			formatter: (number) => `${number}.00`,
		},
	},
	fill: { type: 'solid', opacity: [0.1, 1, 1] },
}

const series: any[] = [
	{
		name: 'Orders',
		type: 'area',
		data: [
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
		],
	},
	{
		name: 'Earnings',
		type: 'column',
		data: [
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
		],
	},
	{
		name: 'Refunds',
		type: 'line',
		data: [
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
			Math.round(Math.random() * 120),
		],
	},
]
