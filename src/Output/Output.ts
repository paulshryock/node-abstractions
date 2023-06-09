/* eslint @typescript-eslint/no-explicit-any: 0 -- Params can be anything. */

/**
 * Output abstraction for printing messages to output and error streams.
 *
 * @since unreleased
 */
export interface Output {
	/**
	 * Prints an error to an error stream.
	 *
	 * @since unreleased
	 *
	 * @param {string} message           Message to output.
	 * @param {any[]}  ...optionalParams Optional parameters.
	 */
	error(message: string, ...optionalParams: any[]): void

	/**
	 * Prints a warning to an error stream.
	 *
	 * @since unreleased
	 *
	 * @param {string} message           Message to output.
	 * @param {any[]}  ...optionalParams Optional parameters.
	 */
	warn(message: string, ...optionalParams: any[]): void

	/**
	 * Prints a log message to an output stream.
	 *
	 * @since unreleased
	 *
	 * @param {string} message           Message to output.
	 * @param {any[]}  ...optionalParams Optional parameters.
	 */
	log(message: string, ...optionalParams: any[]): void

	/**
	 * Prints an info message to an output stream.
	 *
	 * @since unreleased
	 *
	 * @param {string} message           Message to output.
	 * @param {any[]}  ...optionalParams Optional parameters.
	 */
	info(message: string, ...optionalParams: any[]): void

	/**
	 * Print a debug message to an output stream.
	 *
	 * @since unreleased
	 *
	 * @param {string} message           Message to output.
	 * @param {any[]}  ...optionalParams Optional parameters.
	 */
	debug(message: string, ...optionalParams: any[]): void
}
