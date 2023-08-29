import { Stringable } from './Stringable.ts'

/**
 * Object whose constructor takes a message and returns it from toString
 * method.
 *
 * @since unreleased
 */
export class MessageStringable implements Stringable {
	/**
	 * MessageStringable class constructor.
	 *
	 * @param {string} message Message to return from toString method.
	 * @since unreleased
	 */
	constructor(private message: string) {}

	/**
	 * Converts object to a string.
	 *
	 * @return {string} String representation of the object.
	 * @since  unreleased
	 */
	toString(): string {
		return this.message
	}
}
