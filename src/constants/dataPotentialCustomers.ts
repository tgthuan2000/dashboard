interface DataPotentialCustomer {
	name: string
	pays: string | number
	orders: number
	visits: number
}
const dataPotentialCustomers: DataPotentialCustomer[] = [
	{
		name: 'Hồ Thị Thơm',
		pays: '$100.000k',
		orders: 100,
		visits: 10,
	},
	{
		name: 'Trần Gia Thuận',
		pays: '$200.000k',
		orders: 200,
		visits: 100,
	},
	{
		name: 'Hồ Đức Thắng',
		pays: '$100.000k',
		orders: 100,
		visits: 100,
	},
	{
		name: 'Hồ Thị Thơm',
		pays: '$100.000k',
		orders: 100,
		visits: 50,
	},
]
export default dataPotentialCustomers
