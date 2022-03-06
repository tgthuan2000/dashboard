import { headerHOC } from '../../hoc'

const BillManagement = () => {
	return <div>BillManagement</div>
}

export default headerHOC(BillManagement, 'Bill Management', [{ title: 'Dashboards', to: '/' }])
