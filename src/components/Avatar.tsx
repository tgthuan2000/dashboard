import { cls } from '../utils/classname-supporter'

interface AvatarProps {
	src?: string
	alt?: string
	className?: string
}

const Avatar = ({ src, alt = 'U', className }: AvatarProps) => (
	<img
		className={cls(
			'w-8 h-8 rounded-full flex items-center justify-center bg-gray shrink-0',
			className
		)}
		src={src}
		alt={alt}
	/>
)

export default Avatar
