import { memo } from 'react'
import { headerHOC } from '../../hoc'
import { slug } from '../../utils/slug'
import { BalanceOverview, PotentialCustomer } from './components'

const CRM = () => {
    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-6'>
            <BalanceOverview />
            <PotentialCustomer />
        </div>
    )
}

export default memo(
    headerHOC(CRM, 'CRM', [
        {
            title: 'Dashboards',
            to: slug.home,
        },
    ])
)
