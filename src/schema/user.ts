import { cls } from '../utils/classname-supporter'

export enum UserEnum {
    BY_STATUS = '&& references($_id)',
}

export const USER_QUERY = (...params: (UserEnum | null)[]) => `
    *[_type == "user" 
        && [fullName, email, username] match $query 
        ${cls(...params)}
    ] | order(_updatedAt desc)  
    {
        _id,
        _createdAt,
        _updatedAt,
        fullName,
        username,
        image,
        phone,
        address,
        email,
        role-> {
            _id,
            name,
            style
        }
    } [$start...$end]
`

export const GET_ACCOUNT_BY_ID = `
    *[_type == "user" && _id == $_id] {
        _id,
        _createdAt,
        _updatedAt,
        username,
        password,
        fullName,
        address,
        image,
        phone,
        email,
        role-> {
            _id,
            name
        }
    }
`

export const USER_ROLES = `
    *[_type == 'role'] | order(_createdAt desc) {
        _id,
        name
    }
`
