import { SanityImageAssetDocument } from '@sanity/client'
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
    image: SanityImageAssetDocument
    price: number
    quantity: number
    totalCount: number
    status: ProductStatus
    supplier: { _id: string; name: string }
    categoryProduct: ProductCategory
    description: string
}
