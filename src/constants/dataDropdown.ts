import {
    AdminPanelSettingsOutlined,
    InventoryOutlined,
    MonetizationOnOutlined,
    SpeedOutlined,
} from '@mui/icons-material'
import { DataDropdown } from '../@types'

const dataDropdowns: DataDropdown[] = [
    {
        title: 'menu',
        list: [
            {
                title: 'Dashboards',
                icon: SpeedOutlined,
                data: [
                    {
                        title: 'Ecommerce',
                        to: 'dashboards/ecommerce',
                    },
                    {
                        title: 'Analytics',
                        to: 'dashboards/analytics',
                    },
                    {
                        title: 'CRM',
                        to: 'dashboards/crm',
                    },
                ],
            },
            {
                title: 'Payments',
                icon: MonetizationOnOutlined,
                data: [
                    {
                        title: 'Bill Management',
                        to: 'payments/bill-management',
                    },
                ],
            },
            {
                title: 'Product Managements',
                icon: InventoryOutlined,
                data: [
                    {
                        title: 'Products',
                        to: 'product-managements/products',
                    },
                ],
            },
            {
                title: 'Authentication',
                icon: AdminPanelSettingsOutlined,
                data: [
                    {
                        title: 'Accounts',
                        to: 'authentication/accounts',
                    },
                ],
            },
        ],
    },
]
export default dataDropdowns
