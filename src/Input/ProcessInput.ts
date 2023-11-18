import { Configuration, Input } from './Input.ts'
import process from 'node:process'
import { ProcessConfigurator } from './ProcessConfigurator.ts'

/**
 * Gets process input.
 *
 * @since 0.1.3
 */
export class ProcessInput extends Input {
	/**
	 * Configuration data.
	 *
	 * @internal
	 * @since unreleased
	 */
	private readonly configuration: Configuration

	/**
	 * Constructs a process input object.
	 *
	 * @since unreleased
	 */
	public constructor() {
		super()

		this.configuration = new ProcessConfigurator(
			process.argv.slice(2),
		).getConfiguration()
	}

	/**
	 * Gets configuration data.
	 *
	 * @return {Promise<Configuration>} Configuration data.
	 * @since  unreleased
	 */
	public getConfiguration(): Promise<Configuration> {
		return new Promise((res) => res(this.configuration))
	}
}
