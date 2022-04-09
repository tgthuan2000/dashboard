export const BILLSTATUS_QUERY = `
    *[_type == "billStatus" && _id != "ac26c381-8d20-4077-831f-215239cdf61a"] {
        _id,
        name,
    }
`

export enum BillEnum {
    ALL_STATUS = '&& references(*[_type=="billStatus" && _id != "ac26c381-8d20-4077-831f-215239cdf61a"]._id)',
    BY_STATUS = '&& references($_id)',
}

export const BILL_QUERY = (...params: BillEnum[]) => `
    *[_type == "bill" 
        && _createdAt >= $from 
        && _createdAt <= $to 
        && references(*[_type == "user" && fullName match $query]._id) 
        ${params.join(' ')}
    ] 
    {
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
