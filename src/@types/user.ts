import { SanityImageAssetDocument } from '@sanity/client'
import { colorStyles } from '.'

export interface User {
    _id: string
    _createdAt: string
    _updatedAt: string
    username: string
    fullName: string
    email?: string
    password?: string
    phone?: string
    address?: string
    role: UserRole
    image?: SanityImageAssetDocument
}
export interface UserRole {
    _id: string
    name: string
    style?: colorStyles
}
