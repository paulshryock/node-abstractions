import { beforeAll, describe, expect, it } from '@jest/globals'
import { join } from 'node:path'

interface ApiContract {
	className: string
	properties: string[]
	methods: string[]
}

/**
 * Validates an API contract for a given class.
 *
 * @param  {ApiContract} contract API contract to validate.
 * @return {void}
 * @since  unreleased
 */
// eslint-disable-next-line jest/no-export -- Reusable suite of tests.
export function validateApiContract(contract: ApiContract): void {
	const { className, methods, properties } = contract
	let ClassUnderTest: { new (): typeof ClassUnderTest }

	beforeAll(async () => {
		const pathToBundle = join(__dirname, '..', '..', 'dist', 'index.js')
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Okay.
		const { [className]: ClassName } = await import(pathToBundle)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Okay.
		ClassUnderTest = ClassName
	})

	describe(`${className} API contract`, () => {
		it('should have expected public properties', () => {
			const instanceProperties = Object.keys(new ClassUnderTest())

			expect(instanceProperties.sort()).toEqual(properties.sort())
		})

		it('should have expected public methods', () => {
			const prototype = Object.getPrototypeOf(
				new ClassUnderTest(),
			) as typeof ClassUnderTest
			const prototypeMethods = Object.getOwnPropertyNames(prototype)

			expect(prototypeMethods.sort()).toEqual(methods.sort())
		})
	})
}
