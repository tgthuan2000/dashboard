export const cls = (...classes: (string | null | undefined | false)[]): string =>
	classes.filter(Boolean).join(' ')
export const activeCls = (
	active: boolean,
	classActive: string,
	className?: string
): string | undefined => (active ? classActive : className)
