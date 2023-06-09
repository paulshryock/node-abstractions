/** @see https://github.com/nodejs/node/issues/30810#issuecomment-1433950987 */
const process = require('node:process')
const { emit: originalEmit } = process

function suppresser(event, error) {
	if (
		event === 'warning' &&
		error.name === 'ExperimentalWarning' &&
		error.message.includes('Custom ESM Loader')
	)
		return false

	return originalEmit.apply(process, arguments)
}

process.emit = suppresser
