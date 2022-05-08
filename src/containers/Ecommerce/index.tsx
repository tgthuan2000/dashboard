import { memo, useEffect } from 'react'
import { client } from '../../client/sanity'
import { headerHOC } from '../../hoc'
import { slug } from '../../utils/slug'
import { BestSellingProducts, Revenue } from './components'

const Ecommerce = () => {
    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(480px,1fr))] gap-6'>
            <Revenue />
            <BestSellingProducts />
        </div>
    )
}

export default memo(
    headerHOC(Ecommerce, 'Ecommerce', [
        {
            title: 'Dashboards',
            to: slug.home,
        },
    ])
)
