import { FinalClassWasExtended } from '../Exception/Exception.ts'

/**
 * Represents a command line interface for terminal input and output.
 *
 * @throws {FinalClassWasExtended}
 * @alpha
 */
export class CommandLine {
	/**
	 * Constructs a command line abstraction.
	 *
	 * @throws {FinalClassWasExtended}
	 * @since  unreleased
	 */
	public constructor() {
		if (new.target !== CommandLine) throw new FinalClassWasExtended(CommandLine)
	}
}
