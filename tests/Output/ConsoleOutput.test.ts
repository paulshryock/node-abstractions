import { describe, expect, it, jest, test } from '@jest/globals'
import { Console } from 'node:console'
import { ConsoleOutput } from '../../src/Output/ConsoleOutput.ts'
import { MessageStringable } from '../../src/Stringable/MessageStringable.ts'
import { Stringable } from '../../src/Stringable/Stringable.ts'
import { Writable } from 'node:stream'

/**
 * Mock console class.
 *
 * @since unreleased
 */
class MockConsole extends Console {
	/**
	 * MockConsole class constructor.
	 *
	 * @since unreleased
	 */
	constructor() {
		super(new Writable({}))
	}

	override error = jest.fn()
	override warn = jest.fn()
	override log = jest.fn()
	override info = jest.fn()
	override debug = jest.fn()
}

describe('ConsoleOutput', () => {
	describe('error', () => {
		const errorMessage = 'An error occurred.'

		describe.each([errorMessage, new MessageStringable(errorMessage)])(
			'should print an error to stderr stream',
			(message: string | Stringable) => {
				test(message.constructor.name, () => {
					const mockConsole = new MockConsole()
					const output = new ConsoleOutput(mockConsole)

					output.error(message)

					expect(mockConsole.error).toHaveBeenCalledWith(errorMessage)
				})
			},
		)
	})

	describe('warn', () => {
		const warningMessage = 'An warning message.'

		describe.each([warningMessage, new MessageStringable(warningMessage)])(
			'should print a warning to stderr stream',
			(message: string | Stringable) => {
				test(message.constructor.name, () => {
					const mockConsole = new MockConsole()
					const output = new ConsoleOutput(mockConsole)

					output.warn(message)

					expect(mockConsole.warn).toHaveBeenCalledWith(warningMessage)
				})
			},
		)
	})

	describe('log', () => {
		const logMessage = 'A log message.'

		describe.each([logMessage, new MessageStringable(logMessage)])(
			'should print a log message to stdout stream',
			(message: string | Stringable) => {
				test(message.constructor.name, () => {
					const mockConsole = new MockConsole()
					const output = new ConsoleOutput(mockConsole)

					output.log(message)

					expect(mockConsole.log).toHaveBeenCalledWith(logMessage)
				})
			},
		)
	})

	describe('info', () => {
		const infoMessage = 'An info message.'

		describe.each([infoMessage, new MessageStringable(infoMessage)])(
			'should print an info message to stdout stream',
			(message: string | Stringable) => {
				test(message.constructor.name, () => {
					const mockConsole = new MockConsole()
					const output = new ConsoleOutput(mockConsole)

					output.info(message)

					expect(mockConsole.info).toHaveBeenCalledWith(infoMessage)
				})
			},
		)
	})

	describe('debug', () => {
		const debugMessage = 'A debug message.'

		describe.each([debugMessage, new MessageStringable(debugMessage)])(
			'should print a debug message to stdout stream',
			(message: string | Stringable) => {
				test(message.constructor.name, () => {
					const mockConsole = new MockConsole()
					const output = new ConsoleOutput(mockConsole)

					output.debug(message)

					expect(mockConsole.debug).toHaveBeenCalledWith(debugMessage)
				})
			},
		)
	})

	describe('getConsole', () => {
		it('should get the console instance', () => {
			expect(new ConsoleOutput().getConsole()).toBeInstanceOf(Console)
		})
	})
})
