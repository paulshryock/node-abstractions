import { stderr, stdout } from 'node:process'
import { Console } from 'node:console'
import { Output } from './Output.ts'
import { Stringable } from '../Stringable/Stringable.ts'

/**
 * Prints program output to stdout and stderr streams.
 *
 * @since 0.1.0
 * @since unreleased - Removed all methods except error.
 * @since unreleased - Added out method.
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
	 * @param  {string | Stringable}     message Message to output.
	 * @param  {Record<string, unknown>} context (optional) Message context.
	 * @return {void}
	 * @since unreleased
	 */
	public out(
		message: string | Stringable,
		context: Record<string, unknown> = {},
	): void {
		this.console.log(this.interpolate(message.toString(), context))
	}

	/**
	 * Outputs an error message.
	 *
	 * @param  {string | Stringable}     message Message to output.
	 * @param  {Record<string, unknown>} context Message context.
	 * @return {void}
	 * @since 0.1.0
	 * @since 0.1.1 - Allow first parameter to be Stringable.
	 * @since unreleased - Changed second parameter to Record.
	 */
	public error(
		message: string | Stringable,
		context: Record<string, unknown> = {},
	): void {
		this.console.error(this.interpolate(message.toString(), context))
	}

	/**
	 * Interpolates a string with values from a context object.
	 *
	 * @param  {string | Stringable}     message Message to output.
	 * @param  {Record<string, unknown>} context Message context.
	 * @return {string}                          Interpolated message.
	 * @since  unreleased
	 */
	private interpolate(
		message: string,
		context: Record<string, unknown>,
	): string {
		return message.replaceAll(/(?<match>\{[^}]+\})/gu, (match) => {
			const param = match.replaceAll(/(?<curly>^\{|\}$)/gu, '')

			return context[param]?.toString() ?? match
		})
	}
}
