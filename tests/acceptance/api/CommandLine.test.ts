import { beforeAll, describe, expect, it } from '@jest/globals'
import { join } from 'node:path'

let CommandLine: {
	new (streams?: unknown): typeof CommandLine
	options: unknown
	positionalArguments: unknown
	ask(question: string): Promise<string>
	out(message: string, options?: { trace: boolean }): void
	error(error: Error, options?: { trace: boolean }): void
}

beforeAll(async () => {
	const pathToBundle = join(__dirname, '..', '..', '..', 'dist', 'index.js')
	const { CommandLine: CL } = (await import(pathToBundle)) as {
		CommandLine: typeof CommandLine
	}
	CommandLine = CL
})

describe('CommandLine API', () => {
	it('should have expected public properties', () => {
		const publicProperties = ['options', 'positionalArguments']

		expect(Object.keys(new CommandLine())).toEqual(publicProperties)
	})

	it('should have expected public methods', () => {
		const prototype = Object.getPrototypeOf(
			new CommandLine(),
		) as typeof CommandLine
		const publicMethods = ['constructor', 'ask', 'error', 'out']

		expect(Object.getOwnPropertyNames(prototype).sort()).toEqual(
			publicMethods.sort(),
		)
	})
})
