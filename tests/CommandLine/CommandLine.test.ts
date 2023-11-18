import { describe, expect, it } from '@jest/globals'
import { CommandLine } from '../../src/CommandLine/CommandLine.ts'
import { FinalClassWasExtended } from '../../src/Exception/Exception.ts'

describe('CommandLine', () => {
	it('should instantiate', () => {
		expect(() => new CommandLine()).not.toThrow()
	})

	it('should not be extensible', () => {
		/** Example of attempting to extend CommandLine. */
		class MyCommandLine extends CommandLine {}

		expect(() => new MyCommandLine()).toThrow(FinalClassWasExtended)
	})

	describe('CommandLine.getArguments()', () => {
		it('should get an empty array if there are no arguments', () => {
			expect(new CommandLine().getArguments()).toStrictEqual([])
		})
	})
})
