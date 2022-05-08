import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { User } from '../../@types'
import { client } from '../../client/sanity'
import { Loading } from '../../components'
import { headerHOC } from '../../hoc'
import { useQuery } from '../../hooks'
import { GET_ACCOUNT_BY_ID, USER_ROLES } from '../../schema'
import { slug } from '../../utils/slug'
import ConfigAccount, { FormInputs, selectType } from './ConfigAccount'

const EditAccount = () => {
    const params = useParams()
    const {
        data: [accountData],
        loading: accountLoading,
    } = useQuery<User>(GET_ACCOUNT_BY_ID, [], { _id: params.id })

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

        const password = d.password?.trim() !== '*******************' ? d.password?.trim() : accountData.password

        client
            .patch(accountData._id)
            .set({
                username: d.username,
                fullName: d.fullName,
                password,
                phone: d.phone,
                email: d.email,
                address: d.address,
                image,
                role,
            })
            .commit()
            .then(() => navigate('../'))
            .finally(() => {
                setLoading(false)
            })
    }

    if (loading || accountLoading || roleLoading)
        return (
            <div className='w-full text-center pt-10'>
                <Loading />
            </div>
        )

    if (!accountData || !roleData) return <div>Error</div>

    return (
        <>
            <ConfigAccount accountData={accountData} onSubmit={onSubmit} roleData={roleData} />
        </>
    )
}

export default headerHOC(EditAccount, 'Edit account', [
    { title: 'Authentication', to: slug.authentication },
    { title: 'Accounts', to: slug.accounts },
])
