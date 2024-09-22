import { describe, expect, it } from '@jest/globals'
import { StackTrace } from '../../../src/StackTrace/StackTrace.ts'

describe('when a message and object name are provided', () => {
	const message = 'something happened'
	const name = 'MyClass'

	const stackTrace = new StackTrace(message, name)
	const stackTraceLines = stackTrace.toString().split(/\n/u)

	it('should begin with "Trace: <name>: <message>"', () =>
		expect(stackTraceLines[0]).toMatch(/^Trace: MyClass: something happened$/u))

	describe('each following line should be formatted correctly', () => {
		it.each(stackTraceLines.slice(1, -1))('%s', (line: string) =>
			expect(line).toMatch(/^\s+at .+(?: \(.+)?(?::\d+){2}(?:\))?$/u),
		)
	})
})

describe('when no object name is provided', () => {
	const message = 'something happened'

	it('should use the default name "Debug"', () =>
		expect(new StackTrace(message).toString()).toMatch(/^Trace: Debug: /u))
})
