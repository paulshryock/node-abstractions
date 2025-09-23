/** @import { HttpClientException } from './HttpClientException.ts' */

/**
 * Sends requests and returns responses.
 *
 * Inspired by PSR-18.
 *
 * @see   {@link https://www.php-fig.org/psr/psr-18/#clientinterface}
 *
 * @since unreleased
 */
export interface PsrHttpClient {
	/**
	 * Sends a request and returns a response.
	 *
	 * @param  {Request}           request HTTP request to send.
	 * @return {Promise<Response>}         HTTP response.
	 * @throws {HttpClientException}
	 *
	 * @since  unreleased
	 */
	sendRequest(request: Request): Promise<Response>
}
