import { Stringable } from './Stringable.ts'

/**
 * Object whose constructor takes a message and returns it from toString
 * method.
 *
 * @since 0.1.1
 */
export class MessageStringable implements Stringable {
	/**
	 * MessageStringable class constructor.
	 *
	 * @param {string} message Message to return from toString method.
	 * @since 0.1.1
	 */
	constructor(private message: string) {}

	/**
	 * Converts object to a string.
	 *
	 * @return {string} String representation of the object.
	 * @since  0.1.1
	 */
	toString(): string {
		return this.message
	}
}
