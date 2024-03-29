/**
 * Iterable entries.
 *
 * @internal
 * @since unreleased
 */
export type Entries = ReturnType<
	(FormData | Headers | URLSearchParams)['entries']
>

/**
 * Final class.
 *
 * @internal
 * @alpha
 * @since unreleased
 */
export interface FinalClass {
	constructor: {
		name: string
	}
	new (): unknown
}
