import { Options } from './Options.ts'

/**
 * Means of writing to and reading from the command line.
 *
 * @since unreleased
 */
export interface CommandLine {
	/**
	 * All options from the current process, including short and long flags.
	 *
	 * Boolean strings are converted to boolean.
	 *
	 * @since unreleased
	 */
	options: Options

	/**
	 * Positional arguments from the current process.
	 *
	 * @since unreleased
	 */
	positionalArguments: string[]

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
	 * @param  {string}                   message Message for output stream.
	 * @param  {CommandLineOutputOptions} options Output options.
	 * @return {void}
	 * @since unreleased
	 */
	out(message: string, options?: CommandLineOutputOptions): void

	/**
	 * Writes error message to error stream. Optionally includes a stack trace.
	 *
	 * @param  {Error}                    error   Error for error stream.
	 * @param  {CommandLineOutputOptions} options Output options.
	 * @return {void}
	 * @since  unreleased
	 */
	error(error: Error, options?: CommandLineOutputOptions): void
}

/**
 * Output options for IO methods.
 *
 * @since unreleased
 */
export type CommandLineOutputOptions = {
	trace: boolean
}
