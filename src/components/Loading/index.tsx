import './index.css'

interface LoadingProps {
    size?: 'small' | 'default'
}
const Loading = ({ size = 'default' }: LoadingProps) => {
    return size === 'default' ? (
        <div className='loadingio-spinner-eclipse-d3569abucd8'>
            <div className='ldio-u8qu7p7ve3q'>
                <div></div>
            </div>
        </div>
    ) : (
        <div className='loadingio-spinner-eclipse-zpw48soqyc'>
            <div className='ldio-aqawr60gvdv'>
                <div></div>
            </div>
        </div>
    )
}
export default Loading
