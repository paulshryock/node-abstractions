import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	jest,
} from '@jest/globals'
import process from 'node:process'
import { resolve } from 'node:path'

jest.mock('husky', () => mockInstall)

// eslint-disable-next-line no-var -- var is hoisted with jest.mock.
var mockInstall = jest.fn()
const envOriginal = process.env
const filePath = resolve(__dirname, '../../../bin/prepare.ts')

beforeEach(() => {
	jest.resetModules()
})

afterEach(() => {
	process.env = envOriginal
})

describe('when ci environment variable is not set', () => {
	beforeEach(() => {
		delete process.env.CI
	})

	it('should install husky', async () => (
		await import(filePath),
		expect(mockInstall).toHaveBeenCalledTimes(1)
	))
})

describe('when ci environment variable is "true"', () => {
	beforeEach(() => {
		process.env.CI = 'true'
	})

	it('should not install husky', async () => (
		await import(filePath),
		expect(mockInstall).toHaveBeenCalledTimes(0)
	))
})
