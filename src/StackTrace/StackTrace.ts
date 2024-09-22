/**
 * Stack trace object.
 *
 * @since 0.2.0
 */
export class StackTrace {
	/**
	 * Stack trace string.
	 *
	 * @since 0.2.0
	 */
	readonly #stack: string

	/**
	 * Constructs a stack trace.
	 *
	 * @param {string} message Message at top of stack trace.
	 * @param {string} name    Name of object to trace.
	 * @since 0.2.0
	 */
	public constructor(message: string, name: string = 'Debug') {
		const traceable = { message, name, stack: '' }
		Error.captureStackTrace(traceable)
		this.#stack = traceable.stack
	}

	/**
	 * Returns stack trace as a string.
	 *
	 * @return {string} Stack trace represented as a string.
	 * @since  0.2.0
	 */
	public toString(): string {
		return `Trace: ${this.#stack}`
	}
}
