import { SettingsOutlined } from '@mui/icons-material'
import { Col, ColHeader, Button } from '.'
import { ButtonPaginate, Avatar } from '../../../components'
import { colorStyles } from '../../../utils/interfaces'

const colors: colorStyles[] = ['danger', 'info', 'warning', 'success']
const tableHeaders = [
	'Date',
	'Order ID',
	'Customer Name',
	' Amount',
	'Total Prices',
	'Bill Status',
	'',
]

const Table = () => {
	return (
		<div className='flex-1 w-ful'>
			<table className='w-full'>
				<thead className='bg-gray-light dark:bg-[#2a2f34] border-b border-[#e9ebec] text-gray transition-colors'>
					<tr>
						<ColHeader isCenter>
							<input
								type='checkbox'
								className='disabled:cursor-not-allowed cursor-pointer'
								disabled
							/>
						</ColHeader>
						{tableHeaders.map((value, index) => (
							<ColHeader key={`${value}-${index}`}>{value}</ColHeader>
						))}
					</tr>
				</thead>
				<tbody className='max-h-[100px] overflow-auto'>
					{Array.from(new Array(5)).map((v, i) => (
						<tr
							className='odd:bg-white even:bg-gray-light dark:odd:bg-dark dark:even:bg-[#2a2f34] dark:text-gray-light border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
							key={i}
						>
							<td className='text-center'>
								<label className='block h-full py-3'>
									<input
										type='checkbox'
										className='cursor-pointer disabled:cursor-not-allowed'
									/>
								</label>
							</td>
							<Col>{new Date().toDateString()}</Col>
							<Col>{(Math.floor(Math.random() * 899999) + 100000).toString()}</Col>
							<Col>
								<div className='flex items-center'>
									<Avatar />
									<div className='flex-1 overflow-hidden max-w-[200px] ml-3'>
										<h3 className='leading-normal text-sm text-[#495057] dark:text-[#cde4ca] font-medium overflow-hidden text-ellipsis whitespace-nowrap'>
											Username
										</h3>
									</div>
								</div>
							</Col>
							<Col>{(Math.floor(Math.random() * 89) + 10).toString()}</Col>
							<Col>{`${Math.floor(Math.random() * 890) + 100}k`}</Col>
							<Col>
								<Button style={colors[Math.floor(Math.random() * colors.length)]}>
									status
								</Button>
							</Col>
							<Col>
								<ButtonPaginate icon={SettingsOutlined} />
							</Col>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
