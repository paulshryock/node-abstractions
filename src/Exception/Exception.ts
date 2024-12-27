import { FinalClass } from '../utilities/primitives.ts'

/**
 * Options for the parent constructor containing an optional cause.
 *
 * @since 0.3.0
 */
type ErrorOptions = {
	/** The error that caused the newly created error. */
	cause?: unknown
}

/**
 * An exception breaks the normal flow of execution and executes a
 * pre-registered exception handler.
 *
 * @see   https://en.wikipedia.org/wiki/Exception_handling
 * @since 0.1.1
 */
export class Exception extends Error {
	/**
	 * Constructs an exception.
	 *
	 * @param {string|undefined}       message Human-readable description.
	 * @param {ErrorOptions|undefined} options Options with an optional cause.
	 * @since 0.3.0
	 */
	public constructor(message?: string, options?: ErrorOptions) {
		super(message, options)

		this.name = new.target.name
	}
}

/**
 * Final class was extended extension.
 *
 * @since 0.2.0
 */
export class FinalClassWasExtended extends Exception {
	public readonly finalClass: string

	/**
	 * Constructs a FinalClassWasExtended exception.
	 *
	 * @param {string} finalClass Final class which was extended.
	 * @since 0.2.0
	 */
	public constructor(finalClass: FinalClass) {
		super(`Final class ${finalClass.name} may not be extended.`)

		this.finalClass = finalClass.name
	}
}
