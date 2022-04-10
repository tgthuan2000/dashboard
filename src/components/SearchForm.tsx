import { Close, Search } from '@mui/icons-material'
import { Icon } from '@mui/material'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useDebounce } from '../hooks'
import { cls } from '../utils/classname-supporter'

interface SearchFormProps {
    className?: string
    onSearch?: (value: string) => void
}

const SearchForm = ({ className, onSearch }: SearchFormProps) => {
    const [value, setValue] = useState('')
    const ref = useRef(onSearch)

    useEffect(() => {
        ref.current = onSearch
    }, [onSearch])

    useDebounce(
        () => {
            ref.current?.(value)
        },
        1000,
        [value]
    )

    return (
        <div
            className={cls(
                'relative bg-white shadow-md dark:bg-[#202328] flex items-center border-0 rounded transition-colors',
                className
            )}
        >
            <Icon className='ml-3 mr-2 text-gray dark:text-dark-white' style={{ fontSize: 18 }} component={Search} />
            <div className='flex-1'>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Search...'
                    className='bg-transparent dark:text-dark-white h-[38px] min-w-[282px] w-full pr-8 text-sm outline-none'
                />
            </div>
            {value && value.length > 0 && (
                <span
                    className='w-4 h-4 rounded-full bg-gray absolute right-2 text-white dark:text-dark flex items-center justify-center'
                    onClick={() => setValue('')}
                >
                    <Icon style={{ fontSize: 14 }} component={Close} />
                </span>
            )}
        </div>
    )
}

export default SearchForm
