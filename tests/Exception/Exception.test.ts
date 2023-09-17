import { describe, expect, it } from '@jest/globals'
import { Exception } from '../../src/Exception/Exception.ts'

describe('Exception', () => {
	it('should extend Error', () => {
		expect(new Exception()).toBeInstanceOf(Error)
	})
})
