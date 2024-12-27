import { Exception } from '../Exception/Exception.ts'

/**
 * Exception thrown by an HTTP client.
 *
 * @since 0.3.0
 */
export class HttpClientException extends Exception {}

/**
 * HTTP network failure exception.
 *
 * @since 0.3.0
 */
export class NetworkFailure extends HttpClientException {}

/**
 * HTTP request aborted exception.
 *
 * @since 0.3.0
 */
export class RequestAborted extends HttpClientException {}
