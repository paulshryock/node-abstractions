import { FileSystem } from './FileSystem.ts'
import {
	DirectoryAlreadyExists,
	DirectoryNotFound,
	FileNotFound,
	FileOrDirectoryNotFound,
} from './FileSystemException.ts'
import { Stringable } from '../Stringable/Stringable.ts'
import {
	access,
	appendFile,
	copyFile,
	mkdir,
	readdir,
	readFile,
	rename,
	rm,
	stat,
	writeFile,
} from 'node:fs/promises'
import { copy } from 'fs-extra'
import { dirname, parse } from 'node:path'

/**
 * Local file system class.
 *
 * @since unreleased
 */
export class LocalFileSystem implements FileSystem {
	/**
	 * File system actions.
	 *
	 * @internal
	 *
	 * @since unreleased
	 * @type  {
	 *   [action: 'copy' | 'move']: {
	 *     [scope: 'file' | 'directory']: Function,
	 *   },
	 * }
	 */
	private ACTIONS = {
		copy: { file: copyFile, directory: copy },
		move: { file: rename, directory: rename },
	}

	/**
	 * Reads a file.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to file.
	 * @return {Promise<string>}
	 * @throws {FileNotFound}
	 */
	public async readFile(path: string): Promise<string> {
		return await readFile(path, 'utf8').catch((cause: unknown) => {
			throw new FileNotFound(path, { cause })
		})
	}

	/**
	 * Writes to a file.
	 *
	 * @since  unreleased
	 * @param  {string}              path Path to file.
	 * @param  {string | Stringable} data Data to write to file.
	 * @return {Promise<void>}
	 */
	public async writeFile(
		path: string,
		data: string | Stringable,
	): Promise<void> {
		await mkdir(dirname(path), { recursive: true })

		await writeFile(path, data.toString(), 'utf8')
	}

	/**
	 * Appends to a file.
	 *
	 * @since  unreleased
	 * @param  {string}              path Path to file.
	 * @param  {string | Stringable} data Data to write to file.
	 * @return {Promise<void>}
	 */
	public async appendFile(
		path: string,
		data: string | Stringable,
	): Promise<void> {
		await mkdir(dirname(path), { recursive: true })
		await appendFile(path, data.toString(), 'utf8')
	}

	/**
	 * Deletes a file.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to file.
	 * @return {Promise<void>}
	 * @throws {FileNotFound}
	 */
	public async deleteFile(path: string): Promise<void> {
		if (!(await this.exists(path)) || !(await this.isFile(path)))
			throw new FileNotFound(path)

		await rm(path, { force: true, recursive: true })
	}

	/**
	 * Checks if a path is a file.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to file.
	 * @return {Promise<boolean>}
	 */
	public async isFile(path: string): Promise<boolean> {
		try {
			return (await stat(path)).isFile()
		} catch {
			return false
		}
	}

	/**
	 * Creates a directory.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to directory.
	 * @return {Promise<void>}
	 */
	public async createDirectory(path: string): Promise<void> {
		await mkdir(path, { recursive: true })
	}

	/**
	 * Reads a directory and returns the contents.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to directory.
	 * @return {Promise<string[]>}
	 * @throws {DirectoryNotFound}
	 */
	public async readDirectory(path: string): Promise<string[]> {
		if (!(await this.isDirectory(path))) throw new DirectoryNotFound(path)

		return await readdir(path)
	}

	/**
	 * Deletes a directory.
	 *
	 * @since  unreleased
	 *
	 * @param  {string} path Path to directory.
	 * @return {Promise<void>}
	 * @throws {DirectoryNotFound}
	 */
	public async deleteDirectory(path: string): Promise<void> {
		if (!(await this.exists(path)) || !(await this.isDirectory(path)))
			throw new DirectoryNotFound(path)

		await rm(path, { force: true, recursive: true })
	}

	/**
	 * Checks if a path is a directory.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to directory.
	 * @return {Promise<boolean>}
	 * @throws {DirectoryNotFound}
	 */
	public async isDirectory(path: string): Promise<boolean> {
		try {
			return (await stat(path)).isDirectory()
		} catch {
			return false
		}
	}

	/**
	 * Copies a file or directory to another location.
	 *
	 * @since  unreleased
	 * @param  {string} src  Source path.
	 * @param  {string} dest Destination path.
	 * @return {Promise<void>}
	 * @throws {FileSystemException}
	 * @todo   Remove fs-extra and use fs.promises.cp when it stabilizes.
	 * @see    https://github.com/nodejs/node/issues/44598
	 * @todo   Maybe handle symlinks.
	 */
	public async copy(src: string, dest: string): Promise<void> {
		await this.copyOrMove('copy', src, dest)
	}

	/**
	 * Moves a file or directory to another location.
	 *
	 * @since  unreleased
	 * @param  {string} src  Source path.
	 * @param  {string} dest Destination path.
	 * @return {Promise<void>}
	 * @throws {FileSystemException}
	 */
	public async move(src: string, dest: string): Promise<void> {
		await this.copyOrMove('move', src, dest)
	}

	/**
	 * Copies or moves a file or directory to another location.
	 *
	 * @internal
	 *
	 * @since  unreleased
	 * @param  {'copy' | 'move'} action Action to perform.
	 * @param  {string}          src    Source path.
	 * @param  {string}          dest   Destination path.
	 * @return {Promise<void>}
	 */
	private async copyOrMove(
		action: 'copy' | 'move',
		src: string,
		dest: string,
	): Promise<void> {
		if (!(await this.exists(src))) throw new FileOrDirectoryNotFound(src)

		if (await this.isFile(src)) {
			return await this.copyOrMoveFile(action, src, dest)
		}

		await this.copyOrMoveDirectory(action, src, dest)
	}

	/**
	 * Copies or moves a file to another location.
	 *
	 * @internal
	 *
	 * @since  unreleased
	 * @param  {'copy' | 'move'} action Action to perform.
	 * @param  {string}          src    Source path.
	 * @param  {string}          dest   Destination path.
	 * @return {Promise<void>}
	 */
	private async copyOrMoveFile(
		action: 'copy' | 'move',
		src: string,
		dest: string,
	): Promise<void> {
		if (await this.isDirectory(dest)) {
			await this.ACTIONS[action].file(src, `${dest}/${parse(src).base}`)
			return
		}

		await mkdir(dirname(dest), { recursive: true })
		await this.ACTIONS[action].file(src, dest)
		return
	}

	/**
	 * Copies or moves a directory to another location.
	 *
	 * @internal
	 *
	 * @since  unreleased
	 * @param  {'copy' | 'move'} action Action to perform.
	 * @param  {string}          src    Source path.
	 * @param  {string}          dest   Destination path.
	 * @return {Promise<void>}
	 */
	private async copyOrMoveDirectory(
		action: 'copy' | 'move',
		src: string,
		dest: string,
	): Promise<void> {
		if (await this.isFile(dest)) throw new DirectoryNotFound(dest)

		if (action === 'move' && (await this.isDirectory(dest)))
			throw new DirectoryAlreadyExists(dest)

		await mkdir(dirname(dest), { recursive: true })
		await this.ACTIONS[action].directory(src, dest)
	}

	/**
	 * Checks if a file or directory exists.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to file or directory.
	 * @return {Promise<boolean>}
	 */
	public async exists(path: string): Promise<boolean> {
		try {
			await access(path)
			return true
		} catch (error) {
			return false
		}
	}
}
