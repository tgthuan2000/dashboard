import { cls } from '../utils/classname-supporter'

export const GET_PRODUCT_CATEGORIES = `
    *[_type == "categoryProduct"] {
        _id,
        name,
    } | order(_createdAt desc)
`

export const GET_PRODUCT_STATUS = `
    *[_type == "productStatus"] {
        _id,
        name,
    } | order(_createdAt desc)
`
export enum ProductEnum {
    BY_STATUS = '&& references($idStatus)',
    BY_CATEGORY = '&& references($idCategory)',
}
export const PRODUCT_QUERY = (...params: (ProductEnum | null)[]) => `
    *[_type == "product" 
        && name match $query 
        ${cls(...params)} 
    ]
    {
        _id,
        name,
        image,
        price,
        quantity,
        status-> {
            _id,
            name,
            style
        },
        categoryProduct-> {
            _id,
            name
        },
    } | order(_createdAt desc) [$start...$end]
`
