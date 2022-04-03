import { colorStyles, User } from '.'

export interface Bill {
    _id: string
    _createdAt: Date
    user: User
    billStatus: BillStatus
    amount: number
    totalPrice: number
}

export interface BillStatus {
    _id: string
    name: string
    style: colorStyles
}
