import { Exception } from '../Exception/Exception.ts'

export enum FileSystemExceptionMessage {
	FileSystemException = 'File system exception.',
	DirectoryAlreadyExists = 'Directory already exists.',
	DirectoryNotFound = 'Directory not found.',
	FileNotFound = 'File not found.',
	FileOrDirectoryNotFound = 'File or directory not found.',
}

/**
 * File system exception.
 *
 * @since unreleased
 */
export class FileSystemException extends Exception {
	/**
	 * FileSystemException class constructor.
	 *
	 * @since unreleased
	 * @param {string}       path    Path to directory.
	 * @param {ErrorOptions} options Error options.
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
 * @since unreleased
 */
export class DirectoryAlreadyExists extends FileSystemException {}

/**
 * Directory not found exception.
 *
 * @since unreleased
 */
export class DirectoryNotFound extends FileSystemException {}

/**
 * File not found exception.
 *
 * @since unreleased
 */
export class FileNotFound extends FileSystemException {}

/**
 * File or directory not found exception.
 *
 * @since unreleased
 */
export class FileOrDirectoryNotFound extends FileSystemException {}
