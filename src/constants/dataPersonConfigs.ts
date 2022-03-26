import { LogoutOutlined } from '@mui/icons-material'
import React, { Dispatch } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { logout } from '../features'

interface DataPersonConfig {
    title: string
    icon: React.ElementType
    action: (dispatch: Dispatch<any>, navigate: NavigateFunction) => void
}

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
