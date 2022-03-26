import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reLogin } from './client/axios/auth'
import { setAccount, useAccount } from './features'
import { slug } from './utils/slug'
import { toastConfig } from './utils/toastConfig'
import { Loading } from './components'

function Auth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const account = useAccount()
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    useEffect(() => {
        if (Object.entries(account).length !== 0) navigate(searchParams.get('callback') || slug.dashboards)
    }, [account])

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const user = await reLogin()

                if (user) {
                    dispatch(setAccount(user))
                    toast('Login success!', toastConfig)
                }
            } catch (err: any) {
                toast(err.message, toastConfig)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return <div className='min-h-screen flex justify-center items-center'>{loading ? <Loading /> : <Outlet />}</div>
}

export default Auth
