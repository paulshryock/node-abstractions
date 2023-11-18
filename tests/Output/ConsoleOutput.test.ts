import { describe, expect, jest, test } from '@jest/globals'
import { stderr, stdout } from 'node:process'
import { ConsoleOutput } from '../../src/Output/ConsoleOutput.ts'
import { mockStream } from '../testing-utilities/streams.ts'

describe('ConsoleOutput', () => {
	describe('ConsoleOutput.out', () => {
		mockStream(stdout)

		describe.each(['A message.'])(
			'should print a message to stdout stream',
			(message: string) => {
				test(`when message is a ${message.constructor.name}`, () => {
					new ConsoleOutput().out(message)

					const [toStdout] = (stdout.write as jest.Mock).mock.lastCall as [
						string,
					]

					expect(toStdout).toContain('A message.')
				})
			},
		)
	})

	describe('ConsoleOutput.error', () => {
		mockStream(stderr)

		describe.each(['An error message.'])(
			'should print a message to stderr stream',
			(message: string) => {
				test(`when message is a ${message.constructor.name}`, () => {
					new ConsoleOutput().error(message)

					const [toStderr] = (stderr.write as jest.Mock).mock.lastCall as [
						string,
					]

					expect(toStderr).toContain('An error message.')
				})
			},
		)
	})
})
