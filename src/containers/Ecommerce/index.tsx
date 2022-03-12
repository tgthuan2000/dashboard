import { headerHOC } from '../../hoc'
import { BestSellingProducts, Revenue } from './components'

const Ecommerce = () => {
	return (
		<div className='grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] grid-rows-[repeat(2,480px)] gap-6'>
			<Revenue />
			<BestSellingProducts />
		</div>
	)
}

export default headerHOC(Ecommerce, 'Ecommerce', [{ title: 'Dashboards', to: '/' }])
