import process from 'node:process'

type Configuration = Record<string, unknown>

/**
 * Process input class.
 *
 * @since unreleased
 */
export class ProcessInput {
	/**
	 * Gets process arguments, if there are any.
	 *
	 * @return {string[]} Process arguments, if there are any.
	 * @since  unreleased
	 */
	public getArguments(): string[] {
		return process.argv.slice(2)
	}

	/**
	 * Gets an environment variable, if it is defined.
	 *
	 * @param  {string}  key Environment variable name.
	 * @return {unknown}     Environment variable value.
	 * @since  unreleased
	 */
	public getEnvironmentVariable(key: string): unknown {
		return process.env[key]
	}

	/**
	 * Gets environment variables.
	 *
	 * @param  {string[]}           keys Names of environment variables to get.
	 * @return {typeof process.env}      Environment variable values.
	 * @since  unreleased
	 */
	public getEnvironmentVariables(keys: string[]): typeof process.env {
		return keys.reduce((output, key) => {
			return {
				...output,
				[key]: process.env[key],
			}
		}, {})
	}

	/**
	 * Gets long flags.
	 *
	 * @return {Configuration} Long flag key value pairs.
	 * @since  unreleased
	 * @todo   Refactor.
	 */
	public getLongFlags(): Configuration {
		const flags: Configuration = {}
		const args = this.getArguments()

		for (let index = 0; index < args.length; index++) {
			const arg = args[index]

			if (!arg.startsWith('--')) continue

			this.parseArgFromArgsAtIndexToFlags(args, index, flags)
		}

		this.convertFalseFlagsToBoolean(flags)

		return flags
	}

	/**
	 * Converts "false" flags to boolean false.
	 *
	 * @param  {Configuration} flagsMutable Flags to mutate.
	 * @return {void}
	 * @since  unreleased
	 */
	private convertFalseFlagsToBoolean(flagsMutable: Configuration): void {
		for (const flag in flagsMutable)
			if (flagsMutable[flag] === 'false') flagsMutable[flag] = false
	}

	/**
	 * Parses arg from args at index to flags.
	 *
	 * @param  {string[]}      args         All arguments.
	 * @param  {number}        index        Current index.
	 * @param  {Configuration} flagsMutable Flags to mutate.
	 * @return {void}
	 * @since  unreleased
	 */
	private parseArgFromArgsAtIndexToFlags(
		args: string[],
		index: number,
		flagsMutable: Configuration,
	): void {
		const arg = args[index]

		if (arg.includes('=')) return this.splitArgAtEquals(arg, flagsMutable)

		if (this.argAtIndexHasValue(args, index)) {
			flagsMutable[arg.slice(2)] = true
			return
		}

		flagsMutable[arg.slice(2)] = args[index + 1]
	}

	/**
	 * Check if arg at index has a value.
	 *
	 * @param  {string[]} args  All args.
	 * @param  {number}   index Index to check.
	 * @return {boolean}        Whether the arg has a value.
	 * @since  unreleased
	 */
	private argAtIndexHasValue(args: string[], index: number): boolean {
		return (
			typeof args[index + 1] === 'undefined' || args[index + 1].startsWith('--')
		)
	}

	/**
	 * Splits an arg by "=" and assigns flag.
	 *
	 * @param  {string}        arg          Arg to split.
	 * @param  {Configuration} flagsMutable Flags to mutate.
	 * @return {void}
	 * @since  unreleased
	 */
	private splitArgAtEquals(arg: string, flagsMutable: Configuration): void {
		const [key, value] = arg.split('=')
		flagsMutable[key.slice(2)] = value
	}
}
