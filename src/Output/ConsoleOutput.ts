import { stderr, stdout } from 'node:process'
import { Console } from 'node:console'
import { Output } from './Output.ts'

/**
 * Prints program output to stdout and stderr streams.
 *
 * @since 0.1.0
 * @since unreleased - Removed all methods except error.
 * @since unreleased - Added out method.
 * @deprecated
 */
export class ConsoleOutput implements Output {
	/**
	 * Console Output class constructor.
	 *
	 * @param {Console} console Console instance with stdout and stderr streams.
	 * @since 0.1.0
	 */
	public constructor(
		private readonly console: Console = new Console({ stderr, stdout }),
	) {}

	/**
	 * Outputs a message.
	 *
	 * @param  {string}                  message Message to output.
	 * @param  {Record<string, unknown>} context (optional) Message context.
	 * @return {void}
	 * @since  unreleased
	 */
	public out(message: string, context: Record<string, unknown> = {}): void {
		this.console.log(message, context)
	}

	/**
	 * Outputs an error message.
	 *
	 * @param  {string}                  message Message to output.
	 * @param  {Record<string, unknown>} context Message context.
	 * @return {void}
	 * @since  unreleased
	 */
	public error(message: string, context: Record<string, unknown> = {}): void {
		this.console.error(message, context)
	}
}
