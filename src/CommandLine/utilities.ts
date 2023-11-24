import { stderr, stdin, stdout } from 'node:process'
import { Duplex } from 'node:stream'

/**
 * Command line interface streams.
 *
 * @since unreleased
 */
export type CommandLineStreams = {
	stderr: Duplex
	stdin: Duplex
	stdout: Duplex
}

/**
 * Default command line interface streams.
 *
 * @since unreleased
 */
export const COMMAND_LINE_STREAMS: CommandLineStreams = {
	stderr,
	stdin,
	stdout,
}
