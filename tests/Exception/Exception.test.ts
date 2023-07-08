import { Exception } from '../../src/Exception/Exception.ts'
import { describe, expect, it } from '@jest/globals'

describe('Exception', () => {
	it('should extend Error', () => {
		expect(new Exception()).toBeInstanceOf(Error)
	})
})
