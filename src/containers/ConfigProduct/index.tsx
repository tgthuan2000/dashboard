import { headerHOC } from '../../hoc'

const ConfigProduct = () => {
	return <div>ConfigProduct</div>
}

export const AddProduct = headerHOC(ConfigProduct, 'Add product', [
	{ title: 'Product Managements', to: '/product-managements' },
	{ title: 'Products', to: '/product-managements/products' },
])

export const EditProduct = headerHOC(ConfigProduct, 'Edit product', [
	{ title: 'Product Managements', to: '/product-managements' },
	{ title: 'Products', to: '/product-managements/products' },
])
