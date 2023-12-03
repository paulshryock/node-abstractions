import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	test,
} from '@jest/globals'
import {
	DirectoryNotFound,
	FileNotFound,
	FileOrDirectoryNotFound,
} from '../../../src/FileSystem/FileSystemException.ts'
import { LocalFileSystem } from '../../../src/FileSystem/LocalFileSystem.ts'
import mockFs from 'mock-fs'

describe('LocalFileSystem', () => {
	afterEach(mockFs.restore)

	const pathDirectory = 'path/to'
	const path = `${pathDirectory}/file`
	const newPathDirectory = `new/${pathDirectory}`
	const newPath = `new/${path}`
	const oldData = 'old data'
	const newData = 'new data'

	describe('readFile', () => {
		describe('when a file does not exist', () => {
			it('should throw an exception', async () => {
				mockFs({})

				await expect(new LocalFileSystem().readFile(path)).rejects.toThrow(
					FileNotFound,
				)
			})
		})

		describe('when a file does exist', () => {
			it('should read an empty file', async () => {
				mockFs({ path: { to: { file: '' } } })

				expect(await new LocalFileSystem().readFile(path)).toBe('')
			})

			it('should read a file', async () => {
				mockFs({ path: { to: { file: newData } } })

				expect(await new LocalFileSystem().readFile(path)).toBe(newData)
			})
		})
	})

	describe('writeFile', () => {
		beforeEach(() => mockFs({}))

		describe('when a file does not exist', () => {
			it('should create a file', async () => {
				const fs = new LocalFileSystem()

				await expect(fs.readFile(path)).rejects.toThrow(FileNotFound)

				await fs.writeFile(path, newData)

				await expect(fs.readFile(path)).resolves.not.toThrow(FileNotFound)
			})

			it('should write data to a file', async () => {
				const fs = new LocalFileSystem()

				await fs.writeFile(path, newData)

				expect(await fs.readFile(path)).toBe(newData)
			})
		})

		describe('when a file does exist', () => {
			it('should write over old file data', async () => {
				const fs = new LocalFileSystem()

				await fs.writeFile(path, oldData)
				await fs.writeFile(path, newData)

				expect(await fs.readFile(path)).not.toContain(oldData)
			})
		})
	})

	describe('appendFile', () => {
		describe('when a file does not exist', () => {
			beforeEach(() => mockFs({}))

			it('should append new data after old data', async () => {
				const fs = new LocalFileSystem()

				await fs.appendFile(path, newData)

				expect(await fs.readFile(path)).toBe(newData)
			})
		})

		describe('when a file does exist', () => {
			beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

			it('should append new data after old data', async () => {
				const fs = new LocalFileSystem()

				await fs.appendFile(path, newData)

				expect(await fs.readFile(path)).toBe(`${oldData}${newData}`)
			})
		})
	})

	describe('deleteFile', () => {
		describe('when path does not exist', () => {
			beforeEach(() => mockFs({}))

			it('should throw an exception', async () => {
				await expect(new LocalFileSystem().deleteFile(path)).rejects.toThrow(
					FileNotFound,
				)
			})
		})

		describe('when path does exist', () => {
			describe('when path is not a file', () => {
				beforeEach(() => mockFs({ path: { to: { file: {} } } }))

				it('should throw an exception', async () => {
					await expect(new LocalFileSystem().deleteFile(path)).rejects.toThrow(
						FileNotFound,
					)
				})
			})

			describe('when path is a file', () => {
				beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

				it('should delete the file', async () => {
					const fs = new LocalFileSystem()

					await fs.deleteFile(path)

					expect(await fs.exists(path)).toBe(false)
				})
			})
		})
	})

	describe('isFile', () => {
		describe('when path does not exist', () => {
			beforeEach(() => mockFs({}))

			it('should return false', async () => {
				expect(await new LocalFileSystem().isFile(path)).toBe(false)
			})
		})

		describe('when path does exist', () => {
			describe('when path is not a file', () => {
				beforeEach(() => mockFs({ path: { to: { file: {} } } }))

				it('should return false', async () => {
					expect(await new LocalFileSystem().isFile(path)).toBe(false)
				})
			})

			describe('when path is a file', () => {
				beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

				it('should return true', async () => {
					expect(await new LocalFileSystem().isFile(path)).toBe(true)
				})
			})
		})
	})

	describe('createDirectory', () => {
		describe('when directory does already exist', () => {
			beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

			it('should create a directory', async () => {
				const fs = new LocalFileSystem()

				await fs.createDirectory(pathDirectory)

				expect(await fs.exists(pathDirectory)).toBe(true)
			})
		})

		describe('when directory does not already exist', () => {
			beforeEach(() => mockFs({}))

			it('should create a directory', async () => {
				const fs = new LocalFileSystem()

				await fs.createDirectory(pathDirectory)

				expect(await fs.exists(pathDirectory)).toBe(true)
			})
		})
	})

	describe('readDirectory', () => {
		describe('when the directory does not exist', () => {
			beforeEach(() => mockFs({}))

			it('should throw an exception', async () => {
				await expect(new LocalFileSystem().readDirectory(path)).rejects.toThrow(
					DirectoryNotFound,
				)
			})
		})

		describe('when the directory is a file', () => {
			beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

			it('should throw an exception', async () => {
				await expect(new LocalFileSystem().readDirectory(path)).rejects.toThrow(
					DirectoryNotFound,
				)
			})
		})

		describe('when the directory does exist', () => {
			describe('when the directory is empty', () => {
				beforeEach(() => mockFs({ path: { to: {} } }))

				it('should return an empty array', async () => {
					expect(
						await new LocalFileSystem().readDirectory(pathDirectory),
					).toStrictEqual([])
				})
			})

			describe('when the directory contains files', () => {
				beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

				it('should return an array of relative file paths', async () => {
					expect(
						await new LocalFileSystem().readDirectory(pathDirectory),
					).toStrictEqual(['file'])
				})
			})

			describe('when the directory contains directories', () => {
				beforeEach(() => mockFs({ path: { to: { file: {} } } }))

				it('should return an array of relative directory paths', async () => {
					expect(
						await new LocalFileSystem().readDirectory(pathDirectory),
					).toStrictEqual(['file'])
				})
			})
		})
	})

	describe('readDirectoryRecursive', () => {
		describe('when the directory does not exist', () => {
			beforeEach(() => mockFs({}))

			it('should throw an exception', async () => {
				await expect(
					new LocalFileSystem().readDirectoryRecursive(path),
				).rejects.toThrow(DirectoryNotFound)
			})
		})

		describe('when the directory contains files and nested directories', () => {
			beforeEach(() =>
				mockFs({
					path: {
						to: {
							directory: {
								file: '',
								nested: {
									file: '',
								},
							},
							file: '',
						},
					},
				}),
			)

			it('should ...', async () => {
				expect(
					await new LocalFileSystem().readDirectoryRecursive('path/to'),
				).toStrictEqual(
					expect.arrayContaining([
						'path/to/directory/file',
						'path/to/directory/nested/file',
						'path/to/file',
					]),
				)
			})
		})
	})

	describe('deleteDirectory', () => {
		describe('when path does not exist', () => {
			beforeEach(() => mockFs({}))

			it('should throw an exception', async () => {
				await expect(
					new LocalFileSystem().deleteDirectory('path/to'),
				).rejects.toThrow(DirectoryNotFound)
			})
		})

		describe('when path does exist', () => {
			describe('when path is not a directory', () => {
				beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

				it('should throw an exception', async () => {
					await expect(
						new LocalFileSystem().deleteDirectory(path),
					).rejects.toThrow(DirectoryNotFound)
				})
			})

			describe('when path is a directory', () => {
				beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

				it('should delete the directory', async () => {
					const fs = new LocalFileSystem()

					expect(await fs.exists('path/to')).toBe(true)

					await fs.deleteDirectory('path/to')

					expect(await fs.exists('path/to')).toBe(false)
				})
			})
		})
	})

	describe('isDirectory', () => {
		describe('when path does not exist', () => {
			beforeEach(() => mockFs({}))

			it('should return false', async () => {
				expect(await new LocalFileSystem().isDirectory(path)).toBe(false)
			})
		})

		describe('when path does exist', () => {
			describe('when path is not a directory', () => {
				beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

				it('should return false', async () => {
					expect(await new LocalFileSystem().isDirectory(path)).toBe(false)
				})
			})

			describe('when path is a directory', () => {
				beforeEach(() => mockFs({ path: { to: { file: {} } } }))

				it('should return true', async () => {
					expect(await new LocalFileSystem().isDirectory(path)).toBe(true)
				})
			})
		})
	})

	describe('copy', () => {
		describe('when src does not exist', () => {
			beforeEach(() => mockFs({}))

			it('should throw an exception', async () => {
				await expect(new LocalFileSystem().copy(path, newPath)).rejects.toThrow(
					FileOrDirectoryNotFound,
				)
			})
		})

		describe('when src does exist', () => {
			describe('when src is a file', () => {
				describe('when dest is a file', () => {
					beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

					it('should copy the file to the new location', async () => {
						const fs = new LocalFileSystem()

						await fs.copy(path, newPath)

						expect(await fs.exists(path)).toBe(true)
						expect(await fs.isFile(path)).toBe(true)

						expect(await fs.exists(newPath)).toBe(true)
						expect(await fs.isFile(newPath)).toBe(true)

						expect(await fs.readFile(path)).toBe(await fs.readFile(newPath))
					})
				})

				describe('when dest is a directory', () => {
					beforeEach(() =>
						mockFs({
							new: { path: { to: {} } },
							path: { to: { file: oldData } },
						}),
					)

					it('should copy the file into the directory', async () => {
						const fs = new LocalFileSystem()

						await fs.copy(path, newPathDirectory)

						expect(await fs.exists(path)).toBe(true)
						expect(await fs.isFile(path)).toBe(true)

						expect(await fs.exists(newPath)).toBe(true)
						expect(await fs.isFile(newPath)).toBe(true)

						expect(await fs.readFile(path)).toBe(await fs.readFile(newPath))
					})
				})

				describe('when dest does not exist', () => {
					beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

					it('should copy the file to the new location', async () => {
						const fs = new LocalFileSystem()

						await fs.copy(path, newPath)

						expect(await fs.exists(path)).toBe(true)
						expect(await fs.isFile(path)).toBe(true)

						expect(await fs.exists(newPath)).toBe(true)
						expect(await fs.isFile(newPath)).toBe(true)

						expect(await fs.readFile(path)).toBe(await fs.readFile(newPath))
					})
				})
			})

			describe('when src is a directory', () => {
				describe('when dest is a file', () => {
					beforeEach(() =>
						mockFs({
							new: { path: { to: { file: oldData } } },
							path: { to: { file: {} } },
						}),
					)

					it('should throw an exception', async () => {
						await expect(
							new LocalFileSystem().copy(path, newPath),
						).rejects.toThrow(DirectoryNotFound)
					})
				})

				describe('when dest is a directory', () => {
					beforeEach(() =>
						mockFs({
							new: { path: {} },
							path: { to: { file: '' } },
						}),
					)

					it('should copy the directory into the new location', async () => {
						const fs = new LocalFileSystem()

						await fs.copy('path/to', 'new/path')

						expect(await fs.exists('new/path/to')).toBe(true)
						expect(await fs.isDirectory('new/path/to')).toBe(true)

						expect(await fs.exists('new/path/to/file')).toBe(true)
						expect(await fs.isFile('new/path/to/file')).toBe(true)
					})
				})

				describe('when dest does not exist', () => {
					beforeEach(() => mockFs({ long: { path: { to: { file: '' } } } }))

					it('should copy the directory to the new location', async () => {
						const fs = new LocalFileSystem()

						await fs.copy('long/path', 'new/long/path')

						expect(await fs.exists('new/long/path/to')).toBe(true)
						expect(await fs.isDirectory('new/long/path/to')).toBe(true)

						expect(await fs.exists('new/long/path/to/file')).toBe(true)
						expect(await fs.isFile('new/long/path/to/file')).toBe(true)
					})
				})
			})
		})
	})

	describe('move', () => {
		describe('when src does not exist', () => {
			beforeEach(() => mockFs({}))

			it('should throw an exception', async () => {
				await expect(new LocalFileSystem().move(path, newPath)).rejects.toThrow(
					FileOrDirectoryNotFound,
				)
			})
		})

		describe('when src does exist', () => {
			describe('when src is a file', () => {
				describe('when dest is a file', () => {
					beforeEach(() =>
						mockFs({
							new: { path: { to: { file: oldData } } },
							path: { to: { file: newData } },
						}),
					)

					it('should move the file to the new location', async () => {
						const fs = new LocalFileSystem()

						await fs.move(path, newPath)

						expect(await fs.readFile(newPath)).toBe(newData)
					})

					it('should not keep the src file', async () => {
						const fs = new LocalFileSystem()

						await fs.move(path, newPath)

						expect(await fs.exists(path)).toBe(false)
					})
				})

				describe('when dest is a directory', () => {
					beforeEach(() =>
						mockFs({
							new: { path: { to: { file: oldData } } },
							path: { to: { file: newData } },
						}),
					)

					it('should move the file into the directory', async () => {
						const fs = new LocalFileSystem()

						await fs.move(path, newPathDirectory)

						expect(await fs.readFile(newPath)).toBe(newData)
					})

					it('should not keep the src file', async () => {
						const fs = new LocalFileSystem()

						await fs.move(path, newPathDirectory)

						expect(await fs.exists(path)).toBe(false)
					})
				})

				describe('when dest does not exist', () => {
					beforeEach(() => mockFs({ path: { to: { file: newData } } }))

					it('should move the file to the new location', async () => {
						const fs = new LocalFileSystem()

						await fs.move(path, newPath)

						expect(await fs.readFile(newPath)).toBe(newData)
					})

					it('should not keep the src file', async () => {
						const fs = new LocalFileSystem()

						await fs.move(path, newPath)

						expect(await fs.exists(path)).toBe(false)
					})
				})
			})

			describe('when src is a directory', () => {
				describe('when dest is a file', () => {
					beforeEach(() =>
						mockFs({
							new: { path: { to: { file: oldData } } },
							path: { to: { file: oldData } },
						}),
					)

					it('should throw an exception', async () => {
						await expect(
							new LocalFileSystem().move(pathDirectory, newPath),
						).rejects.toThrow(DirectoryNotFound)
					})
				})

				describe('when dest is a directory', () => {
					beforeEach(() =>
						mockFs({
							new: { path: { to: { file: oldData } } },
							path: { to: { file: newData } },
						}),
					)

					it('should not change file in destination directory', async () => {
						const fs = new LocalFileSystem()

						await fs.move('path/to', 'new/path/to')

						expect(await fs.readFile('new/path/to/file')).toBe(oldData)
					})

					it('should move the directory into destination directory', async () => {
						const fs = new LocalFileSystem()

						await fs.move('path/to', 'new/path/to')

						expect(await fs.exists('new/path/to/to')).toBe(true)
						expect(await fs.isDirectory('new/path/to/to')).toBe(true)
					})

					it('should move directory contents', async () => {
						const fs = new LocalFileSystem()

						await fs.move('path/to', 'new/path/to')

						expect(await fs.exists('new/path/to/to/file')).toBe(true)
						expect(await fs.isFile('new/path/to/to/file')).toBe(true)
						expect(await fs.readFile('new/path/to/to/file')).toBe(newData)
					})
				})

				describe('when dest does not exist', () => {
					beforeEach(() => mockFs({ path: { to: { file: newData } } }))

					it('should move the directory to the new location', async () => {
						const fs = new LocalFileSystem()

						await fs.move(pathDirectory, newPathDirectory)

						expect(await fs.readFile(newPath)).toBe(newData)
					})
				})
			})
		})
	})

	describe('exists', () => {
		describe('when file or directory does not exist', () => {
			beforeEach(() => mockFs({}))

			it('should return false', async () => {
				expect(await new LocalFileSystem().exists(path)).toBe(false)
			})
		})

		describe('when file or directory does exist', () => {
			beforeEach(() => mockFs({ path: { to: { file: oldData } } }))

			describe.each([
				['file', path],
				['directory', 'path/to'],
			])('should return true', (testCase: string, pathToItem: string) => {
				test(`${testCase}`, async () => {
					expect(await new LocalFileSystem().exists(pathToItem)).toBe(true)
				})
			})
		})
	})
})
