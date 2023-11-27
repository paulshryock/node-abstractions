import * as readline from 'node:readline/promises'
import { argv, stderr, stdin, stdout } from 'node:process'
import { Console } from 'node:console'
import { Duplex } from 'node:stream'
import { FinalClassWasExtended } from '../Exception/Exception.ts'
import { Options } from './Options.ts'
import { PositionalArguments } from './PositionalArguments.ts'
import { StackTrace } from '../StackTrace/StackTrace.ts'

/**
 * Command line interface streams.
 *
 * @since unreleased
 */
export type Streams = {
	stderr: Duplex
	stdin: Duplex
	stdout: Duplex
}

/**
 * Default command line interface streams.
 *
 * @since unreleased
 */
export const STREAMS: Streams = {
	stderr,
	stdin,
	stdout,
}

/**
 * Means of writing to and reading from the command line.
 *
 * @throws {FinalClassWasExtended}
 * @alpha
 */
export class CommandLine {
	/**
	 * Console interface for writing to the console.
	 *
	 * @since unreleased
	 */
	private readonly console: Console

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
	public constructor(private readonly streams: Streams = STREAMS) {
		if (new.target !== CommandLine) throw new FinalClassWasExtended(CommandLine)

		const { stderr, stdout } = this.streams
		this.console = new Console({ stderr, stdout })

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
		const { stdin: input, stdout: output } = this.streams
		const rl = readline.createInterface({ input, output })

		const answer = await rl.question(`${question} `)
		rl.close()

		return answer
	}

	/**
	 * Writes message to output stream. Optionally includes a stack trace.
	 *
	 * @param  {string}        message Message to write to output stream.
	 * @param  {OutputOptions} options Output options.
	 * @return {void}
	 * @since unreleased
	 */
	public out(message: string, options?: OutputOptions): void {
		const output = options?.trace ? new StackTrace(message).toString() : message

		this.console.log(output)
	}

	/**
	 * Writes error message to error stream. Optionally includes a stack trace.
	 *
	 * @param  {Error}         error   Error to write to error stream.
	 * @param  {OutputOptions} options Output options.
	 * @return {void}
	 * @since  unreleased
	 */
	public error(error: Error, options?: OutputOptions): void {
		const method = options?.trace ? 'trace' : 'error'
		const message = `${error.name}: ${error.message}`

		this.console[method](message)
	}
}

/**
 * Output options for IO methods.
 *
 * @since unreleased
 */
export type OutputOptions = {
	trace: boolean
}
