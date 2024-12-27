/**
 * Final class which cannot be extended.
 *
 * @internal
 *
 * @since 0.3.0
 */
export interface FinalClass {
	constructor: {
		name: string
	}
	new (): unknown
}
