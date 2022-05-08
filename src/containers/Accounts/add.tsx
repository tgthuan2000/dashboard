import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { client } from '../../client/sanity'
import { Loading } from '../../components'
import { headerHOC } from '../../hoc'
import { useQuery } from '../../hooks'
import { USER_ROLES } from '../../schema'
import { slug } from '../../utils/slug'
import ConfigAccount, { FormInputs, selectType } from './ConfigAccount'

const AddAccount = () => {
    const { data: roleData, loading: roleLoading } = useQuery<selectType>(USER_ROLES)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onSubmit = (d: FormInputs) => {
        setLoading(true)

        const role = d.role && {
            _type: 'reference',
            _ref: d.role,
        }

        const image = d.image && {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: d.image,
            },
        }

        client
            .create({
                _type: 'user',
                username: d.username,
                password: d.password,
                fullName: d.fullName,
                phone: d.phone,
                email: d.email,
                address: d.address,
                image,
                role,
            })
            .then(() => navigate('../'))
            .finally(() => {
                setLoading(false)
            })
    }

    if (loading || roleLoading)
        return (
            <div className='w-full text-center pt-10'>
                <Loading />
            </div>
        )

    if (!roleData) return <div>Error</div>

    return (
        <>
            <ConfigAccount onSubmit={onSubmit} roleData={roleData} />
        </>
    )
}

export default headerHOC(AddAccount, 'Add account', [
    { title: 'Authentication', to: slug.authentication },
    { title: 'Accounts', to: slug.accounts },
])
