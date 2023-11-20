import { argv, stderr, stdout } from 'node:process'
import { Console } from 'node:console'
import { FinalClassWasExtended } from '../Exception/Exception.ts'
import { CommandLineOptions as Options } from './CommandLineOptions.ts'

/**
 * Represents a command line interface for terminal input and output.
 *
 * @throws {FinalClassWasExtended}
 * @alpha
 */
export class CommandLine {
	/**
	 * All options from command line process, including short and long flags.
	 *
	 * Boolean strings are converted to boolean.
	 *
	 * @since unreleased
	 */
	public options: Options

	/**
	 * Positional arguments from command line process.
	 *
	 * @since unreleased
	 */
	public positionalArguments: string[]

	/**
	 * Constructs a command line interface abstraction.
	 *
	 * @param {Console} console Debugging console which writes to streams.
	 * @throws {FinalClassWasExtended}
	 * @since  unreleased
	 */
	public constructor(
		private console: Console = new Console({ stderr, stdout }),
	) {
		if (new.target !== CommandLine) throw new FinalClassWasExtended(CommandLine)

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
	 * Writes a message to stdout.
	 *
	 * @param  {string} message Message to write to stdout.
	 * @return {void}
	 * @since unreleased
	 */
	public out(message: string): void {
		this.console.log(message)
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
