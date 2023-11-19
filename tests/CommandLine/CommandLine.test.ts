import { afterAll, beforeEach, describe, expect, it } from '@jest/globals'
import { CommandLine } from '../../src/CommandLine/CommandLine.ts'
import process from 'node:process'

const processArgv = process.argv

afterAll(() => {
	process.argv = processArgv
})

describe('CommandLine', () => {
	it('should instantiate', () => {
		expect(() => new CommandLine()).not.toThrow()
	})

	it('should not be extensible', () => {
		expect(() => new (class extends CommandLine {})()).toThrow(Error)
	})

	type TestCase = {
		argv: string[]
		options: Record<string, string | boolean>
		positionalArguments: string[]
	}

	describe.each([
		['with no arguments', { argv: [], options: {}, positionalArguments: [] }],
		[
			'with positional arguments',
			{
				argv: ['hello', 'world'],
				options: {},
				positionalArguments: ['hello', 'world'],
			},
		],
		[
			'with flags',
			{
				argv: ['-a', 'hello', '-bc', 'world', '-d', 'true'],
				options: { a: 'hello', b: true, c: 'world', d: true },
				positionalArguments: [],
			},
		],
		[
			'with options',
			{
				argv: ['--a', '--b=hello', '--c', 'world', '--d', 'false'],
				options: { a: true, b: 'hello', c: 'world', d: false },
				positionalArguments: [],
			},
		],
		[
			'with all kinds of arguments',
			{
				argv: ['a', '-b', '-c', 'd', '-ef', '-gh', 'i', '--j', '--k', 'l', 'm'],
				options: {
					b: true,
					c: 'd',
					// eslint-disable-next-line id-denylist -- e is fine.
					e: true,
					f: true,
					g: true,
					h: 'i',
					j: true,
					k: 'l',
				},
				positionalArguments: ['a', 'm'],
			},
		],
	])('%s', (_: string, testCase: TestCase) => {
		beforeEach(() => {
			process.argv = ['node', 'command', ...testCase.argv]
		})

		it('should have correct options', () => {
			expect(new CommandLine().options).toEqual(testCase.options)
		})

		it('should have correct positionalArguments', () => {
			expect(new CommandLine().positionalArguments).toEqual(
				testCase.positionalArguments,
			)
		})
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
