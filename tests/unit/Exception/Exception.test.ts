import { describe, expect, it } from '@jest/globals'
import {
	Exception,
	FinalClassWasExtended,
} from '../../../src/Exception/Exception.ts'

describe('Exception', () => {
	it('should extend Error', () => {
		expect(new Exception()).toBeInstanceOf(Error)
	})
})

describe('FinalClassWasExtended', () => {
	/** Example of a final class for this exception. */
	class FinalClassExample {}

	it('should be named after itself', () => {
		const exception = new FinalClassWasExtended(FinalClassExample)

		expect(exception.name).toBe('FinalClassWasExtended')
	})

	it('should report the extended final class name in the message', () => {
		const exception = new FinalClassWasExtended(FinalClassExample)

		expect(exception.message).toContain('FinalClassExample')
	})

	it('should have the extended final class name', () => {
		const exception = new FinalClassWasExtended(FinalClassExample)

		expect(exception.finalClass).toBe('FinalClassExample')
	})
})
