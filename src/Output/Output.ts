import { Stringable } from '../Stringable/Stringable.ts'

/**
 * Program output.
 *
 * @since 0.1.0
 * @since unreleased - Removed all methods except error.
 * @since unreleased - Added out method.
 */
export interface Output {
	/**
	 * Outputs a message.
	 *
	 * @param  {string | Stringable}     message Message to output.
	 * @param  {Record<string, unknown>} context Message context.
	 * @return {void}
	 * @since unreleased
	 */
	out(message: string | Stringable, context: Record<string, unknown>): void

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
	error(message: string | Stringable, context: Record<string, unknown>): void
}
