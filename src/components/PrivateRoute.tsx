import { DoDisturbOutlined } from '@mui/icons-material'
import { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAccount } from '../features'
import { slug } from '../utils/slug'

interface PrivateRouteProps {
    children: ReactElement<any, any>
}

const ROLES = {
    EMPLOYEE: '08501cb3-9b73-4221-9227-1e1d139ab2b2',
    ADMIN: 'c036b28f-9870-4b4b-972b-9c7ea282b373',
    MANAGER: '9afea7eb-c4c9-4f00-99b8-1445d0caa564',
}

const employeeExclude = [slug.dashboards, slug.productManagements, slug.authentication]

const managerExclude = [slug.accounts]

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const account = useAccount()
    const { pathname } = useLocation()

    return Object.entries(account).length === 0 ? (
        <Navigate to={`${slug.auth}?callback=${window.location.pathname}`} />
    ) : (
        (() => {
            switch (account.role?._id) {
                case ROLES.EMPLOYEE: {
                    if (employeeExclude.find((employee) => pathname.includes(employee))) return <NoPermission />
                }
                case ROLES.MANAGER: {
                    if (managerExclude.find((manager) => pathname.includes(manager))) return <NoPermission />
                }
            }
            return children
        })()
    )
}

export default PrivateRoute

const NoPermission = () => {
    return (
        <div className='select-none cursor-not-allowed rounded-lg text-danger bg-white dark:bg-dark transition-colors h-[calc(100vh-70px-3rem)] flex items-center justify-center text-2xl font-medium uppercase'>
            <div className='animate-pulse flex flex-col items-center justify-center space-y-2'>
                <DoDisturbOutlined style={{ width: 100, height: 100 }} />
                <span>No permission</span>
            </div>
        </div>
    )
}
