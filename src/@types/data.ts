import { Dispatch } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { colorStyles } from '.'

export interface DataBestSellingProduct {
    image?: string
    product: string
    date: string | Date
    price: string | number
    orders: number
    stock: number
    amount: string | number
}

export interface DataCardAnalytic {
    title: string
    icon: React.ElementType
    value: string | number
    rate: string | number
}

export interface DataCardEcommerce {
    title: string
    rate: number | string
    value: string | number
    icon: React.ElementType
    color: colorStyles
    linkTitle: string
    linkTo: string
}

interface DataDropdownItem {
    title: string
    icon: React.ElementType
    data: { title: string; to: string }[]
}

export interface DataDropdown {
    title: string
    list: DataDropdownItem[]
}

export interface DataPersonConfig {
    title: string
    icon: React.ElementType
    action: (dispatch: Dispatch<any>, navigate: NavigateFunction) => void
}

export interface DataPotentialCustomer {
    name: string
    pays: string | number
    orders: number
    visits: number
}

export interface DataRevenue {
    title: string
    value: string
}
