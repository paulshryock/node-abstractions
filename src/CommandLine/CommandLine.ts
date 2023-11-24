import * as readline from 'node:readline/promises'
import { IO, OutputOptions } from '../IO/IO.ts'
import {
	CommandLineOptions as Options,
	CommandLineStreams as Streams,
	COMMAND_LINE_STREAMS as STREAMS,
} from './utilities.ts'
import { argv } from 'node:process'
import { Console } from 'node:console'
import { FinalClassWasExtended } from '../Exception/Exception.ts'
import { StackTrace } from '../StackTrace/StackTrace.ts'

/**
 * Represents a command line interface for terminal input and output.
 *
 * @throws {FinalClassWasExtended}
 * @alpha
 */
export class CommandLine implements IO {
	/**
	 * Console interface for writing to the console.
	 *
	 * @since unreleased
	 */
	private readonly console: Console

	/**
	 * All options from command line process, including short and long flags.
	 *
	 * Boolean strings are converted to boolean.
	 *
	 * @since unreleased
	 */
	public readonly options: Options

	/**
	 * Positional arguments from command line process.
	 *
	 * @since unreleased
	 */
	public readonly positionalArguments: string[]

	/**
	 * Constructs a command line interface abstraction.
	 *
	 * @param {Streams} streams (optional) Command line interface streams.
	 * @throws {FinalClassWasExtended}
	 * @since  unreleased
	 */
	public constructor(private readonly streams: Streams = STREAMS) {
		if (new.target !== CommandLine) throw new FinalClassWasExtended(CommandLine)

		const { stderr, stdout } = this.streams
		this.console = new Console({ stderr, stdout })

		const args = argv.slice(2)
		this.options = new Options(args)
		this.positionalArguments = args.reduce(
			(allArgs: string[], currentArg: string, index: number) =>
				this.isPositionalArg(currentArg, index, args)
					? [...allArgs, currentArg]
					: allArgs,
			[],
		)
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

	/**
	 * Checks whether an arg at a given index is a positional arg.
	 *
	 * @internal
	 * @param  {string}   arg   Argument to check.
	 * @param  {number}   index Index of argument to check.
	 * @param  {string[]} args  All arguments.
	 * @return {boolean}        Whether the argument is a positional arg.
	 * @since  unreleased
	 * @todo   Refactor.
	 */
	private isPositionalArg(arg: string, index: number, args: string[]): boolean {
		const previousArg = args[index - 1]

		return !(
			arg.startsWith('-') ||
			(previousArg?.startsWith('-') && !previousArg.includes('='))
		)
	}
}
