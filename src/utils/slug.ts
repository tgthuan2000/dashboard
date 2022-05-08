export const slug = {
    all: '*',
    home: '/',

    dashboards: '/dashboards',
    ecommerce: '/dashboards/ecommerce',
    analytics: '/dashboards/analytics',
    crm: '/dashboards/crm',
    _ecommerce: 'ecommerce',
    _analytics: 'analytics',
    _crm: 'crm',

    payments: '/payments',
    billManagement: '/payments/bill-management',
    billDetail: '/payments/bill-management/detail/:id',
    _billManagement: 'bill-management',
    _billDetail: 'bill-management/detail/:id',

    productManagements: '/product-managements',
    products: '/product-managements/products',
    products_add: '/product-managements/products/add',
    products_edit: '/product-managements/products/edit/:id',
    _products: 'products',
    _products_add: 'products/add',
    _products_edit: 'products/edit/:id',

    authentication: '/authentication',
    accounts: '/authentication/accounts',
    accounts_add: '/authentication/accounts/add',
    accounts_edit: '/authentication/accounts/edit/:id',
    _accounts: 'accounts',
    _accounts_add: 'accounts/add',
    _accounts_edit: 'accounts/edit/:id',

    auth: '/auth',
    login: '/auth/login',
    _login: 'login',
}
