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
	 * @since  unreleased
	 * @param  {string} path Path to file.
	 * @return {Promise<string>}
	 * @throws {FileNotFound}
	 */
	readFile(path: string): Promise<string>

	/**
	 * Writes to a file.
	 *
	 * @since  unreleased
	 * @param  {string}              path Path to file.
	 * @param  {string | Stringable} data Data to write to file.
	 * @return {Promise<void>}
	 */
	writeFile(path: string, data: string | Stringable): Promise<void>

	/**
	 * Appends to a file.
	 *
	 * @since  unreleased
	 * @param  {string}              path Path to file.
	 * @param  {string | Stringable} data Data to write to file.
	 * @return {Promise<void>}
	 */
	appendFile(path: string, data: string | Stringable): Promise<void>

	/**
	 * Deletes a file.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to file.
	 * @return {Promise<void>}
	 * @throws {FileNotFound}
	 */
	deleteFile(path: string): Promise<void>

	/**
	 * Checks if a path is a file.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to file.
	 * @return {Promise<boolean>}
	 */
	isFile(path: string): Promise<boolean>

	/**
	 * Creates a directory.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to directory.
	 * @return {Promise<void>}
	 */
	createDirectory(path: string): Promise<void>

	/**
	 * Reads a directory and returns the contents.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to directory.
	 * @return {Promise<string[]>}
	 * @throws {DirectoryNotFound}
	 */
	readDirectory(path: string): Promise<string[]>

	/**
	 * Deletes a directory.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to directory.
	 * @return {Promise<void>}
	 * @throws {DirectoryNotFound}
	 */
	deleteDirectory(path: string): Promise<void>

	/**
	 * Checks if a path is a directory.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to directory.
	 * @return {Promise<boolean>}
	 * @throws {DirectoryNotFound}
	 */
	isDirectory(path: string): Promise<boolean>

	/**
	 * Copies a file or directory to another location.
	 *
	 * @since  unreleased
	 * @param  {string} src  Source path.
	 * @param  {string} dest Destination path.
	 * @return {Promise<void>}
	 * @throws {FileSystemException}
	 */
	copy(src: string, dest: string): Promise<void>

	/**
	 * Moves a file or directory to another location.
	 *
	 * @since  unreleased
	 * @param  {string} src  Source path.
	 * @param  {string} dest Destination path.
	 * @return {Promise<void>}
	 * @throws {FileSystemException}
	 */
	move(src: string, dest: string): Promise<void>

	/**
	 * Checks if a file or directory exists.
	 *
	 * @since  unreleased
	 * @param  {string} path Path to file or directory.
	 * @return {Promise<boolean>}
	 */
	exists(path: string): Promise<boolean>
}
