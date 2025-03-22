import {
	HttpClientException,
	NetworkFailure,
	RequestAborted,
} from './HttpClientException.ts'
import { FinalClassWasExtended } from '../Exception/Exception.ts'

/**
 * Sends requests and returns responses.
 *
 * Inspired by PSR-18.
 *
 * @see   {@link https://www.php-fig.org/psr/psr-18/#clientinterface}
 *
 * @since 0.3.0
 */
export class HttpClient {
	/**
	 * Constructs a Fetch API HTTP client.
	 *
	 * @throws {FinalClassWasExtended}
	 *
	 * @since 0.3.0
	 */
	public constructor() {
		if (new.target !== HttpClient) throw new FinalClassWasExtended(HttpClient)
	}

	/**
	 * Sends a request and returns a response.
	 *
	 * @param  {Request}           request HTTP request to send.
	 * @return {Promise<Response>}         HTTP response.
	 * @throws {HttpClientException}
	 *
	 * @since  0.3.0
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
	 * Checks if an exception is from an abort signal.
	 *
	 * @param  {unknown} exception Maybe an abort signal exception.
	 * @return {boolean}           Whether the exception is from an abort signal.
	 *
	 * @since  0.3.0
	 */
	#isAbortSignalException(exception: unknown): boolean {
		return exception instanceof DOMException && exception.name === 'AbortError'
	}
}
