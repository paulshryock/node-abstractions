import { Configuration } from '../Configuration/Configuration.ts'
import { Input } from './Input.ts'
import process from 'node:process'
import { ProcessConfigurator } from '../Configurator/ProcessConfigurator.ts'

/**
 * Process input class.
 *
 * @since 0.1.3
 */
export class ProcessInput extends Input {
	/**
	 * Gets configuration data.
	 *
	 * @return {Configuration} Configuration data.
	 * @since  unreleased
	 */
	public getConfiguration(): Configuration {
		return new ProcessConfigurator(process.argv.slice(2)).getConfiguration()
	}

	/**
	 * Gets a configuration option's value.
	 *
	 * @param  {string}  option Configuration option to get.
	 * @return {unknown}        Configuration option's value.
	 * @since  unreleased
	 */
	public getConfigurationOption(option: string): unknown {
		return this.getConfiguration()[option]
	}
}
