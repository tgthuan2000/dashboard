import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { NavbarHorizontal, NavbarVertical } from './containers'

function App() {
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

    return (
        <>
            <NavbarHorizontal />
            <div className='max-w-[95%] mx-auto px-6'>
                <NavbarVertical />
                <div className='md:ml-64 ml-0 transition-all min-h-screen'>
                    <motion.div
                        initial={{ x: '100vw' }}
                        animate={{ x: 0 }}
                        className='pt-[calc(70px+1.5rem)] pl-[calc(1.5rem/2)] pb-14 pr-[calc(1.5rem/2)]'
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default App
