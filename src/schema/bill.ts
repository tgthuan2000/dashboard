const cartId = 'ac26c381-8d20-4077-831f-215239cdf61a'

export const GET_BILLSTATUS = `
    *[_type == "billStatus" && _id != "${cartId}"] {
        _id,
        name,
    }
`

export const GET_BILLS = `
    *[_type == "bill" && references(*[_type=="billStatus" && _id != "${cartId}"]._id) && _createdAt >= $from && _createdAt <= $to] {
        _id,
        _createdAt,
        "amount": count(*[_type == "bill-detail" && references(^._id)]),
        user-> {
            _id,
            fullName,
            username,
            phone,
            address,
            email
        },
        billStatus-> {
            _id,
            name,
            style
        },
    } | order(_createdAt desc) [$start...$end] 
`

export const FILTER_BILLS = `
    *[_type == "bill" && references($_id) && _createdAt >= $from && _createdAt <= $to] {
        _id,
        _createdAt,
        "amount": count(*[_type == "bill-detail" && references(^._id)]),
        user-> {
            _id,
            fullName,
            username,
            phone,
            address,
            email
        },
        billStatus-> {
            _id,
            name,
            style
        },
    } | order(_createdAt desc) [$start...$end] 
`

export const FILTER_BILL = `
    *[_type == "bill" && references(*[_type=="billStatus" && _id != "${cartId}"]._id) && _createdAt >= $from && _createdAt <= $to] {
        _id,
        _createdAt,
        "amount": count(*[_type == "bill-detail" && references(^._id)]),
        user-> {
            _id,
            fullName,
            username,
            phone,
            address,
            email
        },
        billStatus-> {
            _id,
            name,
            style
        },
    } | order(_createdAt desc) [$start...$end] 
`
