import { Configuration, Input } from './Input.ts'
import { Entries } from '../utilities/primitives.ts'

type ContentTypeHandler = (configuration: Configuration) => Promise<void>

type ContentTypeHandlers = Record<string, ContentTypeHandler>

/**
 * Network input class.
 *
 * @since unreleased
 * @deprecated
 */
export class NetworkInput extends Input {
	/**
	 * @internal
	 * @since unreleased
	 */
	private contentTypes: ContentTypeHandlers = {
		'application/json': async (configurationMutable: Configuration) => {
			configurationMutable.json = await this.request.json()
		},
		'application/x-www-form-urlencoded': async (
			configurationMutable: Configuration,
		) => {
			const { origin, pathname, search } = new URL(this.request.url)
			configurationMutable.queryParams = this.entriesToObject(
				new URL(
					`${origin}${pathname}${decodeURIComponent(search)}`,
				).searchParams.entries(),
			)
			return Promise.resolve()
		},
		default: async (configurationMutable: Configuration) => {
			configurationMutable.text = await this.request.text()
		},
		'multipart/form-data': async (configurationMutable: Configuration) => {
			configurationMutable.formData = this.entriesToObject(
				(await this.request.formData()).entries(),
			)
		},
	}

	/**
	 * Constructs a network input class to extract information from a request.
	 *
	 * @param {Request} request Network request to extract information from.
	 * @since unreleased
	 */
	public constructor(private readonly request: Request) {
		super()
	}

	/**
	 * Gets configuration data.
	 *
	 * @return {Promise<Configuration>} Configuration data.
	 * @since  unreleased
	 * @todo   Refactor.
	 */
	public async getConfiguration(): Promise<Configuration> {
		const configuration: Configuration = {
			headers: this.entriesToObject(this.request.headers.entries()),
			method: this.request.method,
			queryParams: this.entriesToObject(
				new URL(this.request.url).searchParams.entries(),
			),
			url: this.request.url,
		}

		const hash = new URL(this.request.url).hash.replace(/^#/u, '')
		if (hash) configuration.hash = hash

		await this.getContentTypeHandler()(configuration)

		return configuration
	}

	/**
	 * Gets content type handler.
	 *
	 * @return {ContentTypeHandler} Handler for the current request content type.
	 * @since  unreleased
	 */
	private getContentTypeHandler(): ContentTypeHandler {
		return (
			this.contentTypes[this.getRequestContentType()] ??
			this.contentTypes.default
		)
	}

	/**
	 * Gets request content type.
	 *
	 * @return {string} Content type of the current network request.
	 * @since  unreleased
	 */
	private getRequestContentType(): string {
		const [contentType] = (
			this.request.headers.get('Content-Type') ?? ''
		).split(';')

		return contentType
	}

	/**
	 * Combines iterable entries into an object of key:value pairs.
	 *
	 * @internal
	 * @param  {Entries}       entries Entries to combine.
	 * @return {Configuration}         Combined object of entries.
	 * @since  unreleased
	 */
	private entriesToObject(entries: Entries): Configuration {
		return [...entries].reduce(
			(all, [key, value]) => ({ ...all, [key]: value }),
			{},
		)
	}
}
