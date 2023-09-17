import { StorageException } from './StorageException.ts'

/**
 * Record storage exception.
 *
 * @since unreleased
 */
export class RecordStorageException extends StorageException {}

/**
 * Record not created exception.
 *
 * @since unreleased
 */
export class RecordNotCreated extends RecordStorageException {}

/**
 * Record not found exception.
 *
 * @since unreleased
 */
export class RecordNotFound extends RecordStorageException {}

/**
 * Record not updated exception.
 *
 * @since unreleased
 */
export class RecordNotUpdated extends RecordStorageException {}

/**
 * Record not deleted exception.
 *
 * @since unreleased
 */
export class RecordNotDeleted extends RecordStorageException {}
