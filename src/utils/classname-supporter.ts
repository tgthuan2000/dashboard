export const cls = (...classes: (string | null | undefined | false)[]): string =>
	classes.filter(Boolean).join(' ')

export const activeCls = (
	active: boolean,
	classActive: string,
	className?: string,
	active2?: boolean
): string | undefined => {
	if (typeof active2 === 'undefined') return active ? classActive : className
	return active2 && active ? className : active ? classActive : undefined
}
