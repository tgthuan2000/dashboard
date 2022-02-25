import { Card } from '.'
import { dataCardAnalytics } from '../../../constants'
import { cls } from '../../../utils/classname-supporter'

type CardListProps = {
	className?: string
}

const CardList = ({ className }: CardListProps) => (
	<div className={cls('grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6', className)}>
		{dataCardAnalytics.map((props) => (
			<Card key={props.title} {...props} />
		))}
	</div>
)

export default CardList
