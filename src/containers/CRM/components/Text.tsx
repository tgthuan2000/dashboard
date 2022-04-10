import { activeCls, cls } from '../../../utils/classname-supporter'

interface TextProps {
    value?: string
    name?: string
    primary?: boolean
}
const Text = ({ value = '$584k', name = 'Revenue', primary = false }: TextProps) => {
    return (
        <div
            className={cls(
                'flex items-baseline justify-center',
                activeCls(!primary, 'border-l border-[#e9ebec] dark:border-[#32383e] dark:border-l-2 transition-colors')
            )}
        >
            <h5
                className={cls(
                    'text-xl font-medium',
                    activeCls(primary, 'text-primary', 'text-[#495057] dark:text-[#ced4da]')
                )}
            >
                {value}
            </h5>
            <span className='text-sm text-[#878a99] ml-2 font-medium'>{name}</span>
        </div>
    )
}

export default Text
