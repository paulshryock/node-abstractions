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
	 * @param  {string | Stringable} message        Message to output.
	 * @param  {any[]}               optionalParams Optional parameters.
	 * @return {void}
	 * @since 0.1.0
	 * @since 0.1.1 - Allow first param to be Stringable.
	 */
	error(message: string | Stringable, ...optionalParams: any[]): void

	/**
	 * Prints a warning to an error stream.
	 *
	 * @param  {string | Stringable} message        Message to output.
	 * @param  {any[]}               optionalParams Optional parameters.
	 * @return {void}
	 * @since 0.1.0
	 * @since 0.1.1 - Allow first param to be Stringable.
	 */
	warn(message: string | Stringable, ...optionalParams: any[]): void

	/**
	 * Prints a log message to an output stream.
	 *
	 * @param  {string | Stringable} message        Message to output.
	 * @param  {any[]}               optionalParams Optional parameters.
	 * @return {void}
	 * @since 0.1.0
	 * @since 0.1.1 - Allow first param to be Stringable.
	 */
	log(message: string | Stringable, ...optionalParams: any[]): void

	/**
	 * Prints an info message to an output stream.
	 *
	 * @param  {string | Stringable} message        Message to output.
	 * @param  {any[]}               optionalParams Optional parameters.
	 * @return {void}
	 * @since 0.1.0
	 * @since 0.1.1 - Allow first param to be Stringable.
	 */
	info(message: string | Stringable, ...optionalParams: any[]): void

	/**
	 * Print a debug message to an output stream.
	 *
	 * @param  {string | Stringable} message        Message to output.
	 * @param  {any[]}               optionalParams Optional parameters.
	 * @return {void}
	 * @since 0.1.0
	 * @since 0.1.1 - Allow first param to be Stringable.
	 */
	debug(message: string | Stringable, ...optionalParams: any[]): void
}
