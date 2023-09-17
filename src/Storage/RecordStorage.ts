import { Storage } from './Storage.ts'

/**
 * Record from storage.
 *
 * @since unreleased
 */
export type StorageRecord = Record<string, unknown> & {
	id?: number
	type?: string
}

/**
 * Query describing records to retreive from storage.
 *
 * @since unreleased
 */
export interface RecordQuery extends StorageRecord {
	ids?: number[]
}

/**
 * Storage container which stores records.
 *
 * @since unreleased
 */
export interface RecordStorage extends Storage {
	/**
	 * Creates a new record in storage.
	 *
	 * @param  {StorageRecord} record Record to store.
	 * @return {Promise<void>}
	 * @throws {import('./RecordStorageException.ts').RecordNotCreated}
	 * @since  unreleased
	 */
	createRecord(record: StorageRecord): Promise<void>

	/**
	 * Creates multiple new records in storage.
	 *
	 * @param  {StorageRecord} record Records to store.
	 * @return {Promise<void>}
	 * @throws {import('./RecordStorageException.ts').RecordNotCreated}
	 * @since  unreleased
	 */
	createRecords(records: StorageRecord[]): Promise<void>

	/**
	 * Gets a record from storage.
	 *
	 * @param  {number}                 id   Record ID.
	 * @param  {string}                 type Record type.
	 * @return {Promise<StorageRecord>}      The record from storage.
	 * @throws {import('./RecordStorageException.ts').RecordNotFound}
	 * @since  unreleased
	 */
	getRecord(id: number, type: string): Promise<StorageRecord>

	/**
	 * Gets records from storage.
	 *
	 * @param  {RecordQuery}              query Query describing records to get.
	 * @return {Promise<StorageRecord[]>}       The records from storage.
	 * @since  unreleased
	 */
	getRecords(query: RecordQuery): Promise<StorageRecord[]>

	/**
	 * Updates an existing record.
	 *
	 * @param  {StorageRecord} record Existing record to update.
	 * @return {Promise<void>}
	 * @throws {import('./RecordStorageException.ts').RecordNotUpdated}
	 * @since  unreleased
	 */
	updateRecord(record: StorageRecord): Promise<void>

	/**
	 * Updates multiple existing records.
	 *
	 * @param  {StorageRecord[]} records Existing records to update.
	 * @return {Promise<void>}
	 * @since  unreleased
	 */
	updateRecords(records: StorageRecord[]): Promise<void>

	/**
	 * Deletes a record.
	 *
	 * @param  {StorageRecord} record [description].
	 * @return {Promise<void>}        [description].
	 * @throws {import('./RecordStorageException.ts').RecordNotDeleted}
	 * @since  unreleased
	 */
	deleteRecord(record: StorageRecord): Promise<void>

	/**
	 * Deletes multiple records.
	 *
	 * @param  {RecordQuery}   query Query describing records to delete.
	 * @return {Promise<void>}
	 * @since  unreleased
	 */
	deleteRecords(query: RecordQuery): Promise<void>
}
