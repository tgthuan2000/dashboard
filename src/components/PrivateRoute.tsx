import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAccount } from '../features'
import { slug } from '../utils/slug'

interface PrivateRouteProps {
    children: ReactElement<any, any>
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const account = useAccount()

    return Object.entries(account).length === 0 ? (
        <Navigate to={`${slug.auth}?callback=${window.location.pathname}`} />
    ) : (
        children
    )
}

export default PrivateRoute
