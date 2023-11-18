/**
 * File system abstraction.
 *
 * @since 0.1.1
 */
export interface FileSystem {
	/**
	 * Reads a file.
	 *
	 * @param  {string}          path Path to file.
	 * @return {Promise<string>}
	 * @throws {import('./FileSystem/FileSystemException.ts').FileNotFound}
	 * @since  0.1.1
	 */
	readFile(path: string): Promise<string>

	/**
	 * Writes to a file.
	 *
	 * @param  {string}        path    Path to file.
	 * @param  {string}        content Content to write to file.
	 * @return {Promise<void>}
	 * @since  0.1.1
	 */
	writeFile(path: string, content: string): Promise<void>

	/**
	 * Appends to a file.
	 *
	 * @param  {string}        path    Path to file.
	 * @param  {string}        content Content to write to file.
	 * @return {Promise<void>}
	 * @since  0.1.1
	 */
	appendFile(path: string, content: string): Promise<void>

	/**
	 * Deletes a file.
	 *
	 * @param  {string}        path Path to file.
	 * @return {Promise<void>}
	 * @throws {import('./FileSystem/FileSystemException.ts').FileNotFound}
	 * @since  0.1.1
	 */
	deleteFile(path: string): Promise<void>

	/**
	 * Checks if a path is a file.
	 *
	 * @param  {string}           path Path to file.
	 * @return {Promise<boolean>}
	 * @since  0.1.1
	 */
	isFile(path: string): Promise<boolean>

	/**
	 * Creates a directory.
	 *
	 * @param  {string}        path Path to directory.
	 * @return {Promise<void>}
	 * @since  0.1.1
	 */
	createDirectory(path: string): Promise<void>

	/**
	 * Reads a directory and returns the contents.
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}
	 * @throws {import('./FileSystem/FileSystemException.ts').DirectoryNotFound}
	 * @since  0.1.1
	 */
	readDirectory(path: string): Promise<string[]>

	/**
	 * Reads a directory and returns the contents recursively.
	 *
	 * @param  {string}            path Path to directory.
	 * @return {Promise<string[]>}
	 * @throws {import('./FileSystem/FileSystemException.ts').DirectoryNotFound}
	 * @since  0.1.1
	 */
	readDirectoryRecursive(path: string): Promise<string[]>

	/**
	 * Deletes a directory.
	 *
	 * @param  {string}        path Path to directory.
	 * @return {Promise<void>}
	 * @throws {import('./FileSystem/FileSystemException.ts').DirectoryNotFound}
	 * @since  0.1.1
	 */
	deleteDirectory(path: string): Promise<void>

	/**
	 * Checks if a path is a directory.
	 *
	 * @param  {string}           path Path to directory.
	 * @return {Promise<boolean>}
	 * @throws {import('./FileSystem/FileSystemException.ts').DirectoryNotFound}
	 * @since  0.1.1
	 */
	isDirectory(path: string): Promise<boolean>

	/**
	 * Copies a file or directory to another location.
	 *
	 * @param  {string}        src  Source path.
	 * @param  {string}        dest Destination path.
	 * @return {Promise<void>}
	 * @throws {import('./FileSystem/FileSystemException.ts').FileSystemException}
	 * @since  0.1.1
	 */
	copy(src: string, dest: string): Promise<void>

	/**
	 * Moves a file or directory to another location.
	 *
	 * @param  {string}        src  Source path.
	 * @param  {string}        dest Destination path.
	 * @return {Promise<void>}
	 * @throws {import('./FileSystem/FileSystemException.ts').FileSystemException}
	 * @since  0.1.1
	 */
	move(src: string, dest: string): Promise<void>

	/**
	 * Checks if a file or directory exists.
	 *
	 * @param  {string}           path Path to file or directory.
	 * @return {Promise<boolean>}
	 * @since  0.1.1
	 */
	exists(path: string): Promise<boolean>
}
