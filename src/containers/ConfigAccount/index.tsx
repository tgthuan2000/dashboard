import { headerHOC } from '../../hoc'

const ConfigAccount = () => {
    return <div>ConfigAccount</div>
}

export const AddAccount = headerHOC(ConfigAccount, 'Add account', [
    { title: 'Authentication', to: '/authentication' },
    { title: 'Accounts', to: '/authentication/accounts' },
])

export const EditAccount = headerHOC(ConfigAccount, 'Edit account', [
    { title: 'Authentication', to: '/authentication' },
    { title: 'Accounts', to: '/authentication/accounts' },
])
