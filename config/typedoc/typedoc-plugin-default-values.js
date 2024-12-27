import {
	Application,
	Context,
	Converter,
	Reflection,
	TypeScript,
} from 'typedoc'

/**
 * Loads TypeDoc plugin.
 *
 * @param  {{ application: Application }} options Plugin load options.
 * @return {void}
 *
 * @since  0.1.1
 */
export function load({ application }) {
	const plugin = new DefaultValuesPlugin(new Map())

	application.converter.on(
		Converter.EVENT_CREATE_DECLARATION,
		plugin.save.bind(plugin),
	)

	application.converter.on(
		Converter.EVENT_CREATE_PARAMETER,
		plugin.save.bind(plugin),
	)

	application.converter.on(
		Converter.EVENT_RESOLVE_BEGIN,
		plugin.clear.bind(plugin),
	)
}

/**
 * Default values plugin class.
 *
 * @since 0.1.1
 */
class DefaultValuesPlugin {
	/** @var {Map<Reflection, string>} defaultValues Map of default values. */
	defaultValues

	/** @var {TypeScript.printer} printer TypeScript printer. */
	printer

	/**
	 * DefaultValuesPlugin class constructor.
	 *
	 * @param {Map<Reflection, string>} defaultValues Map of default values.
	 *
	 * @since 0.1.1
	 */
	constructor(defaultValues = new Map()) {
		this.defaultValues = defaultValues
		this.printer = TypeScript.createPrinter({
			omitTrailingSemicolon: true,
			removeComments: true,
		})
	}

	/**
	 * Saves default values.
	 *
	 * @param  {Context}    _context   Current state the converter is in.
	 * @param  {Reflection} reflection Reflection instance.
	 * @return {void}
	 *
	 * @since  0.1.1
	 */
	save(_context, reflection) {
		const node = this.#getReflectionNode(reflection)

		if (!node?.initializer) return

		this.defaultValues.set(
			reflection,
			this.printer.printNode(
				TypeScript.EmitHint.Expression,
				node.initializer,
				node.getSourceFile(),
			),
		)
	}

	/**
	 * Clears default values.
	 *
	 * @return {void}
	 *
	 * @since  0.1.1
	 */
	clear() {
		for (const [refl, init] of this.defaultValues) refl.defaultValue = init

		this.defaultValues.clear()
	}

	/**
	 * Gets the first declared reflection node.
	 *
	 * @param  {Reflection} reflection Reflection instance.
	 * @return {unknown}               Reflection node.
	 *
	 * @since  0.2.0
	 */
	#getReflectionNode(reflection) {
		return reflection.project.getSymbolFromReflection(reflection)
			?.declarations?.[0]
	}
}
