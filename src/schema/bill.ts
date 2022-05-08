import { cls } from '../utils/classname-supporter'

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

export const BILL_QUERY = (...params: (BillEnum | null)[]) => `
    *[_type == "bill" 
        && _createdAt >= $from 
        && _createdAt <= $to 
        && references(*[_type == "user" && fullName match $query]._id) 
        ${cls(...params)}
    ] | order(_createdAt desc)  
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
            email,
            image
        },
        billStatus-> {
            _id,
            name,
            style
        },
        "prices": *[_type == "bill-detail" && references(^._id)].price
    } [$start...$end]
`

export const GET_BILL_BY_ID = `
    *[_type == "bill" && _id == $_id] {
        _id,
        user-> {
            _id,
            fullName,
            username,
            phone,
            address,
            email,
            role-> {
                _id,
                name,
                style
            },
            image
        },
        billStatus-> {
            _id,
            name,
            style
        },
        "detail": *[_type == "bill-detail" && references(^._id)] {
            product-> {
                _id,
                name,
                image,
                price,
                categoryProduct-> {
                    _id,
                    name
                },
                supplier-> {
                    _id,
                    name
                }
            },
            quantity,
            price,
            _id
        }
    }
`
