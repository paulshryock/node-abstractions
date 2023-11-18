import { FinalClassWasExtended } from '../Exception/Exception.ts'

/**
 * Represents a command line interface for terminal input and output.
 *
 * @throws {FinalClassWasExtended}
 */
export class CommandLine {
	/**
	 * Constructs a command line abstraction.
	 *
	 * @since unreleased
	 */
	public constructor() {
		if (new.target !== CommandLine)
			throw new FinalClassWasExtended(CommandLine.constructor.name)
	}

	/**
	 * Gets command line arguments.
	 *
	 * @return {string[]} List of arguments from the command line.
	 * @since  unreleased
	 */
	public getArguments(): string[] {
		return []
	}
}
