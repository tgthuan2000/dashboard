import { NavLink } from 'react-router-dom'
import { cls } from '../../../utils/classname-supporter'

interface NavItemProps {
    title: string
    href: string
}
const NavItem = ({ title, href }: NavItemProps) => {
    return (
        <NavLink
            to={href}
            className={({ isActive }) =>
                cls(
                    'w-full inline-flex pl-12 py-2 pr-6 transition-colors',
                    isActive ? 'text-white pointer-events-none' : 'hover:text-white cursor-pointer'
                )
            }
        >
            <p className='text-sm relative before:absolute before:content-["-"] before:-left-5 before:font-bold'>
                {title}
            </p>
        </NavLink>
    )
}

export default NavItem
