import { headerHOC } from '../../hoc'
import { BalanceOverview, PotentialCustomer } from './components'

const CRM = () => {
	return (
		<div className='grid grid-cols-[minmax(650px,1fr)_minmax(400px,1fr)] grid-rows-[410px] gap-6'>
			<BalanceOverview />
			<PotentialCustomer />
		</div>
	)
}

export default headerHOC(CRM, 'CRM', [{ title: 'Dashboards', to: '/' }])
