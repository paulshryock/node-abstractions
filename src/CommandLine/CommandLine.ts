import { FinalClassWasExtended } from '../Exception/Exception.ts'
import { CommandLineOptions as Options } from './CommandLineOptions.ts'
import process from 'node:process'

/**
 * Represents a command line interface for terminal input and output.
 *
 * @throws {FinalClassWasExtended}
 * @alpha
 */
export class CommandLine {
	public options: Options
	public positionalArguments: string[]

	/**
	 * Constructs a command line abstraction.
	 *
	 * @throws {FinalClassWasExtended}
	 * @since  unreleased
	 */
	public constructor() {
		if (new.target !== CommandLine) throw new FinalClassWasExtended(CommandLine)

		const args = process.argv.slice(2)

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
