import { Text } from '.'

const ZoomableHeader = () => {
	return (
		<div className='grid grid-cols-3 mt-5 mb-4'>
			<Text primary value='$584k' name='Revenue' />
			<Text value='$497k' name='Expenses' />
			<Text value='3.6%' name='Profit Ratio' />
		</div>
	)
}

export default ZoomableHeader
