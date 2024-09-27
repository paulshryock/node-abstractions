import {
	HttpClientException,
	NetworkFailure,
	RequestAborted,
} from './HttpClientException.ts'
import { FinalClassWasExtended } from '../Exception/Exception.ts'

/**
 * Possible response body types.
 *
 * @since unreleased
 */
type ResponseBody = ReadableStream | string | null

/**
 * Fetch API HTTP client.
 *
 * @since unreleased
 */
export class FetchHttpClient {
	/**
	 * Constructs a Fetch API HTTP client.
	 *
	 * @throws {FinalClassWasExtended}
	 * @since unreleased
	 */
	public constructor() {
		if (new.target !== FetchHttpClient)
			throw new FinalClassWasExtended(FetchHttpClient)
	}

	/**
	 * Sends a request and returns a response.
	 *
	 * @param  {Request}           request HTTP request to send.
	 * @return {Promise<Response>}         HTTP response.
	 * @throws {HttpClientException}
	 * @since  unreleased
	 */
	public async sendRequest(request: Request): Promise<Response> {
		return fetch(request).catch((exception) => {
			if (this.#isAbortSignalException(exception))
				throw new RequestAborted(`${request.signal.reason}`, {
					cause: request.signal.reason,
				})

			if (exception instanceof TypeError)
				throw new NetworkFailure('network failure', { cause: exception })

			throw new HttpClientException('unexpected http exception', {
				cause: exception,
			})
		})
	}

	/**
	 * Gets a response body based on the Content-Type HTTP header or lack thereof.
	 *
	 * @param  {Response}              response Response to get body from.
	 * @return {Promise<ResponseBody>}          Response body by Content-Type.
	 * @since  unreleased
	 */
	public async getResponseBody(response: Response): Promise<ResponseBody> {
		const contentType = this.#getContentType(response)

		if (['text/plain', 'text/html'].includes(contentType))
			return response.text()

		return response.body
	}

	/**
	 * Gets a response's Content-Type HTTP header value.
	 *
	 * @param  {Response} response HTTP response to get the Content-Type from.
	 * @return {string}            Content-Type header value.
	 * @since  unreleased
	 */
	#getContentType(response: Response): string {
		return `${response.headers.get('Content-Type')?.split(';')?.[0]}`
	}

	/**
	 * Checks if an exception is from an abort signal.
	 *
	 * @param  {unknown} exception Maybe an abort signal exception.
	 * @return {boolean}           Whether the exception is from an abort signal.
	 * @since  unreleased
	 */
	#isAbortSignalException(exception: unknown): boolean {
		return exception instanceof DOMException && exception.name === 'AbortError'
	}
}
