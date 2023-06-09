import { ConsoleOutput } from '../../src/Output/ConsoleOutput.ts'
import { describe, expect, it, jest } from '@jest/globals'
import { Console } from 'node:console'
import { Writable } from 'node:stream'

class MockConsole extends Console {
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
		it('should print an error to stderr stream', () => {
			const mockConsole = new MockConsole()
			const output = new ConsoleOutput(mockConsole)

			output.error('An error occurred.')

			expect(mockConsole.error).toHaveBeenCalled()
		})
	})

	describe('warn', () => {
		it('should print a warning to stderr stream', () => {
			const mockConsole = new MockConsole()
			const output = new ConsoleOutput(mockConsole)

			output.warn('A warning message.')

			expect(mockConsole.warn).toHaveBeenCalled()
		})
	})

	describe('log', () => {
		it('should print a log message to stdout stream', () => {
			const mockConsole = new MockConsole()
			const output = new ConsoleOutput(mockConsole)

			output.log('A log message.')

			expect(mockConsole.log).toHaveBeenCalled()
		})
	})

	describe('info', () => {
		it('should print an info message to stdout stream', () => {
			const mockConsole = new MockConsole()
			const output = new ConsoleOutput(mockConsole)

			output.info('A info message.')

			expect(mockConsole.info).toHaveBeenCalled()
		})
	})

	describe('debug', () => {
		it('should print a debug message to stdout stream', () => {
			const mockConsole = new MockConsole()
			const output = new ConsoleOutput(mockConsole)

			output.debug('A debug message.')

			expect(mockConsole.debug).toHaveBeenCalled()
		})
	})

	describe('getConsole', () => {
		it('should get the console instance', () => {
			expect(new ConsoleOutput().getConsole()).toBeInstanceOf(Console)
		})
	})
})
