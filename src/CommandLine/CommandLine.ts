import { FinalClassWasExtended } from '../Exception/Exception.ts'

/**
 * @throws {FinalClassWasExtended}
 */
export class CommandLine {
	public constructor() {
		if (new.target !== CommandLine)
			throw new FinalClassWasExtended()
	}
}
