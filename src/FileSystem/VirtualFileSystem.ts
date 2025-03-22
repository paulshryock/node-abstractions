/* @ts-expect-error -- Types are used in @throws tags. */
import {
	DirectoryNotFound,
	FileNotFound,
	FileSystemException,
} from './FileSystemException.ts'

/**
 * File system abstraction.
 *
 * @since 0.1.1
 */
export interface VirtualFileSystem {
	/**
	 * Checks if it is possible to read from the file system.
	 *
	 * @return {Promise<boolean>} Possibility to read from the file system.
	 * @throws {FileSystemException}
	 *
	 * @since  0.3.2
	 */
	canRead(): Promise<boolean>

	/**
	 * Reads a file.
	 *
	 * @param  {string}          path Path to file.
	 * @return {Promise<string>}      File contents.
	 * @throws {FileNotFound}
	 *
	 * @since  0.1.1
	 */
	readFile(path: string): Promise<string>

	/**
	 * Writes to a file.
	 *
	 * @param  {string}        path    Path to file.
	 * @param  {string}        content Content to write to file.
	 * @return {Promise<void>}
	 *
	 * @since  0.1.1
	 */
	writeFile(path: string, content: string): Promise<void>

	/**
	 * Appends to a file.
	 *
	 * @param  {string}        path    Path to file.
	 * @param  {string}        content Content to write to file.
	 * @return {Promise<void>}
	 *
	 * @since  0.1.1
	 */
	appendFile(path: string, content: string): Promise<void>

	/**
	 * Deletes a file.
	 *
	 * @param  {string}        path Path to file.
	 * @return {Promise<void>}
	 * @throws {FileNotFound}
	 *
	 * @since  0.1.1
	 */
	deleteFile(path: string): Promise<void>

	/**
	 * Checks if a path is a file.
	 *
	 * @param  {string}           path Path to file.
	 * @return {Promise<boolean>}      Whether or not the path is a file.
	 *
	 * @since  0.1.1
	 */
	isFile(path: string): Promise<boolean>

	/**
	 * Creates a directory.
	 *
	 * @param  {string}        path Path to directory.
	 * @return {Promise<void>}
	 *
	 * @since  0.1.1
	 */
	createDirectory(path: string): Promise<void>

	/**
	 * Lists directory contents.
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}      List of directory contents.
	 * @throws {DirectoryNotFound}
	 *
	 * @since  0.3.2
	 */
	list(path: string): Promise<string[]>

	/**
	 * Lists directory contents. Alias of list().
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}      List of directory contents.
	 * @throws {DirectoryNotFound}
	 *
	 * @since  0.1.1
	 */
	readDirectory(path: string): Promise<string[]>

	/**
	 * Lists directory contents recursively.
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}      Recursive list of directory contents.
	 * @throws {DirectoryNotFound}
	 *
	 * @since  0.3.2
	 */
	listRecursive(path: string): Promise<string[]>

	/**
	 * Lists directory contents recursively. Alias of listRecursive().
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}      Recursive contents of the directory.
	 * @throws {DirectoryNotFound}
	 *
	 * @since  0.1.1
	 */
	readDirectoryRecursive(path: string): Promise<string[]>

	/**
	 * Deletes a directory.
	 *
	 * @param  {string}        path Path to directory.
	 * @return {Promise<void>}
	 * @throws {DirectoryNotFound}
	 *
	 * @since  0.1.1
	 */
	deleteDirectory(path: string): Promise<void>

	/**
	 * Checks if a path is a directory.
	 *
	 * @param  {string}           path Path to directory.
	 * @return {Promise<boolean>}      Whether or not the path is a directory.
	 * @throws {DirectoryNotFound}
	 *
	 * @since  0.1.1
	 */
	isDirectory(path: string): Promise<boolean>

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
	copy(src: string, dest: string): Promise<void>

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
	move(src: string, dest: string): Promise<void>

	/**
	 * Checks if a file or directory exists.
	 *
	 * @param  {string}           path Path to file or directory.
	 * @return {Promise<boolean>}      Whether or not the path is an existing
	 *                                 file or directory.
	 *
	 * @since  0.1.1
	 */
	exists(path: string): Promise<boolean>
}
