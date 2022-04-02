import { User } from '.'

export interface Bill {
    _id: string
    _createdAt: Date
    user: User
    status: BillStatus
}

export interface BillStatus {
    _id: string
    name: string
}
