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
	 * @since unreleased
	 * @param {string} message Stringable message.
	 */
	constructor(private message: string) {}

	/**
	 * Converts object to a string.
	 *
	 * @since  unreleased
	 *
	 * @return {string}
	 */
	toString(): string {
		return this.message
	}
}
