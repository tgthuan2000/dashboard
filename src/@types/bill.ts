import { colorStyles, User } from '.'
import { Product } from './product'

export interface BillDetail {
    _id: string
    price: number
    product: Product
    quantity: number
}
export interface Bill {
    _id: string
    _createdAt: Date
    user: User
    billStatus: BillStatus
    amount: number
    prices: number[]
    detail?: BillDetail[]
}

export interface BillStatus {
    _id: string
    name: string
    style?: colorStyles
}
