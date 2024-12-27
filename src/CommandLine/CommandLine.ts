import * as readline from 'node:readline/promises'
import { Streams, STREAMS } from './Streams.ts'
import { argv } from 'node:process'
import { Console } from 'node:console'
import { FinalClassWasExtended } from '../Exception/Exception.ts'
import { Options } from './Options.ts'
import { PositionalArguments } from './PositionalArguments.ts'

/**
 * Reads and writes messages to and from the command line.
 *
 * @since 0.2.0 - Named LocalCommandLine.
 * @since unreleased - Renamed to CommandLine.
 */
export class CommandLine {
	/**
	 * Console interface for writing to the console.
	 *
	 * @since 0.2.0
	 */
	readonly #console: Console

	/**
	 * Input, output, and error streams.
	 *
	 * @since 0.2.0
	 */
	readonly #streams: Streams

	/**
	 * All short and long options from the current process.
	 *
	 * Boolean strings ('true'|'false') are converted to boolean.
	 *
	 * @since 0.2.0
	 */
	public readonly options: Record<string, boolean | number | string>

	/**
	 * Positional arguments from the current process.
	 *
	 * @since 0.2.0
	 */
	public readonly positionalArguments: string[]

	/**
	 * Constructs a command line interface abstraction.
	 *
	 * @param {Streams} streams Command line interface streams.
	 * @throws {FinalClassWasExtended}
	 * @since  0.2.0
	 */
	public constructor(streams: Streams = STREAMS) {
		if (new.target !== CommandLine) throw new FinalClassWasExtended(CommandLine)

		this.#streams = streams
		const { stderr, stdout } = this.#streams
		this.#console = new Console({ stderr, stdout })

		const args = argv.slice(2)
		this.options = new Options(args).toRecord()
		this.positionalArguments = new PositionalArguments(args).toArray()
	}

	/**
	 * Prints question to output stream and reads answer from input stream.
	 *
	 * @param  {string}          question Question to print to output stream.
	 * @return {Promise<string>}          Answer read from input stream.
	 * @since  0.2.0
	 */
	public async ask(question: string): Promise<string> {
		const { stdin: input, stdout: output } = this.#streams
		const rl = readline.createInterface({ input, output })

		const answer = await rl.question(`${question} `)
		rl.close()

		return answer
	}

	/**
	 * Writes message to output stream. Optionally includes a stack trace.
	 *
	 * @param  {string}                   message Message for output stream.
	 * @param  {CommandLineOutputOptions} options Output options.
	 * @return {void}
	 * @since  0.2.0
	 */
	public out(message: string, options?: CommandLineOutputOptions): void {
		/**
		 * Utility class for generating a stack trace.
		 *
		 * **Non-standard**: This feature is non-standard and is not on a standards
		 * track. Do not use it on production sites facing the Web: it will not
		 * work for every user. There may also be large incompatibilities between
		 * implementations and the behavior may change in the future.
		 *
		 * **Note**: The `stack` property is de facto implemented by all major
		 * JavaScript engines, and [the JavaScript standards committee is looking
		 * to standardize it](https://github.com/tc39/proposal-error-stacks). You
		 * cannot rely on the precise content of the stack string due to
		 * implementation inconsistencies, but you can generally assume it exists
		 * and use it for debugging purposes.
		 *
		 * @see   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack
		 * @since unreleased
		 */
		class Trace extends Error {
			/**
			 * Constructs a Trace instance.
			 *
			 * @param {string} message A human-readable description of the error.
			 * @since unreleased
			 */
			public constructor(message: string) {
				super(message)
				this.name = this.constructor.name
			}
		}

		const output = options?.trace ? new Trace(message).stack : message

		this.#console.log(output)
	}

	/**
	 * Writes error message to error stream. Optionally includes a stack trace.
	 *
	 * @param  {string}                   message Error message for error stream.
	 * @param  {CommandLineOutputOptions} options Output options.
	 * @return {void}
	 * @since  0.2.0
	 * @since  unreleased - Changed first argument from `Error` to `string`.
	 */
	public error(message: string, options?: CommandLineOutputOptions): void {
		this.#console[options?.trace ? 'trace' : 'error'](message)
	}
}

/**
 * Output options for IO methods.
 *
 * @since 0.2.0
 */
export type CommandLineOutputOptions = {
	/** Whether or not to include a stack trace. */
	trace: boolean
}
