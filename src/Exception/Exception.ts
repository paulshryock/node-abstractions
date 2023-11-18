/**
 * Exception.
 *
 * @since 0.1.1
 */
export class Exception extends Error {}

/**
 * Final class was extended extension.
 *
 * @since unreleased
 */
export class FinalClassWasExtended extends Exception {
	/**
	 * Constructs a FinalClassWasExtended exception.
	 *
	 * @param {string} constructor Final class constructor name.
	 * @since unreleased
	 */
	public constructor(constructor: string) {
		super(`Final class ${constructor} may not be extended.`)
	}
}
