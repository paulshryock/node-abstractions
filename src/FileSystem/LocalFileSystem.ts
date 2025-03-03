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
import {
	DirectoryNotFound,
	FileNotFound,
	FileOrDirectoryNotFound,
	/* @ts-expect-error -- Type used in @throws tag. */
	FileSystemException,
} from './FileSystemException.ts'
import { dirname, join, parse } from 'node:path'
import { FinalClassWasExtended } from '../Exception/Exception.ts'
import process from 'node:process'
import { VirtualFileSystem } from './VirtualFileSystem.ts'

/**
 * Local file system class.
 *
 * @since 0.1.1
 */
export class LocalFileSystem implements VirtualFileSystem {
	/**
	 * Callbacks for each file system action.
	 *
	 * @internal
	 *
	 * @since 0.1.1
	 * @since 0.3.0 - Made private and readonly.
	 */
	readonly #ACTIONS = {
		copy: { file: copyFile },
		move: { directory: rename, file: rename },
	}

	/**
	 * Constructs a local file system.
	 *
	 * @throws {FinalClassWasExtended}
	 *
	 * @since  0.3.0
	 */
	public constructor() {
		if (new.target !== LocalFileSystem)
			throw new FinalClassWasExtended(LocalFileSystem)
	}

	/**
	 * Checks if it's possible to read from the file system.
	 *
	 * @return {Promise<boolean>} Possibility to read from the file system.
	 * @throws {FileSystemException}
	 *
	 * @since  unreleased
	 */
	public canRead(): Promise<boolean> {
		return Promise.resolve(process.permission.has('fs.read'))
	}

	/**
	 * Reads a file.
	 *
	 * @param  {string}          path Path to file.
	 * @return {Promise<string>}      File contents.
	 * @throws {FileNotFound}
	 *
	 * @since  0.1.1
	 */
	public async readFile(path: string): Promise<string> {
		return readFile(path, 'utf8').catch((cause: unknown) => {
			throw new FileNotFound(path, { cause })
		})
	}

	/**
	 * Writes to a file.
	 *
	 * @param  {string}        path    Path to file.
	 * @param  {string}        content Content to write to file.
	 * @return {Promise<void>}
	 *
	 * @since  0.1.1
	 */
	public async writeFile(path: string, content: string): Promise<void> {
		await mkdir(dirname(path), { recursive: true })

		await writeFile(path, content.toString(), 'utf8')
	}

	/**
	 * Appends to a file.
	 *
	 * @param  {string}        path    Path to file.
	 * @param  {string}        content Content to write to file.
	 * @return {Promise<void>}
	 *
	 * @since  0.1.1
	 */
	public async appendFile(path: string, content: string): Promise<void> {
		await mkdir(dirname(path), { recursive: true })
		await appendFile(path, content.toString(), 'utf8')
	}

	/**
	 * Deletes a file.
	 *
	 * @param  {string}        path Path to file.
	 * @return {Promise<void>}
	 * @throws {FileNotFound}
	 *
	 * @since  0.1.1
	 */
	public async deleteFile(path: string): Promise<void> {
		if (!(await this.exists(path)) || !(await this.isFile(path)))
			throw new FileNotFound(path)

		await rm(path, { force: true, recursive: true })
	}

	/**
	 * Checks if a path points to a file.
	 *
	 * @param  {string}           path Path to file.
	 * @return {Promise<boolean>}      Whether the path points to a file.
	 *
	 * @since  0.1.1
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
	 * @param  {string}        path Path to directory.
	 * @return {Promise<void>}
	 *
	 * @since  0.1.1
	 */
	public async createDirectory(path: string): Promise<void> {
		await mkdir(path, { recursive: true })
	}

	/**
	 * Lists directory contents. Alias of list().
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}      List of directory contents.
	 * @throws {DirectoryNotFound}
	 *
	 * @since  0.1.1
	 */
	public async readDirectory(path: string): Promise<string[]> {
		return this.list(path)
	}

	/**
	 * Lists directory contents.
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}      List of directory contents.
	 * @throws {DirectoryNotFound}
	 *
	 * @since  unreleased
	 */
	public async list(path: string): Promise<string[]> {
		if (!(await this.isDirectory(path))) throw new DirectoryNotFound(path)

		return readdir(path)
	}

	/**
	 * Lists directory contents recursively. Alias of listRecursive().
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}      Recursive contents of the directory.
	 * @throws {DirectoryNotFound}
	 *
	 * @since  0.1.1
	 */
	public async readDirectoryRecursive(path: string): Promise<string[]> {
		return this.listRecursive(path)
	}

	/**
	 * Lists directory contents recursively.
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}      Recursive list of directory contents.
	 * @throws {DirectoryNotFound}
	 *
	 * @since  unreleased
	 */
	public async listRecursive(path: string): Promise<string[]> {
		if (!(await this.isDirectory(path))) throw new DirectoryNotFound(path)

		const filePaths: string[] = []

		for (const item of await readdir(path)) {
			const itemPath = join(path, item)
			const stats = await stat(itemPath)

			if (stats.isDirectory())
				filePaths.push(...(await this.readDirectoryRecursive(itemPath)))
			else filePaths.push(itemPath)
		}

		return filePaths
	}

	/**
	 * Deletes a directory.
	 *
	 * @param  {string}        path Path to directory.
	 * @return {Promise<void>}
	 * @throws {DirectoryNotFound}
	 *
	 * @since  0.1.1
	 */
	public async deleteDirectory(path: string): Promise<void> {
		if (!(await this.exists(path)) || !(await this.isDirectory(path)))
			throw new DirectoryNotFound(path)

		await rm(path, { force: true, recursive: true })
	}

	/**
	 * Checks if a path points to a directory.
	 *
	 * @param  {string}           path Path to directory.
	 * @return {Promise<boolean>}      Whether the path points to a directory.
	 * @throws {DirectoryNotFound}
	 *
	 * @since  0.1.1
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
	 * When `src` and `dest` are path names to files, the program copies the
	 * contents of the first file to the second file, creating the second file if
	 * necessary.
	 *
	 * When `src` is a path name of a file and `dest` is a path to a directory,
	 * then the program copies the source file into the destination directory,
	 * creating the file if necessary.
	 *
	 * When `src` and `dest` are both the path names to two directories, the
	 * program copies the source directory into the destination directory,
	 * creating any files or directories needed. If the destination directory
	 * already exists, the source is copied into the destination, while a new
	 * directory is created if the destination does not exist.
	 *
	 * @param  {string}        src  Source path.
	 * @param  {string}        dest Destination path.
	 * @return {Promise<void>}
	 * @throws {FileSystemException}
	 *
	 * @since  0.1.1
	 */
	public async copy(src: string, dest: string): Promise<void> {
		await this.#copyOrMove('copy', src, dest)
	}

	/**
	 * Moves a file or directory to another location.
	 *
	 * @param  {string}        src  Source path.
	 * @param  {string}        dest Destination path.
	 * @return {Promise<void>}
	 * @throws {FileSystemException}
	 *
	 * @since  0.1.1
	 */
	public async move(src: string, dest: string): Promise<void> {
		await this.#copyOrMove('move', src, dest)
	}

	/**
	 * Checks if a file or directory exists.
	 *
	 * @param  {string}           path Path to file or directory.
	 * @return {Promise<boolean>}      Whether the file or directory exists.
	 *
	 * @since  0.1.1
	 */
	public async exists(path: string): Promise<boolean> {
		return access(path)
			.then(() => true)
			.catch(() => false)
	}

	/**
	 * Copies or moves a file or directory to another location.
	 *
	 * @internal
	 *
	 * @param  {'copy' | 'move'} action Action to perform.
	 * @param  {string}          src    Source path.
	 * @param  {string}          dest   Destination path.
	 * @return {Promise<void>}
	 * @throws {FileSystemException}
	 *
	 * @since  0.1.1
	 * @since  0.3.0 - Made private.
	 */
	async #copyOrMove(
		action: 'copy' | 'move',
		src: string,
		dest: string,
	): Promise<void> {
		if (!(await this.exists(src))) throw new FileOrDirectoryNotFound(src)

		if (await this.isFile(src)) return this.#copyOrMoveFile(action, src, dest)

		await this.#copyOrMoveDirectory(action, src, dest)
	}

	/**
	 * Copies or moves a file to another location.
	 *
	 * @internal
	 *
	 * @param  {'copy' | 'move'} action Action to perform.
	 * @param  {string}          src    Source path.
	 * @param  {string}          dest   Destination path.
	 * @return {Promise<void>}
	 *
	 * @since  0.1.1
	 * @since  0.3.0 - Made private.
	 */
	async #copyOrMoveFile(
		action: 'copy' | 'move',
		src: string,
		dest: string,
	): Promise<void> {
		if (await this.isDirectory(dest))
			return this.#ACTIONS[action].file(src, `${dest}/${parse(src).base}`)

		await mkdir(dirname(dest), { recursive: true })
		await this.#ACTIONS[action].file(src, dest)
	}

	/**
	 * Copies or moves a directory to another location.
	 *
	 * @internal
	 *
	 * @param  {'copy' | 'move'} action Action to perform.
	 * @param  {string}          src    Source path.
	 * @param  {string}          dest   Destination path.
	 * @return {Promise<void>}
	 *
	 * @since  0.1.1
	 * @since  0.3.0 - Made private.
	 */
	async #copyOrMoveDirectory(
		action: 'copy' | 'move',
		src: string,
		dest: string,
	): Promise<void> {
		if (await this.isFile(dest)) throw new DirectoryNotFound(dest)

		const destination = (await this.isDirectory(dest))
			? `${dest}/${parse(src).base}`
			: dest

		await mkdir(dirname(destination), { recursive: true })

		if (action === 'copy') return this.#copyDirectory(src, destination)

		await this.#ACTIONS[action].directory(src, destination)
	}

	/**
	 * Recursively creates directories and files to copy a directory.
	 *
	 * @internal
	 *
	 * @param  {string}        src  Directory to copy.
	 * @param  {string}        dest Destination path to copy the directory to.
	 * @return {Promise<void>}
	 *
	 * @since  0.1.3
	 * @since  0.3.0 - Made private.
	 */
	async #copyDirectory(src: string, dest: string): Promise<void> {
		for (const item of await this.readDirectory(src))
			if (await this.isFile(`${src}/${item}`))
				await this.copy(`${src}/${item}`, `${dest}/${item}`)
			else await this.#copyDirectory(`${src}/${item}`, `${dest}/${item}`)
	}
}
