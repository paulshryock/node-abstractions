import { Storage } from './Storage.ts'

/**
 * Record from storage.
 *
 * @alpha
 * @since 0.1.1
 */
export type StorageRecord = Record<string, unknown> & {
	id?: number
	type?: string
}

/**
 * Query describing records to retreive from storage.
 *
 * @since 0.1.1
 */
export interface RecordQuery extends StorageRecord {
	ids?: number[]
}

/**
 * Storage container which stores records.
 *
 * @since 0.1.1
 */
export interface RecordStorage extends Storage {
	/**
	 * Creates a new record in storage.
	 *
	 * @param  {StorageRecord} record Record to store.
	 * @return {Promise<void>}
	 * @throws {import('./RecordStorageException.ts').RecordNotCreated}
	 * @since  0.1.1
	 */
	create(record: StorageRecord): Promise<void>

	/**
	 * Creates multiple new records in storage.
	 *
	 * @param  {StorageRecord} records Records to store.
	 * @return {Promise<void>}
	 * @throws {import('./RecordStorageException.ts').RecordNotCreated}
	 * @since  0.1.1
	 */
	createMany(records: StorageRecord[]): Promise<void>

	/**
	 * Gets a record from storage.
	 *
	 * @param  {number}                 id   Record ID.
	 * @param  {string}                 type Record type.
	 * @return {Promise<StorageRecord>}      The record from storage.
	 * @throws {import('./RecordStorageException.ts').RecordNotFound}
	 * @since  0.1.1
	 */
	get(id: number, type: string): Promise<StorageRecord>

	/**
	 * Gets records from storage.
	 *
	 * @param  {RecordQuery}              query Query describing records to get.
	 * @return {Promise<StorageRecord[]>}       The records from storage.
	 * @since  0.1.1
	 */
	getMany(query: RecordQuery): Promise<StorageRecord[]>

	/**
	 * Updates an existing record.
	 *
	 * @param  {StorageRecord} record Existing record to update.
	 * @return {Promise<void>}
	 * @throws {import('./RecordStorageException.ts').RecordNotUpdated}
	 * @since  0.1.1
	 */
	update(record: StorageRecord): Promise<void>

	/**
	 * Updates multiple existing records.
	 *
	 * @param  {StorageRecord[]} records Existing records to update.
	 * @return {Promise<void>}
	 * @since  0.1.1
	 */
	updateMany(records: StorageRecord[]): Promise<void>

	/**
	 * Deletes a record.
	 *
	 * @param  {StorageRecord} record [description].
	 * @return {Promise<void>}        [description].
	 * @throws {import('./RecordStorageException.ts').RecordNotDeleted}
	 * @since  0.1.1
	 */
	delete(record: StorageRecord): Promise<void>

	/**
	 * Deletes multiple records.
	 *
	 * @param  {RecordQuery}   query Query describing records to delete.
	 * @return {Promise<void>}
	 * @since  0.1.1
	 */
	deleteMany(query: RecordQuery): Promise<void>
}
