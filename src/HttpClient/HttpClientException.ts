import { Exception } from '../Exception/Exception.ts'

/**
 * Exception thrown by an HTTP client.
 *
 * @since unreleased
 */
export class HttpClientException extends Exception {}

/**
 * HTTP network failure exception.
 *
 * @since unreleased
 */
export class NetworkFailure extends HttpClientException {}

/**
 * HTTP request aborted exception.
 *
 * @since unreleased
 */
export class RequestAborted extends HttpClientException {}
