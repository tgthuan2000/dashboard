import { memo } from 'react'
import { headerHOC } from '../../hoc'
import { BestSellingProducts, Revenue } from './components'

const Ecommerce = () => {
    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(480px,1fr))] gap-6'>
            <Revenue />
            <BestSellingProducts />
        </div>
    )
}

export default memo(headerHOC(Ecommerce, 'Ecommerce', [{ title: 'Dashboards', to: '/' }]))
