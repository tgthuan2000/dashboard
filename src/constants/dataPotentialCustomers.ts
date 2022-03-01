interface DataPotentialCustomer {
	name: string
	pays: string | number
	orders: number
}
const dataPotentialCustomers: DataPotentialCustomer[] = [
	{
		name: 'Hồ Thị Thơm',
		pays: '$100.000k',
		orders: 100,
	},
	{
		name: 'Trần Gia Thuận',
		pays: '$200.000k',
		orders: 200,
	},
	{
		name: 'Hồ Đức Thắng',
		pays: '$100.000k',
		orders: 100,
	},
	{
		name: 'Hồ Thị Thơm',
		pays: '$100.000k',
		orders: 100,
	},
]
export default dataPotentialCustomers
