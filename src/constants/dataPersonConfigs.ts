import { LogoutOutlined } from '@mui/icons-material'
import { DataPersonConfig } from '../@types'
import { logout } from '../features'

const dataPersonConfigs: DataPersonConfig[] = [
    {
        title: 'Logout',
        icon: LogoutOutlined,
        action: (dispatch, navigate) => {
            dispatch(logout())
        },
    },
]

export default dataPersonConfigs
