const Table = () => {
	return (
		<div className='flex-1 w-ful'>
			<table className='w-full'>
				<thead className='bg-gray-light dark:bg-[#2a2f34] border-b border-[#e9ebec] text-gray transition-colors'>
					<tr>
						<th className='font-semibold py-3 px-2'>
							<input
								type='checkbox'
								className='disabled:cursor-not-allowed cursor-pointer'
								disabled
							/>
						</th>
						<th className='font-semibold py-3 px-2'>Date</th>
						<th className='font-semibold py-3 px-2'>Order ID</th>
						<th className='font-semibold py-3 px-2'>Customer Name</th>
						<th className='font-semibold py-3 px-2'>Amount</th>
						<th className='font-semibold py-3 px-2'>Total Prices</th>
						<th className='font-semibold py-3 px-2'>Bill status</th>
						<th className='font-semibold py-3 px-2'>Something else</th>
					</tr>
				</thead>
				<tbody>
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
							<td className='py-3 px-2'>{new Date().toDateString()}</td>
							<td className='py-3 px-2'>3118410422</td>
							<td className='py-3 px-2'>Trần Gia Thuận</td>
							<td className='py-3 px-2'>10</td>
							<td className='py-3 px-2'>10.000k</td>
							<td className='py-3 px-2'>Pending</td>
							<td className='py-3 px-2'>something else</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
