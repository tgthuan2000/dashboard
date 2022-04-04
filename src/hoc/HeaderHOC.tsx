import { Header, IBreadcrumb } from '../components'
import { Helmet } from 'react-helmet-async'

const headerHOC =
    (Element: () => JSX.Element, title: string, breadcrumb: IBreadcrumb[] = []) =>
    () =>
        (
            <div>
                <Helmet>
                    <title>
                        {breadcrumb.map(({ title }) => title).join(' | ')} | {title}
                    </title>
                </Helmet>
                <Header className='mb-5' title={title} data={[...breadcrumb, { title }]} />
                <Element />
            </div>
        )

export default headerHOC
