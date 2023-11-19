import { describe, expect, it } from '@jest/globals'
import { CommandLine } from '../../src/CommandLine/CommandLine.ts'
import { FinalClassWasExtended } from '../../src/Exception/Exception.ts'

describe('CommandLine', () => {
	it('should instantiate', () => {
		expect(() => new CommandLine()).not.toThrow()
	})

	it('should not be extensible', () => {
		expect(() => new (class extends CommandLine {})()).toThrow(
			FinalClassWasExtended,
		)
	})
})

describe('CommandLine.getPositionalArguments()', () => {
	it.todo('should get positional arguments')
})

describe('CommandLine.getOptions(Options)', () => {
	describe('when default values are not set', () => {
		it.todo('should only get available options')
	})

	describe('when default values are set', () => {
		it.todo('should get available options')
		it.todo('should get default values for unavailable options')
	})
})

describe('CommandLine.ask(Question)', () => {
	it.todo('should write a question to stdout')
	it.todo('should return an answer from stdin')
})

describe('CommandLine.out(message)', () => {
	it.todo('should write a message to stdout')
})

describe('CommandLine.out(message, { trace: true })', () => {
	it.todo('should write a stack trace to stdout')
})

describe('CommandLine.error(Error)', () => {
	it.todo('should write an Error message to stderr')
})

describe('CommandLine.error(Error, { trace: true })', () => {
	it.todo('should write a stack trace to stderr')
})
