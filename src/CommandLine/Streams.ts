import { Readable, Writable } from 'node:stream'
import { stderr, stdin, stdout } from 'node:process'

/**
 * Command line interface streams.
 *
 * @since 0.2.0
 */
export type Streams = {
	stderr: Writable
	stdin: Readable
	stdout: Writable
}

/**
 * Default command line interface streams.
 *
 * @since 0.2.0
 */
export const STREAMS: Streams = {
	stderr,
	stdin,
	stdout,
}
