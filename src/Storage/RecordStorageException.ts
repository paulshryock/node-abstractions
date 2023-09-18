import { StorageException } from './StorageException.ts'

/**
 * Record storage exception.
 *
 * @since 0.1.1
 */
export class RecordStorageException extends StorageException {}

/**
 * Record not created exception.
 *
 * @since 0.1.1
 */
export class RecordNotCreated extends RecordStorageException {}

/**
 * Record not found exception.
 *
 * @since 0.1.1
 */
export class RecordNotFound extends RecordStorageException {}

/**
 * Record not updated exception.
 *
 * @since 0.1.1
 */
export class RecordNotUpdated extends RecordStorageException {}

/**
 * Record not deleted exception.
 *
 * @since 0.1.1
 */
export class RecordNotDeleted extends RecordStorageException {}
