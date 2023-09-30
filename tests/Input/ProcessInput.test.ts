import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	test,
} from '@jest/globals'
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
			/* eslint-disable no-undefined -- Okay for test expectations. */
			[[], {}, {}],
			[['hello'], {}, { hello: undefined }],
			[['hello'], { hello: 'world' }, { hello: 'world' }],
			[['hello', 'hi'], { hello: 'world' }, { hello: 'world', hi: undefined }],
			[
				['hello', 'hi'],
				{ hello: 'world', hi: 'universe' },
				{ hello: 'world', hi: 'universe' },
			],
			/* eslint-enable no-undefined */
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

				describe(`when process.env is ${stringifyObject(
					processEnvValue,
				)}`, () => {
					describe(argsCase, () => {
						test(`should return ${stringifyObject(expected)}`, () => {
							expect(
								new ProcessInput().getEnvironmentVariables(keys),
							).toStrictEqual(expected)
						})
					})
				})
			},
		)
	})

	describe('getArguments', () => {
		describe.each([[[]], [['one']], [['one', 'two']]])(
			'when there are one or more arguments',
			(args: string[]) => {
				const testCase = `"${args.join(' ')}"`
				const expected = `[${args.map((arg) => `"${arg}"`).join(', ')}]`

				test(`${testCase} should return ${expected}`, () => {
					process.argv = [...process.argv.slice(0, 2), ...args]

					expect(new ProcessInput().getArguments()).toStrictEqual(args)
				})
			},
		)
	})

	describe('getLongFlags', () => {
		describe.each([
			[['--key'], { key: true }],
			[['--key=false'], { key: false }],
			[['--key=value'], { key: 'value' }],
			[['--key', 'value'], { key: 'value' }],
			[['--key', '--another', 'value'], { another: 'value', key: true }],
		])(
			'when there are long flags',
			(args: string[], expected: Record<string, unknown>) => {
				const testCase = `"${args.join(' ')}"`

				it(`${testCase} should return ${JSON.stringify(expected)}`, () => {
					process.argv = [...process.argv.slice(0, 2), ...args]

					expect(new ProcessInput().getLongFlags()).toStrictEqual(expected)
				})
			},
		)
	})
})

/**
 * Stringifies an object for a written test case.
 *
 * @param  {typeof process.env} obj Object to stringify.
 * @return {string}                 Stringified object.
 * @since  unreleased
 */
function stringifyObject(obj: typeof process.env): string {
	return `{ ${Object.entries(obj).map(stringifyEntry).join(', ')} }`
}

/**
 * Stringifies entries for a written test case.
 *
 * @param  {[key: string, value: string | undefined]} entry Test case entry.
 * @return {string}                                         Stringified entry.
 * @since  unreleased
 */
function stringifyEntry(
	entry: [key: string, value: string | undefined],
): string {
	const [key, value] = entry

	return `${key}: ${typeof value === 'undefined' ? value : `"${value}"`}`
}
