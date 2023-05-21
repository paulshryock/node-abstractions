import { Console } from '../src/Console.ts'
import { describe, expect, it, jest, test } from '@jest/globals'
import { Console as NodeConsole } from 'node:console'
import { Writable } from 'node:stream'

class MockNodeConsole extends NodeConsole {
	override error = jest.fn()
	override warn = jest.fn()
	override log = jest.fn()
	override info = jest.fn()
	override debug = jest.fn()
}

const mockNodeConsole = new MockNodeConsole(new Writable({}))

const methods = Object.getOwnPropertyNames(Console.prototype).filter(
	(method) => method !== 'constructor',
)

describe('Console', () => {
	it('should instantiate without throwing', () => {
		expect(() => new Console()).not.toThrow()
	})

	describe.each(methods)('should log a message to the console', (method) => {
		test(method, () => {
			const message = `${method} message`

			new Console(mockNodeConsole)[method as keyof Console](message)

			expect(mockNodeConsole[method as keyof Console]).toHaveBeenCalledWith(
				message,
			)
		})
	})
})
