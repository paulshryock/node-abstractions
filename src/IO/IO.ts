/**
 * Means of writing to and reading from input, output, and error streams.
 *
 * @since unreleased
 */
export interface IO {
	/**
	 * Prints question to output stream and reads answer from input stream.
	 *
	 * @param  {string}          question Question to print to output stream.
	 * @return {Promise<string>}          Answer read from input stream.
	 * @since  unreleased
	 */
	ask(question: string): Promise<string>

	/**
	 * Writes message to output stream. Optionally includes a stack trace.
	 *
	 * @param  {string}        message Message to write to output stream.
	 * @param  {OutputOptions} options Output options.
	 * @return {void}
	 * @since unreleased
	 */
	out(message: string, options?: OutputOptions): void

	/**
	 * Writes error message to error stream. Optionally includes a stack trace.
	 *
	 * @param  {Error}         error   Error to write to error stream.
	 * @param  {OutputOptions} options Output options.
	 * @return {void}
	 * @since  unreleased
	 */
	error(error: Error, options?: OutputOptions): void
}

/**
 * Output options for IO methods.
 *
 * @since unreleased
 */
export type OutputOptions = {
	trace: boolean
}
