import { dataCardAnalytics } from '../../constants'
import { headerHOC } from '../../hoc'
import { Card, HeatChart } from './components'

const Analytics = () => {
	return (
		<div className='grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] grid-rows-[repeat(2,500px)] gap-6 mb-5'>
			<CardList />
			<HeatChart />
		</div>
	)
}

export default headerHOC(Analytics, 'Analytics', [{ title: 'Dashboards', to: '/' }])

const CardList = () => {
	return (
		<div className='gap-6 grid'>
			{dataCardAnalytics.map((props) => (
				<Card key={props.title} {...props} />
			))}
		</div>
	)
}
