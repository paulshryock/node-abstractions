/**
 * Program output.
 *
 * @since unreleased
 * @deprecated
 */
export interface Output {
	/**
	 * Outputs a message.
	 *
	 * @param  {string}                  message Message to output.
	 * @param  {Record<string, unknown>} context Message context.
	 * @return {void}
	 * @since  unreleased
	 */
	out(message: string, context: Record<string, unknown>): void

	/**
	 * Outputs an error message.
	 *
	 * @param  {string}                  message Message to output.
	 * @param  {Record<string, unknown>} context Message context.
	 * @return {void}
	 * @since  unreleased
	 */
	error(message: string, context: Record<string, unknown>): void
}
