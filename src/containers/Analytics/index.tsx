import { memo } from 'react'
import { dataCardAnalytics } from '../../constants'
import { headerHOC } from '../../hoc'
import { slug } from '../../utils/slug'
import { Card, HeatChart } from './components'

const Analytics = () => {
    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 mb-5'>
            <CardList />
            <HeatChart />
        </div>
    )
}

export default memo(
    headerHOC(Analytics, 'Analytics', [
        {
            title: 'Dashboards',
            to: slug.home,
        },
    ])
)

const CardList = () => {
    return (
        <div className='gap-6 grid'>
            {dataCardAnalytics.map((props) => (
                <Card key={props.title} {...props} />
            ))}
        </div>
    )
}
