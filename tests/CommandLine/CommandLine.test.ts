import { describe, expect, it } from '@jest/globals'
import { CommandLine } from '../../src/CommandLine/CommandLine.ts'
import { FinalClassWasExtended } from '../../src/Exception/Exception.ts'


describe('CommandLine', () => {
	it('should instantiate', () => {
		expect(() => new CommandLine()).not.toThrow()
	})

	it('should not be extensible', () => {
		class MyCommandLine extends CommandLine {}

		expect(() => new MyCommandLine()).toThrow(FinalClassWasExtended)
	})
})
