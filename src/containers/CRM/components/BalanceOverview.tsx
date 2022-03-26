import { Text, ZoomableChart } from '.'
import { Box, SortDropDown } from '../../../components'
import { cls } from '../../../utils/classname-supporter'

interface BalanceOverviewProps {
    className?: string
}

const BalanceOverview = ({ className }: BalanceOverviewProps) => {
    return (
        <div className={cls('h-full', className)}>
            <Box headerTitle='Balance Overview' option={<SortDropDown sortSelected='Current Year' />}>
                <div className='px-2'>
                    <div className='grid grid-cols-3 mt-5 mb-4'>
                        <Text primary value='$584k' name='Revenue' />
                        <Text value='$497k' name='Expenses' />
                        <Text value='3.6%' name='Profit Ratio' />
                    </div>
                </div>
                <ZoomableChart />
            </Box>
        </div>
    )
}

export default BalanceOverview
