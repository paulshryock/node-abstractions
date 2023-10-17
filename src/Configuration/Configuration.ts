import { DTO } from '../DTO/DTO.ts'

/**
 * Configuration data.
 *
 * @since unreleased
 */
export class Configuration implements DTO {
	[index: string]: unknown

	/**
	 * Constructs configuration data.
	 *
	 * @param {DTO} dto Raw data to construct.
	 * @since unreleased
	 */
	public constructor(dto: DTO) {
		for (const property in dto) this[property] = dto[property]
	}
}
