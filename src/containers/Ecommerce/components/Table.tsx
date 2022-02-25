import { Col, Row } from '.'
import { dataBestSellingProducts } from '../../../constants'

const Table = () => {
	return (
		<table className='w-full'>
			<tbody>
				{dataBestSellingProducts.map(
					({ image, product, amount, date, orders, price, stock }, i) => (
						<Row active={i === 0} key={`${product}-${i}`}>
							<td className='p-3'>
								<div className='flex'>
									<div className='w-12 h-12'>
										<img
											src={image}
											alt=' '
											className='w-full h-full rounded-md object-cover bg-[#f3f6f9]'
										/>
									</div>
									<div className='flex flex-col justify-around ml-2'>
										<p className='font-medium dark:text-[#ced4da] text-[#495057]'>
											{product}
										</p>
										<span className='text-gray'>{date}</span>
									</div>
								</div>
							</td>
							<Col title='Price' value={price} />
							<Col title='Order' value={orders} />
							<Col
								title='Stock'
								value={stock}
								stock={stock === 0}
								stockMessage='Out of stock'
							/>
							<Col title='Amount' value={amount} />
						</Row>
					)
				)}
			</tbody>
		</table>
	)
}

export default Table
