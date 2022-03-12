import { headerHOC } from '../../hoc'
import { BalanceOverview, PotentialCustomer } from './components'

const CRM = () => {
	return (
		<div className='grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] grid-rows-[repeat(2,410px)] gap-6'>
			<BalanceOverview />
			<PotentialCustomer />
		</div>
	)
}

export default headerHOC(CRM, 'CRM', [{ title: 'Dashboards', to: '/' }])
