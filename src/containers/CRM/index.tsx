import { Header, IBreadcrumb } from '../../components'
import { BalanceOverview } from './components'

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
			<div className='grid grid-cols-2'>
				<BalanceOverview />
			</div>
		</div>
	)
}

export default CRM
