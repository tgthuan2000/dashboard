import { Header, IBreadcrumb } from '../../components'
import { BalanceOverview, PotentialCustomer } from './components'

const breadcrumb: IBreadcrumb[] = [
	{
		title: 'Dashboards',
		to: '/',
	},
	{
		title: 'CRM',
	},
]

const CRM = () => {
	return (
		<div>
			<Header className='mb-5' title='CRM' data={breadcrumb} />
			<div className='grid grid-cols-[minmax(500px,1fr)_400px] grid-rows-[410px] gap-6'>
				<BalanceOverview />
				<PotentialCustomer />
			</div>
		</div>
	)
}

export default CRM
