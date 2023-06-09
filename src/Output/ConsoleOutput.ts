import { Output } from './Output.ts'
import { Console } from 'node:console'
import { stderr, stdout } from 'node:process'

/* eslint @typescript-eslint/no-explicit-any: 0 -- Params can be any. */
/* eslint @typescript-eslint/no-unsafe-argument: 0 -- Console allows any. */

/**
 * Console Output class for printing messages to stdout and stderr streams.
 *
 * @since unreleased
 */
export class ConsoleOutput implements Output {
	/**
	 * Console Output class constructor.
	 *
	 * @since unreleased
	 *
	 * @param {Console} console Console instance which writes to stdout and
	 *                          stderr streams.
	 */
	public constructor(
		private readonly console: Console = new Console({ stderr, stdout }),
	) {}

	/**
	 * Prints an error to stderr stream.
	 *
	 * @since unreleased
	 *
	 * @param {string} message           Message to output.
	 * @param {any[]}  ...optionalParams Optional parameters.
	 */
	public error(message: string, ...optionalParams: any[]): void {
		this.console.error(message, ...optionalParams)
	}

	/**
	 * Prints a warning to stderr stream.
	 *
	 * @since unreleased
	 *
	 * @param {string} message           Message to output.
	 * @param {any[]}  ...optionalParams Optional parameters.
	 */
	public warn(message: string, ...optionalParams: any[]): void {
		this.console.warn(message, ...optionalParams)
	}

	/**
	 * Prints a log message to stdout stream.
	 *
	 * @since unreleased
	 *
	 * @param {string} message           Message to output.
	 * @param {any[]}  ...optionalParams Optional parameters.
	 */
	public log(message: string, ...optionalParams: any[]): void {
		this.console.log(message, ...optionalParams)
	}

	/**
	 * Prints an info message to stdout stream.
	 *
	 * @since unreleased
	 *
	 * @param {string} message           Message to output.
	 * @param {any[]}  ...optionalParams Optional parameters.
	 */
	public info(message: string, ...optionalParams: any[]): void {
		this.console.info(message, ...optionalParams)
	}

	/**
	 * Print a debug message to stdout stream.
	 *
	 * @since unreleased
	 *
	 * @param {string} message           Message to output.
	 * @param {any[]}  ...optionalParams Optional parameters.
	 */
	public debug(message: string, ...optionalParams: any[]): void {
		this.console.debug(message, ...optionalParams)
	}

	/**
	 * Gets the console instance.
	 *
	 * @since  unreleased
	 *
	 * @return {Console}
	 */
	public getConsole(): Console {
		return this.console
	}
}
