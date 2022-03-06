import { Header, IBreadcrumb } from '../components'

const headerHOC = (Element: () => JSX.Element, title: string, breadcrumb: IBreadcrumb[]) => () =>
	(
		<div>
			<Header className='mb-5' title={title} data={[...breadcrumb, { title }]} />
			<Element />
		</div>
	)

export default headerHOC
