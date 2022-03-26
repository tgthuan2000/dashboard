import { useNavigate } from 'react-router-dom'
import { ColHeader } from '../../../components'

const tableHeaders = ['Full Name', 'Account name', 'Email', 'Phone', 'btns']

const Table = () => {
    const navigate = useNavigate()
    return (
        <div className='flex-1 w-ful'>
            <table className='w-full'>
                <thead className='bg-gray-light dark:bg-[#2a2f34] border-b border-[#e9ebec] text-gray transition-colors'>
                    <tr>
                        {tableHeaders.map((value, index) => (
                            <ColHeader isCenter key={`${value}-${index}`}>
                                {value}
                            </ColHeader>
                        ))}
                    </tr>
                </thead>
                <tbody className='max-h-[100px] overflow-auto'>
                    {Array.from(new Array(7)).map((v, i) => (
                        <tr
                            className='hover:bg-gray-light dark:hover:bg-gray-dark cursor-pointer dark:text-gray-light border-b border-[#e9ebec] dark:border-[#32383e] transition-colors'
                            key={i}
                            onClick={() => navigate(`edit/${Math.random()}`)}
                        >
                            <td className='text-center py-5'></td>
                            <td className='text-center py-5'></td>
                            <td className='text-center py-5'></td>
                            <td className='text-center py-5'></td>
                            <td className='text-center py-5'></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
