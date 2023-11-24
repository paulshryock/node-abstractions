/**
 * Stack trace object.
 *
 * @internal
 * @since unreleased
 */
export class StackTrace {
	/**
	 * Stack trace string.
	 *
	 * @since unreleased
	 */
	private readonly stack: string

	/**
	 * Constructs a stack trace.
	 *
	 * @param {string} message Message at top of stack trace.
	 * @param {string} name    Name of object to trace.
	 * @since unreleased
	 */
	public constructor(message: string, name: string = 'Debug') {
		const traceable = { message, name, stack: '' }
		Error.captureStackTrace(traceable)
		this.stack = traceable.stack
	}

	/**
	 * Returns stack trace as a string.
	 *
	 * @return {string} Stack trace represented as a string.
	 * @since  unreleased
	 */
	public toString(): string {
		return `Trace: ${this.stack}`
	}
}
