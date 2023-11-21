/**
 * Command line options.
 *
 * @since unreleased
 */
export class CommandLineOptions {
	[index: string]: unknown

	#args: string[]
	#options: string[] = []

	/**
	 * Constructs process configuration object from args.
	 *
	 * @param {string[]} args Process args to build configuration from.
	 * @since unreleased
	 */
	public constructor(args: string[]) {
		this.#args = args

		this.setPrivateOptions()
		this.buildFromPrivateOptions()
		this.convertBooleanOptions()
	}

	/**
	 * Sets private options from process args, filtering out positional args.
	 *
	 * @internal
	 * @return {void}
	 * @since  unreleased
	 */
	private setPrivateOptions(): void {
		this.#options = this.#args.reduce(
			(allArgs: string[], currentArg: string, index: number) => {
				if (this.isPositionalArg(currentArg, index)) return allArgs

				const [arg, value] = currentArg.split('=')

				const args = this.splitShortFlagsToArgs(arg)

				return [...allArgs, ...args, value]
					.filter((item) => typeof item !== 'undefined')
					.map((value) => this.removeEnclosingQuotes(value))
			},
			[],
		)
	}

	/**
	 * Removes enclosing quotes from a string value.
	 *
	 * @param  {string} value String value which might have enclosing quotes.
	 * @return {string}       Value without enclosing quotes.
	 * @since  unreleased
	 */
	private removeEnclosingQuotes(value: string): string {
		return value.replaceAll(/(?<quote>^\\?['"]|\\?['"]$)/gu, '')
	}

	/**
	 * Sets properties from private options.
	 *
	 * @internal
	 * @return {void}
	 * @since  unreleased
	 */
	private buildFromPrivateOptions(): void {
		this.#options.forEach((option: string, index: number) => {
			if (!option.startsWith('-')) return

			if (
				this.#options[index + 1] &&
				!this.#options[index + 1].startsWith('-')
			) {
				this[option.replace(/^-+/u, '')] = this.#options[index + 1]
				return
			}

			this[option.replace(/^-+/u, '')] = true
		})
	}

	/**
	 * Converts string 'true'/'false' values to boolean true/false.
	 *
	 * @internal
	 * @return {void}
	 * @since unreleased
	 */
	private convertBooleanOptions(): void {
		for (const prop in this) {
			// @ts-expect-error -- Ok to set any property to boolean.
			if (this[prop] === 'true') this[prop] = true
			// @ts-expect-error -- Ok to set any property to boolean.
			else if (this[prop] === 'false') this[prop] = false
		}
	}

	/**
	 * Checks whether an arg at a given index is a positional arg.
	 *
	 * @internal
	 * @param  {string}  arg   Current arg being filtered.
	 * @param  {number}  index Current arg index.
	 * @return {boolean}       Whether the arg is a positional arg.
	 * @since  unreleased
	 * @todo   Refactor.
	 */
	private isPositionalArg(arg: string, index: number): boolean {
		const previousArg = this.#args[index - 1]

		return !(
			arg.startsWith('-') ||
			(previousArg?.startsWith('-') && !previousArg.includes('='))
		)
	}

	/**
	 * Splits any short flags into multiple arguments.
	 *
	 * @internal
	 * @param  {string}   arg Argument to split.
	 * @return {string[]}     Argument(s) after splitting.
	 * @example
	 * splitShortFlagsToArgs('abc') === ['abc']
	 * @example
	 * splitShortFlagsToArgs('--abc') === ['--abc']
	 * @example
	 * splitShortFlagsToArgs('-abc') === ['-a', '-b', '-c']
	 * @since  unreleased
	 */
	private splitShortFlagsToArgs(arg: string): string[] {
		return /^-[^-]/u.test(arg)
			? arg
					.slice(1)
					.split('')
					.map((letter) => `-${letter}`)
			: [arg]
	}
}
