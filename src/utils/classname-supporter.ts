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

export const activeStyleByZero = (
	typeCheck: number | string,
	equalZero: string,
	lessThanZero?: string,
	greaterThanZero?: string
) => {
	if (typeCheck == 0) return equalZero
	if (typeCheck < 0) return lessThanZero
	return greaterThanZero
}

export const oneOfStyle = (input: string, checkValues: string[], activeValues: string[]) => {
	if (checkValues.length !== activeValues.length)
		throw Error('Variable checkValues not same length with activeValues')
	const index = checkValues.findIndex((value) => value === input)
	return index != -1 ? activeValues[index] : undefined
}
