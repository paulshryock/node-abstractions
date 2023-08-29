'use strict'

module.exports = {
	entryPoints: ['./src/index.ts'],
	out: './dist/docs',
	plugin: ['./config/typedoc/typedoc-plugin-default-values.js'],
}
