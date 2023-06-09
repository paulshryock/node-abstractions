import { Stringable } from '../Stringable/Stringable.ts'

/* eslint @typescript-eslint/no-explicit-any: 0 -- Params can be anything. */

/**
 * Output abstraction for printing messages to output and error streams.
 *
 * @since 0.1.0
 */
export interface Output {
	/**
	 * Prints an error to an error stream.
	 *
	 * @since 0.1.0
	 *
	 * @param {string | Stringable} message           Message to output.
	 * @param {any[]}               ...optionalParams Optional parameters.
	 */
	error(message: string | Stringable, ...optionalParams: any[]): void

	/**
	 * Prints a warning to an error stream.
	 *
	 * @since 0.1.0
	 *
	 * @param {string | Stringable} message           Message to output.
	 * @param {any[]}               ...optionalParams Optional parameters.
	 */
	warn(message: string | Stringable, ...optionalParams: any[]): void

	/**
	 * Prints a log message to an output stream.
	 *
	 * @since 0.1.0
	 *
	 * @param {string | Stringable} message           Message to output.
	 * @param {any[]}               ...optionalParams Optional parameters.
	 */
	log(message: string | Stringable, ...optionalParams: any[]): void

	/**
	 * Prints an info message to an output stream.
	 *
	 * @since 0.1.0
	 *
	 * @param {string | Stringable} message           Message to output.
	 * @param {any[]}               ...optionalParams Optional parameters.
	 */
	info(message: string | Stringable, ...optionalParams: any[]): void

	/**
	 * Print a debug message to an output stream.
	 *
	 * @since 0.1.0
	 *
	 * @param {string | Stringable} message           Message to output.
	 * @param {any[]}               ...optionalParams Optional parameters.
	 */
	debug(message: string | Stringable, ...optionalParams: any[]): void
}
