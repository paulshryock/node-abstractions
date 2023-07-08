import { Output } from './Output.ts'
import { Stringable } from '../Stringable/Stringable.ts'
import { Console } from 'node:console'
import { stderr, stdout } from 'node:process'

/* eslint @typescript-eslint/no-explicit-any: 0 -- Params can be any. */
/* eslint @typescript-eslint/no-unsafe-argument: 0 -- Console allows any. */

/**
 * Console Output class for printing messages to stdout and stderr streams.
 *
 * @since 0.1.0
 */
export class ConsoleOutput implements Output {
	/**
	 * Console Output class constructor.
	 *
	 * @since 0.1.0
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
	 * @since 0.1.0
	 * @since unreleased - Allow first param to be Stringable.
	 *
	 * @param {string | Stringable} message           Message to output.
	 * @param {any[]}               ...optionalParams Optional parameters.
	 */
	public error(message: string | Stringable, ...optionalParams: any[]): void {
		this.console.error(message.toString(), ...optionalParams)
	}

	/**
	 * Prints a warning to stderr stream.
	 *
	 * @since 0.1.0
	 * @since unreleased - Allow first param to be Stringable.
	 *
	 * @param {string | Stringable} message           Message to output.
	 * @param {any[]}               ...optionalParams Optional parameters.
	 */
	public warn(message: string | Stringable, ...optionalParams: any[]): void {
		this.console.warn(message.toString(), ...optionalParams)
	}

	/**
	 * Prints a log message to stdout stream.
	 *
	 * @since 0.1.0
	 * @since unreleased - Allow first param to be Stringable.
	 *
	 * @param {string | Stringable} message           Message to output.
	 * @param {any[]}               ...optionalParams Optional parameters.
	 */
	public log(message: string | Stringable, ...optionalParams: any[]): void {
		this.console.log(message.toString(), ...optionalParams)
	}

	/**
	 * Prints an info message to stdout stream.
	 *
	 * @since 0.1.0
	 * @since unreleased - Allow first param to be Stringable.
	 *
	 * @param {string | Stringable} message           Message to output.
	 * @param {any[]}               ...optionalParams Optional parameters.
	 */
	public info(message: string | Stringable, ...optionalParams: any[]): void {
		this.console.info(message.toString(), ...optionalParams)
	}

	/**
	 * Print a debug message to stdout stream.
	 *
	 * @since 0.1.0
	 * @since unreleased - Allow first param to be Stringable.
	 *
	 * @param {string | Stringable} message           Message to output.
	 * @param {any[]}               ...optionalParams Optional parameters.
	 */
	public debug(message: string | Stringable, ...optionalParams: any[]): void {
		this.console.debug(message.toString(), ...optionalParams)
	}

	/**
	 * Gets the console instance.
	 *
	 * @since  0.1.0
	 *
	 * @return {Console}
	 */
	public getConsole(): Console {
		return this.console
	}
}
