import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { resolve } from 'node:path'
import { env } from 'node:process'

/**
 * var is hoisted along with jest.mock.
 *
 * @see https://github.com/jestjs/jest/issues/9430
 */
var mockInstall = jest.fn()

jest.mock('husky', () => ({ install: mockInstall }))

beforeEach(() => {
	jest.resetModules()
})

describe('prepare script', () => {
	// eslint-disable-next-line no-undef -- Node 20 & Jest 8 allow this.
	const filePath = resolve(__dirname, '../../bin/prepare.ts')

	it('should install husky if ci is not defined', async () => {
		delete env.CI

		// eslint-disable-next-line no-undef -- Node 20 & Jest 8 allow this.
		await require(filePath)

		expect(mockInstall).toHaveBeenCalledTimes(1)
	})

	it('should not install husky if ci is defined', async () => {
		env.CI = 'true'

		// eslint-disable-next-line no-undef -- Node 20 & Jest 8 allow this.
		await require(filePath)

		expect(mockInstall).toHaveBeenCalledTimes(0)
	})
})
