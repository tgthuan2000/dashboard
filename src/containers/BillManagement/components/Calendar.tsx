import { InsertInvitationOutlined } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { LegacyRef, useEffect, useRef } from 'react'
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr'
import './theme.css'

interface CalendarProps {
    range: Date[]
    onDateChange?: (from: Date, to: Date) => void
}

const Calendar = ({ onDateChange, range }: CalendarProps) => {
    const ref = useRef(onDateChange)

    useEffect(() => {
        ref.current = onDateChange
    }, [onDateChange])

    const handleChangeDate = ([from, to]: Date[]) => {
        if (from && to) {
            ref.current?.(from, to)
        }
    }

    return (
        <Flatpickr
            value={range}
            onChange={handleChangeDate}
            render={({ defaultValue }, ref) => <CustomInput defaultValue={defaultValue} inputRef={ref} />}
            options={{
                dateFormat: 'd-m-Y',
                mode: 'range',
                maxDate: new Date(),
            }}
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
            className='px-4 rounded-l text-dark cursor-pointer bg-white dark:bg-[#262a2f] transition-colors dark:text-dark-white flex-1 outline-none border-none text-sm focus:ring-transparent'
            defaultValue={defaultValue}
            ref={inputRef}
        />
        <span className='flex-shrink-0 rounded-r bg-primary flex items-center justify-center px-4'>
            <Icon component={InsertInvitationOutlined} className='text-white' style={{ fontSize: 18 }} />
        </span>
    </div>
)
