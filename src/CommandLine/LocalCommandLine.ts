import * as readline from 'node:readline/promises'
import { CommandLine, CommandLineOutputOptions } from './CommandLine.ts'
import { Streams, STREAMS } from './Streams.ts'
import { argv } from 'node:process'
import { Console } from 'node:console'
import { FinalClassWasExtended } from '../Exception/Exception.ts'
import { Options } from './Options.ts'
import { PositionalArguments } from './PositionalArguments.ts'
import { StackTrace } from '../StackTrace/StackTrace.ts'

/**
 * Means of writing to and reading from the command line.
 *
 * @throws {FinalClassWasExtended}
 * @alpha
 * @since  unreleased
 */
export class LocalCommandLine implements CommandLine {
	/**
	 * Console interface for writing to the console.
	 *
	 * @since unreleased
	 */
	readonly #console: Console

	/**
	 * Input, output, and error streams.
	 *
	 * @since unreleased
	 */
	readonly #streams: Streams

	/**
	 * All options from the current process, including short and long flags.
	 *
	 * Boolean strings are converted to boolean.
	 *
	 * @since unreleased
	 */
	public readonly options: Options

	/**
	 * Positional arguments from the current process.
	 *
	 * @since unreleased
	 */
	public readonly positionalArguments: string[]

	/**
	 * Constructs a command line interface abstraction.
	 *
	 * @param {Streams} streams Command line interface streams.
	 * @throws {FinalClassWasExtended}
	 * @since  unreleased
	 */
	public constructor(streams: Streams = STREAMS) {
		if (new.target !== LocalCommandLine)
			throw new FinalClassWasExtended(LocalCommandLine)

		this.#streams = streams
		const { stderr, stdout } = this.#streams
		this.#console = new Console({ stderr, stdout })

		const args = argv.slice(2)
		this.options = new Options(args)
		this.positionalArguments = new PositionalArguments(args).toArray()
	}

	/**
	 * Prints question to output stream and reads answer from input stream.
	 *
	 * @param  {string}          question Question to print to output stream.
	 * @return {Promise<string>}          Answer read from input stream.
	 * @since  unreleased
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
	 * @since  unreleased
	 */
	public out(message: string, options?: CommandLineOutputOptions): void {
		const output = options?.trace ? new StackTrace(message).toString() : message

		this.#console.log(output)
	}

	/**
	 * Writes error message to error stream. Optionally includes a stack trace.
	 *
	 * @param  {Error}                    error   Error for error stream.
	 * @param  {CommandLineOutputOptions} options Output options.
	 * @return {void}
	 * @since  unreleased
	 */
	public error(error: Error, options?: CommandLineOutputOptions): void {
		const method = options?.trace ? 'trace' : 'error'
		const message = `${error.name}: ${error.message}`

		this.#console[method](message)
	}
}
