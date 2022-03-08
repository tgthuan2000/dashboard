import { headerHOC } from '../../hoc'
import { SearchForm, Calendar, ButtonGroup } from './components'

const BillManagement = () => {
	return (
		<div className='flex gap-5'>
			<SearchForm className='flex-1' />
			<Calendar />
			<ButtonGroup />
		</div>
	)
}

export default headerHOC(BillManagement, 'Bill Management', [{ title: 'Dashboards', to: '/' }])
