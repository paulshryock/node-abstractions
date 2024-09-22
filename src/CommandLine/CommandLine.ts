import { Options } from './Options.ts'

/**
 * Means of writing to and reading from the command line.
 *
 * @since 0.2.0
 */
export interface CommandLine {
	/**
	 * All options from the current process, including short and long flags.
	 *
	 * Boolean strings are converted to boolean.
	 *
	 * @since 0.2.0
	 */
	options: Options

	/**
	 * Positional arguments from the current process.
	 *
	 * @since 0.2.0
	 */
	positionalArguments: string[]

	/**
	 * Prints question to output stream and reads answer from input stream.
	 *
	 * @param  {string}          question Question to print to output stream.
	 * @return {Promise<string>}          Answer read from input stream.
	 * @since  0.2.0
	 */
	ask(question: string): Promise<string>

	/**
	 * Writes message to output stream. Optionally includes a stack trace.
	 *
	 * @param  {string}                   message Message for output stream.
	 * @param  {CommandLineOutputOptions} options Output options.
	 * @return {void}
	 * @since 0.2.0
	 */
	out(message: string, options?: CommandLineOutputOptions): void

	/**
	 * Writes error message to error stream. Optionally includes a stack trace.
	 *
	 * @param  {Error}                    error   Error for error stream.
	 * @param  {CommandLineOutputOptions} options Output options.
	 * @return {void}
	 * @since  0.2.0
	 */
	error(error: Error, options?: CommandLineOutputOptions): void
}

/**
 * Output options for IO methods.
 *
 * @since 0.2.0
 */
export type CommandLineOutputOptions = {
	trace: boolean
}
