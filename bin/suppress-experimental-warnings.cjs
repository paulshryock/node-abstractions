'use strict'

/** @see https://github.com/nodejs/node/issues/30810#issuecomment-1433950987 */
const process = require('node:process')
const { emit: originalEmit } = process

/**
 * Suppresses certain experimental warnings.
 *
 * @param  {string}    event Event type.
 * @param  {Error}     error Event error object.
 * @return {false|any}       False or calls the original emitter function.
 * @since  0.1.1
 */
function suppresser(event, error) {
	if (
		event === 'warning' &&
		error.name === 'ExperimentalWarning' &&
		error.message.includes('Custom ESM Loader')
	)
		return false

	return originalEmit.apply(process, [event, error])
}

process.emit = suppresser
