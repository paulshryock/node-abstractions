import { describe, expect, it } from '@jest/globals'
import {
	DirectoryNotFound,
	FileNotFound,
	FileOrDirectoryNotFound,
	FileSystemException,
	FileSystemExceptionMessage,
} from '../../src/FileSystem/FileSystemException.ts'

describe.each([
	new DirectoryNotFound(''),
	new FileNotFound(''),
	new FileOrDirectoryNotFound(''),
])('FileSystemException', (exception: FileSystemException) => {
	const className = exception.constructor.name

	describe(`${className}`, () => {
		it('should extend Error', () => {
			expect(exception).toBeInstanceOf(Error)
		})

		it('should have the correct message', () => {
			expect(exception.message).toBe(
				FileSystemExceptionMessage[
					className as keyof typeof FileSystemExceptionMessage
				],
			)
		})

		it('should have a path property', () => {
			expect(exception).toHaveProperty('path')
		})
	})
})
