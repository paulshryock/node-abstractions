import { beforeAll, describe, expect, it } from '@jest/globals'
import { join } from 'node:path'

let ClassUnderTest: { new (): typeof ClassUnderTest }
const publicProperties = ['options', 'positionalArguments']
const publicMethods = ['constructor', 'ask', 'error', 'out']

beforeAll(async () => {
	const pathToBundle = join(__dirname, '..', '..', '..', 'dist', 'index.js')
	const { CommandLine } = (await import(pathToBundle)) as {
		CommandLine: typeof ClassUnderTest
	}
	ClassUnderTest = CommandLine
})

describe('CommandLine API', () => {
	it('should have expected public properties', () => {
		const instanceProperties = Object.keys(new ClassUnderTest())

		expect(instanceProperties.sort()).toEqual(publicProperties.sort())
	})

	it('should have expected public methods', () => {
		const prototype = Object.getPrototypeOf(
			new ClassUnderTest(),
		) as typeof ClassUnderTest
		const prototypeMethods = Object.getOwnPropertyNames(prototype)

		expect(prototypeMethods.sort()).toEqual(publicMethods.sort())
	})
})
