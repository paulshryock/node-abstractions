import { Exception } from '../Exception/Exception.ts'

/**
 * File system exception message.
 *
 * @since 0.1.1
 */
export enum FileSystemExceptionMessage {
	DirectoryAlreadyExists = 'Directory already exists.',
	DirectoryNotFound = 'Directory not found.',
	FileNotFound = 'File not found.',
	FileOrDirectoryNotFound = 'File or directory not found.',
	FileSystemException = 'File system exception.',
}

/**
 * File system exception.
 *
 * @since 0.1.1
 */
export class FileSystemException extends Exception {
	/**
	 * FileSystemException class constructor.
	 *
	 * @param {string}       path    Path to directory.
	 * @param {ErrorOptions} options Error options.
	 * @since 0.1.1
	 */
	public constructor(
		public readonly path: string,
		options?: ErrorOptions,
	) {
		super(
			FileSystemExceptionMessage[
				new.target.name as keyof typeof FileSystemExceptionMessage
			],
			options,
		)
	}
}

/**
 * Directory already exists exception.
 *
 * @since 0.1.1
 */
export class DirectoryAlreadyExists extends FileSystemException {}

/**
 * File or directory not found exception.
 *
 * @since 0.1.1
 */
export class FileOrDirectoryNotFound extends FileSystemException {}

/**
 * Directory not found exception.
 *
 * @since 0.1.1
 */
export class DirectoryNotFound extends FileOrDirectoryNotFound {}

/**
 * File not found exception.
 *
 * @since 0.1.1
 */
export class FileNotFound extends FileOrDirectoryNotFound {}
