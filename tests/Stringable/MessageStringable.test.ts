import { describe, expect, it } from '@jest/globals'
import { MessageStringable } from '../../src/Stringable/MessageStringable.ts'

describe('MessageStringable', () => {
	it('should take a message and return it from toString method', () => {
		const message = 'a message'

		expect(new MessageStringable(message).toString()).toBe(message)
	})
})
