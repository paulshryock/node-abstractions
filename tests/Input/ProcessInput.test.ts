import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	test,
} from '@jest/globals'
import { Configuration } from '../../src/Configuration/Configuration.ts'
import process from 'node:process'
import { ProcessInput } from '../../src/Input/ProcessInput.ts'

describe('ProcessInput', () => {
	const processArgv = process.argv

	beforeEach(() => {
		process.argv = [...processArgv]
	})

	afterEach(() => {
		process.argv = processArgv
	})

	describe('getEnvironmentVariable', () => {
		const processEnv = process.env

		afterEach(() => {
			process.env = processEnv
		})

		describe.each([['hello']])(
			'when an environment variable is not defined',
			(key: string) => {
				beforeEach(() => {
					delete process.env[key]
				})

				it(`should not get "${key}" environment variable value`, () => {
					expect(new ProcessInput().getEnvironmentVariable(key)).toBeUndefined()
				})
			},
		)

		describe.each([['hello', 'world']])(
			'when an environment variable is defined',
			(key: string, value: string) => {
				beforeEach(() => {
					process.env[key] = value
				})

				it(`should get "${key}" environment variable value "${value}"`, () => {
					expect(new ProcessInput().getEnvironmentVariable(key)).toBe(value)
				})
			},
		)
	})

	describe('getEnvironmentVariables', () => {
		const processEnv = process.env

		afterEach(() => {
			process.env = processEnv
		})

		describe.each([
			[[], {}, {}],
			[['hello'], {}, {}],
			[['hello'], { hello: 'world' }, { hello: 'world' }],
			[['hello', 'hi'], { hello: 'world' }, { hello: 'world' }],
			[
				['hello', 'hi'],
				{ hello: 'world', hi: 'universe' },
				{ hello: 'world', hi: 'universe' },
			],
		])(
			'should get environment variables if they are defined',
			(
				keys: string[],
				processEnvValue: typeof process.env,
				expected: typeof process.env,
			) => {
				beforeEach(() => {
					process.env = processEnvValue
				})

				const argsCase = `when called with [${keys
					.map((k) => `"${k}"`)
					.join(', ')}]`

				describe(`when process.env is ${JSON.stringify(
					processEnvValue,
				)}`, () => {
					describe(`${argsCase}`, () => {
						test(`should return ${JSON.stringify(expected)}`, () => {
							expect(
								new ProcessInput().getEnvironmentVariables(keys),
							).toStrictEqual(expected)
						})
					})
				})
			},
		)
	})

	const testCases: [string, string[], Configuration][] = [
		['no args', [], {}],
		['short flags', ['-a', '-bc'], { a: true, b: true, c: true }],
		[
			'long flags',
			['--a', '--b', 'bValue', '--c=cValue'],
			{ a: true, b: 'bValue', c: 'cValue' },
		],
		[
			'all types of args',
			[
				'positional',
				'-a',
				'true',
				'--b',
				'false',
				'-cd',
				'dValue',
				'--e',
				'eValue',
				'positional',
				'-fgh=hValue',
				'--i=iValue',
				'positional positional',
			],
			{
				a: true,
				b: false,
				c: true,
				d: 'dValue',
				/* eslint-disable-next-line id-denylist -- `e` is fine here. */
				e: 'eValue',
				f: true,
				g: true,
				h: 'hValue',
				i: 'iValue',
			},
		],
	]

	describe('getConfiguration', () => {
		describe.each(testCases)(
			'should get configuration options',
			(testCase: string, args: string[], expected: Record<string, unknown>) => {
				beforeEach(() => {
					process.argv = [...process.argv.slice(0, 2), ...args]
				})

				test(`when there are ${testCase}`, async () => {
					expect(await new ProcessInput().getConfiguration()).toEqual(expected)
				})
			},
		)
	})

	describe('getConfigurationOption', () => {
		describe.each(testCases)(
			'should get a configuration option',
			(testCase: string, args: string[], expected: Record<string, unknown>) => {
				beforeEach(() => {
					process.argv = [...process.argv.slice(0, 2), ...args]
				})

				test(`when there are ${testCase}`, async () => {
					expect(await new ProcessInput().getConfigurationOption('a')).toEqual(
						expected.a,
					)
				})
			},
		)
	})
})
