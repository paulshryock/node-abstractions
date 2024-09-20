import { stderr, stdin, stdout } from 'node:process'
import { Duplex } from 'node:stream'

/**
 * Command line interface streams.
 *
 * @since unreleased
 */
export type Streams = {
	stderr: Duplex
	stdin: Duplex
	stdout: Duplex
}

/**
 * Default command line interface streams.
 *
 * @since unreleased
 */
export const STREAMS: Streams = {
	stderr,
	stdin,
	stdout,
}
