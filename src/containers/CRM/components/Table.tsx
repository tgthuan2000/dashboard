import { Col, Row } from '../../../components'
import { dataPotentialCustomers } from '../../../constants'

const Table = () => {
    return (
        <div className='flex-1 w-ful'>
            <table className='w-full'>
                <tbody>
                    {dataPotentialCustomers.map(({ name, orders, pays, visits }, i) => (
                        <Row active={i === 0} key={`${name}-${i}`}>
                            <Col title='Customer name' value={name} bold type='text' />
                            <Col title='Order' value={orders} />
                            <Col title='Pay' value={pays} />
                            <Col title='Visits' value={visits} />
                        </Row>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
