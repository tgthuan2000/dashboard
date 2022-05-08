import { EditOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { User } from '../../../@types'
import { urlFor } from '../../../client/sanity'
import { Badge } from '../../../components'

interface UserCardProps {
    data: User
}

const UserCard = ({ data }: UserCardProps) => {
    return (
        <div className='relative group bg-white dark:bg-dark transition-colors rounded-md overflow-hidden shadow-md select-none cursor-default'>
            <div className='h-24 bg-primary' />
            <img
                src={urlFor(data.image)}
                alt={data.fullName[0]}
                className='-mt-12 text-5xl flex items-center justify-center text-gray-dark border border-gray object-cover mx-auto h-24 w-24 rounded-full bg-gray-light'
            />
            <div className='m-4 space-y-4'>
                <div className='grid grid-cols-7'>
                    <span className='col-span-2 text-gray-dark dark:text-gray'>Fullname:</span>
                    <h4 className='col-span-5 font-medium dark:text-gray-light'>{data.fullName ?? '-'}</h4>
                </div>
                <div className='grid grid-cols-7'>
                    <span className='col-span-2 text-gray-dark dark:text-gray'>Phone:</span>
                    <h4 className='col-span-5 font-medium dark:text-gray-light'>{data.phone ?? '-'}</h4>
                </div>
                <div className='grid grid-cols-7'>
                    <span className='col-span-2 text-gray-dark dark:text-gray'>Email:</span>
                    <h4 className='col-span-5 font-medium dark:text-gray-light'>{data.email ?? '-'}</h4>
                </div>
                <div className='grid grid-cols-7'>
                    <span className='col-span-2 text-gray-dark dark:text-gray'>Address:</span>
                    <h4 className='col-span-5 font-medium dark:text-gray-light'>{data.address ?? '-'}</h4>
                </div>
                <div className='grid grid-cols-7'>
                    <span className='col-span-2 text-gray-dark dark:text-gray'>Role:</span>
                    <h4 className='col-span-5'>
                        <Badge style={data.role?.style}>{data.role?.name}</Badge>
                    </h4>
                </div>
            </div>
            <Link
                to={`/authentication/accounts/edit/${data._id}`}
                className='absolute top-3 right-3 group-hover:block hidden'
            >
                <div className='hover:opacity-50 bg-dark-white cursor-pointer p-1 rounded-md'>
                    <EditOutlined className='text-gray-dark' style={{ width: 20, height: 20 }} />
                </div>
            </Link>
        </div>
    )
}

export default UserCard
