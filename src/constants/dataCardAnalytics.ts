import { AutoGraphOutlined, PeopleAltOutlined, QueryBuilderOutlined } from '@mui/icons-material'
import { DataCardAnalytic } from '../@types'

const dataCardAnalytics: DataCardAnalytic[] = [
    {
        title: 'Users',
        icon: PeopleAltOutlined,
        value: '28.05k',
        rate: 16.24,
    },
    {
        title: 'Sessions',
        icon: AutoGraphOutlined,
        value: '97.66k',
        rate: -3.96,
    },
    {
        title: 'Avg. Visit Duration',
        icon: QueryBuilderOutlined,
        value: '3m 40sec',
        rate: '0.000',
    },
]

export default dataCardAnalytics
