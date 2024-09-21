import { describe, expect, it } from '@jest/globals'
import { join } from 'node:path'
import { stat } from 'node:fs/promises'

const BUNDLE_MAXIMUM_SIZE = 1024 * 3

describe('compiled javascript bundle', () => {
	const pathToBundle = join(__dirname, '..', '..', 'dist', 'index.js')

	it('should be no more than 3 KiB', async () =>
		expect((await stat(pathToBundle)).size).toBeLessThan(BUNDLE_MAXIMUM_SIZE))

	it('should export a CommandLine class', async () => {
		const { CommandLine } = await import(pathToBundle)

		expect(new CommandLine()).toBeInstanceOf(CommandLine)
	})
})
