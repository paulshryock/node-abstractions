import process from 'node:process'

/**
 * Stringifies an object for a written test case.
 *
 * @param  {typeof process.env} obj Object to stringify.
 * @return {string}                 Stringified object.
 * @since  0.1.3
 */
export function stringifyObject(obj: typeof process.env): string {
	return `{ ${Object.entries(obj).map(stringifyEntry).join(', ')} }`
}

/**
 * Stringifies entries for a written test case.
 *
 * @param  {[key: string, value: string | undefined]} entry Test case entry.
 * @return {string}                                         Stringified entry.
 * @since  0.1.3
 */
function stringifyEntry(
	entry: [key: string, value: string | undefined],
): string {
	const [key, value] = entry

	return `${key}: ${typeof value === 'undefined' ? value : `"${value}"`}`
}
