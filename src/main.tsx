import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Analytics, CRM, Ecommerce, Login, BillManagement } from './containers'
import Auth from './Auth'
import { Provider } from 'react-redux'
import { store } from './store'
import { headerHOC } from './hoc'

const NotFound = headerHOC(() => <></>, 'Page not found', [{ title: 'Dashboards', to: '/' }])

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />}>
						<Route index element={<Navigate to='ecommerce' />} />
						<Route path='ecommerce' element={<Ecommerce />} />
						<Route path='analytics' element={<Analytics />} />
						<Route path='crm' element={<CRM />} />
						<Route path='bill-management' element={<BillManagement />} />
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
