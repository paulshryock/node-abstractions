import process from 'node:process'

export type Configuration = Record<string, unknown>

/**
 * @internal
 * @since unreleased
 */
type EnvironmentVariable = string | number | boolean | undefined

/**
 * @internal
 * @since unreleased
 */
interface EnvironmentVariables {
	[index: string]: EnvironmentVariable
}

/**
 * Input class.
 *
 * @since unreleased
 */
export abstract class Input {
	/**
	 * Gets an environment variable value, if it is defined.
	 *
	 * @param  {string}              name Name of environment variable to get.
	 * @return {EnvironmentVariable}      Environment variable value.
	 * @since  unreleased
	 */
	public getEnvironmentVariable(name: string): EnvironmentVariable {
		return process.env[name]
	}

	/**
	 * Gets multiple environment variable values, if they are defined.
	 *
	 * @param  {string[]}             names Names of environment variables to get.
	 * @return {EnvironmentVariables}       Environment variable values.
	 * @since  unreleased
	 */
	public getEnvironmentVariables(names: string[]): EnvironmentVariables {
		return names.reduce((all, name) => {
			const value = process.env[name]

			if (typeof value === 'undefined') return all

			return { ...all, [name]: value }
		}, {})
	}

	/**
	 * Gets configuration data.
	 *
	 * @return {Promise<Configuration>} Configuration data.
	 * @since  unreleased
	 */
	public abstract getConfiguration(): Promise<Configuration>

	/**
	 * Gets a configuration option's value.
	 *
	 * @param  {string}           option Configuration option to get.
	 * @return {Promise<unknown>}        Configuration option's value.
	 * @since  unreleased
	 */
	public async getConfigurationOption(option: string): Promise<unknown> {
		return (await this.getConfiguration())[option]
	}
}
