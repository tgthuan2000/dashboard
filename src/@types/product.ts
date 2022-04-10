import { colorStyles } from '.'

export interface ProductStatus {
    _id: string
    name: string
    style?: colorStyles
}

export interface ProductCategory {
    _id: string
    name: string
}

export interface Product {
    _id: string
    name: string
    image: string
    price: number
    quantity: number
    totalCount: number
    status: ProductStatus
    categoryProduct: ProductCategory
}
