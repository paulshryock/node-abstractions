import { afterEach, beforeEach, jest } from '@jest/globals'
import { stderr, stdout } from 'node:process'

/**
 * Mocks a stdout or stderr stream.
 *
 * @param  {typeof stderr | typeof stdout} stream Stream to mock.
 * @return {void}
 * @since  unreleased
 */
export function mockStream(stream: typeof stderr | typeof stdout): void {
	const originalStream = stream.write.bind(globalThis)

	beforeEach(() => {
		// eslint-disable-next-line no-param-reassign -- Mocking.
		;(stream.write as jest.Mock<typeof stream.write>) = jest.fn()
	})

	afterEach(() => {
		// eslint-disable-next-line no-param-reassign -- Mocking.
		stream.write = originalStream
	})
}
