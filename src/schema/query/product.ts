export const GET_PRODUCTS = `*[_type == "product"] {
    _id,
    name,
    image,
    price,
    quantity
} [$start...$end]`
