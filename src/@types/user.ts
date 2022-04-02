export interface User {
    _id: string
    username: string
    fullName: string
    email: string
    phone: string | number
    address: string
    role: UserRole
}
export interface UserRole {
    _id: string
    name: string
}
