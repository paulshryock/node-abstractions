import jestConfig from './jest.config.ts'

export default {
	...jestConfig,
	collectCoverage: false,
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'../../src/[./a-zA-Z0-9$_-]+\\.ts': '../../dist/index.js',
	},
}
