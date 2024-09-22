import { stderr, stdin, stdout } from 'node:process'
import { Duplex } from 'node:stream'

/**
 * Command line interface streams.
 *
 * @since 0.2.0
 */
export type Streams = {
	stderr: Duplex
	stdin: Duplex
	stdout: Duplex
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
