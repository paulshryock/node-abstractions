import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { env } from 'node:process'
import { resolve } from 'node:path'

// eslint-disable-next-line no-var -- var is hoisted with jest.mock.
var mockInstall = jest.fn()

jest.mock('husky', () => ({ install: mockInstall }))

beforeEach(() => {
	jest.resetModules()
})

describe('prepare script', () => {
	const filePath = resolve(__dirname, '../../bin/prepare.ts')

	it('should install husky if ci is not defined', async () => {
		delete env.CI

		await import(filePath)

		expect(mockInstall).toHaveBeenCalledTimes(1)
	})

	it('should not install husky if ci is defined', async () => {
		env.CI = 'true'

		await import(filePath)

		expect(mockInstall).toHaveBeenCalledTimes(0)
	})
})
