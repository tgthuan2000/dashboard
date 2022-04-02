import { InsertInvitationOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { LegacyRef, useState } from 'react'
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr'
import './theme.css'

const today = new Date()
const distance = 7 // days

const Calendar = () => {
    const [date, setDate] = useState<Date[]>([new Date(today.getTime() - distance * 24 * 60 * 60 * 1000), today])
    return (
        <Flatpickr
            value={date}
            onChange={(date) => {
                setDate(date)
            }}
            render={({ defaultValue }, ref) => <CustomInput defaultValue={defaultValue} inputRef={ref} />}
            options={{ dateFormat: 'd-m-Y', mode: 'range', maxDate: today }}
        />
    )
}

export default Calendar

interface CustomInputProps extends DateTimePickerProps {
    inputRef?: LegacyRef<HTMLInputElement>
}

const CustomInput = ({ defaultValue, inputRef }: CustomInputProps) => (
    <div className='shadow-md flex w-max min-w-[210px] rounded h-[38px]'>
        <input
            className='px-4 rounded-l text-dark cursor-pointer bg-white dark:bg-[#262a2f] transition-colors dark:text-dark-white flex-1 outline-none'
            defaultValue={defaultValue}
            ref={inputRef}
        />
        <span className='flex-shrink-0 rounded-r bg-primary flex items-center justify-center px-4'>
            <Icon component={InsertInvitationOutlined} className='text-white' style={{ fontSize: 18 }} />
        </span>
    </div>
)
