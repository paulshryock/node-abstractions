import { describe, expect, it, jest, test } from '@jest/globals'
import { stderr, stdout } from 'node:process'
import { ConsoleOutput } from '../../src/Output/ConsoleOutput.ts'
import { MessageStringable } from '../../src/Stringable/MessageStringable.ts'
import { mockStream } from '../testing-utilities/streams.ts'
import { Stringable } from '../../src/Stringable/Stringable.ts'

describe('ConsoleOutput', () => {
	describe('ConsoleOutput.out', () => {
		mockStream(stdout)

		describe.each(['A message.', new MessageStringable('A message.')])(
			'should print a message to stdout stream',
			(message: string | Stringable) => {
				test(`when message is a ${message.constructor.name}`, () => {
					new ConsoleOutput().out(message)

					const [toStdout] = (stdout.write as jest.Mock).mock.lastCall as [
						string,
					]

					expect(toStdout).toBe('A message.\n')
				})
			},
		)

		// eslint-disable-next-line no-undefined -- Testing edge case.
		describe.each([null, undefined])(
			'should not interpolate unstringable value from context into message',
			(greeting: null | undefined) => {
				test(`${JSON.stringify(greeting)}`, () => {
					new ConsoleOutput().out('{greeting} world', { greeting })

					const [toStdout] = (stdout.write as jest.Mock).mock.lastCall as [
						string,
					]

					expect(toStdout).toBe('{greeting} world\n')
				})
			},
		)

		describe.each([
			['hello', 'hello world\n'],
			[1, '1 world\n'],
			[['1', '2', '3'], '1,2,3 world\n'],
			[[1, 2, 3], '1,2,3 world\n'],
			[
				[{ hello: 'world' }, { hello: 'world' }],
				'[object Object],[object Object] world\n',
			],
			[{ hello: 'world' }, '[object Object] world\n'],
		])(
			'should interpolate stringable value from context into message',
			(greeting: unknown, expected: string) => {
				it(`${JSON.stringify(greeting)}`, () => {
					new ConsoleOutput().out('{greeting} world', { greeting })

					const [toStdout] = (stdout.write as jest.Mock).mock.lastCall as [
						string,
					]

					expect(toStdout).toBe(expected)
				})
			},
		)
	})

	describe('ConsoleOutput.error', () => {
		mockStream(stderr)

		describe.each([
			'An error message.',
			new MessageStringable('An error message.'),
		])(
			'should print a message to stderr stream',
			(message: string | Stringable) => {
				test(`when message is a ${message.constructor.name}`, () => {
					new ConsoleOutput().error(message)

					const [toStderr] = (stderr.write as jest.Mock).mock.lastCall as [
						string,
					]

					expect(toStderr).toBe('An error message.\n')
				})
			},
		)

		// eslint-disable-next-line no-undefined -- Testing edge case.
		describe.each([null, undefined])(
			'should not interpolate unstringable value from context into message',
			(greeting: null | undefined) => {
				test(`${JSON.stringify(greeting)}`, () => {
					new ConsoleOutput().error('{greeting} world', { greeting })

					const [toStderr] = (stderr.write as jest.Mock).mock.lastCall as [
						string,
					]

					expect(toStderr).toBe('{greeting} world\n')
				})
			},
		)

		describe.each([
			['hello', 'hello world\n'],
			[1, '1 world\n'],
			[['1', '2', '3'], '1,2,3 world\n'],
			[[1, 2, 3], '1,2,3 world\n'],
			[
				[{ hello: 'world' }, { hello: 'world' }],
				'[object Object],[object Object] world\n',
			],
			[{ hello: 'world' }, '[object Object] world\n'],
		])(
			'should interpolate stringable value from context into message',
			(greeting: unknown, expected: string) => {
				it(`${JSON.stringify(greeting)}`, () => {
					new ConsoleOutput().error('{greeting} world', { greeting })

					const [toStderr] = (stderr.write as jest.Mock).mock.lastCall as [
						string,
					]

					expect(toStderr).toBe(expected)
				})
			},
		)
	})
})
