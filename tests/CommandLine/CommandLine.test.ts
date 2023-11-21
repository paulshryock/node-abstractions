import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { CommandLine } from '../../src/CommandLine/CommandLine.ts'
import process from 'node:process'

describe('CommandLine', () => {
	it('should instantiate', () => {
		expect(() => new CommandLine()).not.toThrow()
	})

	it('should not be extensible', () => {
		expect(() => new (class extends CommandLine {})()).toThrow(Error)
	})

	describe.each([
		[
			'when there are no arguments',
			{ argv: [], options: {}, positionalArguments: [] },
		],
		[
			'when there are positional arguments',
			{
				argv: ['hello', 'world'],
				options: {},
				positionalArguments: ['hello', 'world'],
			},
		],
		[
			/** @todo Make this its own test. */
			'when there are flags',
			{
				argv: [
					// String.
					'-a',
					'a',
					// Compound booleans.
					'-bc',
					// Compound boolean and string.
					'-de',
					'e',
					// String true.
					'-f',
					'true',
					// String false.
					'-g',
					'false',
					// Equals string.
					'-h=h',
					// Equals string in double quotes.
					'-i="i"',
					// Equals string in escaped double quotes.
					'-j="j"',
					// Equals string in single quotes.
					"-k='k'",
					// String in double quotes.
					'-l',
					'"l"',
					// String in single quotes.
					'-m',
					"'m'",
					// String in escaped double quotes.
					'-n',
					'"n"',
				],
				options: {
					a: 'a',
					b: true,
					c: true,
					d: true,
					e: 'e',
					f: true,
					g: false,
					h: 'h',
					i: 'i',
					j: 'j',
					k: 'k',
					l: 'l',
					m: 'm',
					n: 'n',
				},
				positionalArguments: [],
			},
		],
		[
			/** @todo Make this its own test. */
			'when there are options',
			{
				argv: [
					'--a',
					'--b=hello',
					'--c',
					'world',
					'--d',
					'false',
					'--e=hi',
					'--f="universe"',
					"-g='sup'",
				],
				options: {
					a: true,
					b: 'hello',
					c: 'world',
					d: false,
					e: 'hi',
					f: 'universe',
					g: 'sup',
				},
				positionalArguments: [],
			},
		],
		[
			'when there are all kinds of arguments',
			{
				argv: ['a', '-b', '-c', 'd', '-ef', '-gh', 'i', '--j', '--k', 'l', 'm'],
				options: {
					b: true,
					c: 'd',
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
	])(
		'%s',
		(
			_: string,
			testCase: {
				argv: string[]
				options: Record<string, string | boolean>
				positionalArguments: string[]
			},
		) => {
			const processArgv = process.argv

			beforeEach(() => {
				process.argv = ['node', 'command', ...testCase.argv]
			})

			afterAll(() => {
				process.argv = processArgv
			})

			it('should have correct options', () => {
				expect(new CommandLine().options).toEqual(testCase.options)
			})

			it('should have correct positionalArguments', () => {
				expect(new CommandLine().positionalArguments).toEqual(
					testCase.positionalArguments,
				)
			})
		},
	)
})

describe('CommandLine.ask(Question)', () => {
	it.todo('should write a question to stdout')
	it.todo('should return an answer from stdin')
})

describe('CommandLine.out(message)', () => {
	const stdoutWrite = process.stdout.write.bind(process.stdout)

	beforeEach(() => {
		;(process.stdout.write as jest.Mock) = jest.fn()
	})

	afterAll(() => {
		process.stdout.write = stdoutWrite
	})

	it('should write a message to stdout', () => {
		new CommandLine().out('hello world')

		// eslint-disable-next-line @typescript-eslint/unbound-method -- Works fine.
		expect(process.stdout.write).toHaveBeenCalledWith(
			expect.stringContaining('hello world'),
			expect.anything(),
		)
	})
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
