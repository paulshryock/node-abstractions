import { Console } from 'node:console'
import { stderr, stdout } from 'node:process'

/* ConsoleImplementation is a proxy for node:console, which uses any. */
/* eslint-disable @typescript-eslint/no-explicit-any -- node:console */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- node:console */

export interface ConsoleAbstraction {
	error(message?: any, ...optionalParams: any[]): void
	warn(message?: any, ...optionalParams: any[]): void
	log(message?: any, ...optionalParams: any[]): void
	info(message?: any, ...optionalParams: any[]): void
	debug(message?: any, ...optionalParams: any[]): void
}

/**
 * Console abstraction class.
 *
 * @since unreleased
 */
class ConsoleImplementation implements ConsoleAbstraction {
	/**
	 * Console abstraction class constructor.
	 *
	 * @param {Console} nodeConsole
	 * @since unreleased
	 */
	public constructor(
		private readonly nodeConsole: Console = new Console({ stderr, stdout }),
	) {}

	/**
	 * {@inheritDoc node:console#Console.error}
	 *
	 * @since  unreleased
	 * @param  {any}   message
	 * @param  {any[]} ...optionalParams
	 * @return {void}
	 */
	public error(message?: any, ...optionalParams: any[]): void {
		this.nodeConsole.error(message, ...optionalParams)
	}

	/**
	 * The `console.warn()` function is an alias for {@link error}.
	 *
	 * @since  unreleased
	 * @param  {any}   message
	 * @param  {any[]} ...optionalParams
	 * @return {void}
	 */
	public warn(message?: any, ...optionalParams: any[]): void {
		this.nodeConsole.warn(message, ...optionalParams)
	}

	/**
	 * Prints to `stdout` with newline. Multiple arguments can be passed, with
	 * the first used as the primary message and all additional used as
	 * substitution values similar to
	 * [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html)
	 * (the arguments are all passed to `util.format()`).
	 *
	 * ```js
	 * const count = 5;
	 * console.log('count: %d', count);
	 * // Prints: count: 5, to stdout
	 * console.log('count:', count);
	 * // Prints: count: 5, to stdout
	 * ```
	 *
	 * See `util.format()` for more information.
	 *
	 * @since  unreleased
	 * @param  {any}   message
	 * @param  {any[]} ...optionalParams
	 * @return {void}
	 */
	public log(message?: any, ...optionalParams: any[]): void {
		this.nodeConsole.log(message, ...optionalParams)
	}

	/**
	 * The `console.info()` function is an alias for {@link log}.
	 *
	 * @since  unreleased
	 * @param  {any}   message
	 * @param  {any[]} ...optionalParams
	 * @return {void}
	 */
	public info(message?: any, ...optionalParams: any[]): void {
		this.nodeConsole.info(message, ...optionalParams)
	}

	/**
	 * The `console.debug()` function is an alias for {@link log}.
	 *
	 * @since  unreleased
	 * @param  {any}   message
	 * @param  {any[]} ...optionalParams
	 * @return {void}
	 */
	public debug(message?: any, ...optionalParams: any[]): void {
		this.nodeConsole.debug(message, ...optionalParams)
	}
}

/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/no-unsafe-argument */

export { ConsoleImplementation as Console }
