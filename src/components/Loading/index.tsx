import { oneOfStyle } from '../../utils/classname-supporter'
import './index.css'

interface LoadingProps {
    size?: 'small' | 'default' | 'extra-small'
}
const Loading = ({ size = 'default' }: LoadingProps) =>
    oneOfStyle(
        size,
        ['default', 'small', 'extra-small'],
        [
            <div key='default' className='loadingio-spinner-eclipse-d3569abucd8'>
                <div className='ldio-u8qu7p7ve3q'>
                    <div></div>
                </div>
            </div>,
            <div key='small' className='loadingio-spinner-eclipse-zpw48soqyc'>
                <div className='ldio-aqawr60gvdv'>
                    <div></div>
                </div>
            </div>,
            <div key='extra-small' className='loadingio-spinner-eclipse-c2706jhodod'>
                <div className='ldio-jvs1rpn1nin'>
                    <div></div>
                </div>
            </div>,
        ]
    )

export default Loading
