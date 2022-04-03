export const GET_BILLSTATUS = `
    *[_type == "billStatus" && _id != "ac26c381-8d20-4077-831f-215239cdf61a"] {
        _id,
        name,
    }
`

export const GET_BILLS = `
    *[_type == "bill" && _id != "ac26c381-8d20-4077-831f-215239cdf61a"] {
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
