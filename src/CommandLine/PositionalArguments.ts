/**
 * @internal
 * @since 0.2.0
 */
export class PositionalArguments {
	/**
	 * Positional arguments from current process.
	 *
	 * @since 0.2.0
	 */
	readonly #positionalArguments: string[]

	/**
	 * Filters positional arguments from a list of all process arguments.
	 *
	 * @param {string[]} args All process arguments.
	 * @since 0.2.0
	 */
	public constructor(args: string[]) {
		this.#positionalArguments = args.filter(
			(arg: string, index: number, args: string[]): boolean => {
				const previousArg = args[index - 1]

				return !(
					arg.startsWith('-') ||
					(previousArg?.startsWith('-') && !previousArg.includes('='))
				)
			},
		)
	}

	/**
	 * Returns positional arguments as an array.
	 *
	 * @return {string[]} Positional arguments represented as an array.
	 * @since  0.2.0
	 */
	public toArray(): string[] {
		return this.#positionalArguments
	}
}
