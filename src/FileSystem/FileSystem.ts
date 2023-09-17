import { Stringable } from '../Stringable/Stringable.ts'

/**
 * File system abstraction.
 *
 * @since unreleased
 */
export interface FileSystem {
	/**
	 * Reads a file.
	 *
	 * @param  {string}          path Path to file.
	 * @return {Promise<string>}
	 * @throws {import('./FileSystem/FileSystemException.ts').FileNotFound}
	 * @since  unreleased
	 */
	readFile(path: string): Promise<string>

	/**
	 * Writes to a file.
	 *
	 * @param  {string}              path    Path to file.
	 * @param  {string | Stringable} content Content to write to file.
	 * @return {Promise<void>}
	 * @since  unreleased
	 */
	writeFile(path: string, content: string | Stringable): Promise<void>

	/**
	 * Appends to a file.
	 *
	 * @param  {string}              path    Path to file.
	 * @param  {string | Stringable} content Content to write to file.
	 * @return {Promise<void>}
	 * @since  unreleased
	 */
	appendFile(path: string, content: string | Stringable): Promise<void>

	/**
	 * Deletes a file.
	 *
	 * @param  {string}        path Path to file.
	 * @return {Promise<void>}
	 * @throws {import('./FileSystem/FileSystemException.ts').FileNotFound}
	 * @since  unreleased
	 */
	deleteFile(path: string): Promise<void>

	/**
	 * Checks if a path is a file.
	 *
	 * @param  {string}           path Path to file.
	 * @return {Promise<boolean>}
	 * @since  unreleased
	 */
	isFile(path: string): Promise<boolean>

	/**
	 * Creates a directory.
	 *
	 * @param  {string}        path Path to directory.
	 * @return {Promise<void>}
	 * @since  unreleased
	 */
	createDirectory(path: string): Promise<void>

	/**
	 * Reads a directory and returns the contents.
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}
	 * @throws {import('./FileSystem/FileSystemException.ts').DirectoryNotFound}
	 * @since  unreleased
	 */
	readDirectory(path: string): Promise<string[]>

	/**
	 * Reads a directory and returns the contents recursively.
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}
	 * @throws {import('./FileSystem/FileSystemException.ts').DirectoryNotFound}
	 * @since  unreleased
	 */
	readDirectoryRecursive(path: string): Promise<string[]>

	/**
	 * Deletes a directory.
	 *
	 * @param  {string}        path Path to directory.
	 * @return {Promise<void>}
	 * @throws {import('./FileSystem/FileSystemException.ts').DirectoryNotFound}
	 * @since  unreleased
	 */
	deleteDirectory(path: string): Promise<void>

	/**
	 * Checks if a path is a directory.
	 *
	 * @param  {string}           path Path to directory.
	 * @return {Promise<boolean>}
	 * @throws {import('./FileSystem/FileSystemException.ts').DirectoryNotFound}
	 * @since  unreleased
	 */
	isDirectory(path: string): Promise<boolean>

	/**
	 * Copies a file or directory to another location.
	 *
	 * @param  {string}        src  Source path.
	 * @param  {string}        dest Destination path.
	 * @return {Promise<void>}
	 * @throws {import('./FileSystem/FileSystemException.ts').FileSystemException}
	 * @since  unreleased
	 */
	copy(src: string, dest: string): Promise<void>

	/**
	 * Moves a file or directory to another location.
	 *
	 * @param  {string}        src  Source path.
	 * @param  {string}        dest Destination path.
	 * @return {Promise<void>}
	 * @throws {import('./FileSystem/FileSystemException.ts').FileSystemException}
	 * @since  unreleased
	 */
	move(src: string, dest: string): Promise<void>

	/**
	 * Checks if a file or directory exists.
	 *
	 * @param  {string}           path Path to file or directory.
	 * @return {Promise<boolean>}
	 * @since  unreleased
	 */
	exists(path: string): Promise<boolean>
}
