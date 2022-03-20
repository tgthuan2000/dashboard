import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import Auth from './Auth'
import {
    AddProduct,
    Analytics,
    BillManagement,
    CRM,
    Ecommerce,
    EditProduct,
    Login,
    ProductManagement,
} from './containers'
import Accounts from './containers/Accounts'
import { AddAccount, EditAccount } from './containers/ConfigAccount'
import { headerHOC } from './hoc'
import './index.css'
import { store } from './store'

const NotFound = headerHOC(() => <></>, 'Page not found', [{ title: 'Go Home', to: '/' }])

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route index element={<Navigate to='dashboards' />} />
                        <Route path='dashboards'>
                            <Route index element={<Navigate to='ecommerce' />} />
                            <Route path='ecommerce' element={<Ecommerce />} />
                            <Route path='analytics' element={<Analytics />} />
                            <Route path='crm' element={<CRM />} />
                        </Route>
                        <Route path='payments'>
                            <Route index element={<Navigate to='bill-management' />} />
                            <Route path='bill-management' element={<BillManagement />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                        <Route path='product-managements'>
                            <Route index element={<Navigate to='products' />} />
                            <Route path='products' element={<ProductManagement />} />
                            <Route path='products/add' element={<AddProduct />} />
                            <Route path='products/edit/:id' element={<EditProduct />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                        <Route path='authentication'>
                            <Route index element={<Navigate to='accounts' />} />
                            <Route path='accounts' element={<Accounts />} />
                            <Route path='accounts/add' element={<AddAccount />} />
                            <Route path='accounts/edit/:id' element={<EditAccount />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                        <Route path='*' element={<NotFound />} />
                    </Route>
                    <Route path='/auth' element={<Auth />}>
                        <Route index element={<Navigate to='login' />} />
                        <Route path='login' element={<Login />} />
                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
