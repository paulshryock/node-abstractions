/**
 * Final class which cannot be extended.
 *
 * @internal
 * @since unreleased
 */
export interface FinalClass {
	constructor: {
		name: string
	}
	new (): unknown
}
