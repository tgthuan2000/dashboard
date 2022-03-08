interface DataBill {
	product: string
	date: string | Date
	price: string | number
	orders: number
	amount: string | number
}

const dataBill: DataBill[] = [
	{
		product: 'Branded T-Shirts',
		date: '24 Apr 2021',
		price: '$29.00',
		orders: 62,
		amount: '1,798',
	},
	{
		product: 'Bentwood Chair',
		date: '19 Mar 2021',
		price: '$85.20',
		orders: 35,
		amount: '2,982',
	},
	{
		product: 'Borosil Paper Cup',
		date: '01 Mar 2021',
		price: '$14.00',
		orders: 80,
		amount: '1,120',
	},
	{
		product: 'One Seater Sofa',
		date: '11 Feb 2021',
		price: '$127.50',
		orders: 56,
		amount: '7,140',
	},
	{
		product: 'Stillbird Helmet',
		date: '17 Jan 2021',
		price: '$54.00',
		orders: 74,
		amount: '3,996',
	},
]

export default dataBill
