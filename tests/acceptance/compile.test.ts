import { describe, expect, it } from '@jest/globals'
import { join } from 'node:path'
import { stat } from 'node:fs/promises'

describe('compiled javascript bundle', () => {
	const pathToBundle = join(__dirname, '..', '..', 'dist', 'index.js')

	it('should be no more than 3kb', async () => {
		const { size } = await stat(pathToBundle)
		const sizeInKb = size / 1024

		expect(sizeInKb).toBeLessThan(3)
	})

	it('should export a CommandLine class', async () => {
		const { CommandLine } = await import(pathToBundle)

		expect(new CommandLine()).toBeInstanceOf(CommandLine)
	})
})
