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

export const GET_PRODUCTS = `
    *[_type == "product"] {
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
