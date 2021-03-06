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
    Accounts,
    AddAccount,
    EditAccount,
    BillDetail,
} from './containers'
import { headerHOC } from './hoc'
import './index.css'
import { store } from './store'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { slug } from './utils/slug'
import { PrivateRoute } from './components'
import { HelmetProvider } from 'react-helmet-async'
import { QuestionMark } from '@mui/icons-material'

const PageNotFound = () => (
    <div className='select-none cursor-not-allowed rounded-lg text-warning bg-white dark:bg-dark transition-colors h-[calc(100vh-70px-3rem)] flex items-center justify-center text-2xl font-medium uppercase'>
        <div className='animate-pulse flex flex-col items-center justify-center space-y-2'>
            <QuestionMark style={{ width: 100, height: 100 }} />
            <span>PAGE NOT FOUND</span>
        </div>
    </div>
)

const NotFound = headerHOC(PageNotFound, 'Page not found', [{ title: 'Go Home', to: slug.home }])

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <ToastContainer
                        closeButton={false}
                        toastClassName='transition-colors dark:bg-dark dark:text-white font-medium text-sm font-base'
                        position='bottom-right'
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <Routes>
                        <Route path={slug.home} element={<App />}>
                            <Route index element={<Navigate to={slug.dashboards} />} />
                            <Route path={slug.dashboards}>
                                <Route index element={<Navigate to={slug._ecommerce} />} />
                                <Route
                                    path={slug._ecommerce}
                                    element={
                                        <PrivateRoute>
                                            <Ecommerce />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug._analytics}
                                    element={
                                        <PrivateRoute>
                                            <Analytics />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug._crm}
                                    element={
                                        <PrivateRoute>
                                            <CRM />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug.all}
                                    element={
                                        <PrivateRoute>
                                            <NotFound />
                                        </PrivateRoute>
                                    }
                                />
                            </Route>
                            <Route path={slug.payments}>
                                <Route index element={<Navigate to={slug._billManagement} />} />
                                <Route
                                    path={slug._billManagement}
                                    element={
                                        <PrivateRoute>
                                            <BillManagement />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug._billDetail}
                                    element={
                                        <PrivateRoute>
                                            <BillDetail />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug.all}
                                    element={
                                        <PrivateRoute>
                                            <NotFound />
                                        </PrivateRoute>
                                    }
                                />
                            </Route>
                            <Route path={slug.productManagements}>
                                <Route index element={<Navigate to={slug._products} />} />
                                <Route
                                    path={slug._products}
                                    element={
                                        <PrivateRoute>
                                            <ProductManagement />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug._products_add}
                                    element={
                                        <PrivateRoute>
                                            <AddProduct />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug._products_edit}
                                    element={
                                        <PrivateRoute>
                                            <EditProduct />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug.all}
                                    element={
                                        <PrivateRoute>
                                            <NotFound />
                                        </PrivateRoute>
                                    }
                                />
                            </Route>
                            <Route path={slug.authentication}>
                                <Route index element={<Navigate to={slug._accounts} />} />
                                <Route
                                    path={slug._accounts}
                                    element={
                                        <PrivateRoute>
                                            <Accounts />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug._accounts_add}
                                    element={
                                        <PrivateRoute>
                                            <AddAccount />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug._accounts_edit}
                                    element={
                                        <PrivateRoute>
                                            <EditAccount />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={slug.all}
                                    element={
                                        <PrivateRoute>
                                            <NotFound />
                                        </PrivateRoute>
                                    }
                                />
                            </Route>
                            <Route
                                path={slug.all}
                                element={
                                    <PrivateRoute>
                                        <NotFound />
                                    </PrivateRoute>
                                }
                            />
                        </Route>
                        <Route path={slug.auth} element={<Auth />}>
                            <Route index element={<Navigate to={slug._login} />} />
                            <Route path={slug._login} element={<Login />} />
                            <Route path={slug.all} element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
