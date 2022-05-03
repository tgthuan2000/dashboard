import { cls } from '../utils/classname-supporter'

export const GET_PRODUCT_CATEGORIES = `
    *[_type == "categoryProduct"] | order(_createdAt desc) {
        _id,
        name,
    }
`

export const GET_PRODUCT_STATUS = `
    *[_type == "productStatus"] | order(_createdAt desc) {
        _id,
        name,
    }
`

export const GET_PRODUCT_SUPPLIER = `
    *[_type == "supplier"] | order(_createdAt desc) {
        _id,
        name,
    }
`

export enum ProductEnum {
    BY_STATUS = '&& references($idStatus)',
    BY_CATEGORY = '&& references($idCategory)',
}
export const PRODUCT_QUERY = (...params: (ProductEnum | null)[]) => `
    *[_type == "product" 
        && name match $query 
        ${cls(...params)} 
    ] | order(_createdAt desc) 
    {
        _id,
        _createdAt,
        _updatedAt,
        name,
        description,
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
        supplier-> {
            _id,
            name
        },
    } [$start...$end]
`

export const GET_PRODUCT_BY_ID = `
    *[_type == "product" && _id == $_id] {
        _id,
        name,
        description,
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
        supplier-> {
            _id,
            name
        },
    }
`
