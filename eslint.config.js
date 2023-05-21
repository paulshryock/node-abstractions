import eslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import * as typescriptEslintParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintJsonPlugin from 'eslint-plugin-json'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
	{ ignores: ['.cache/', 'coverage/', 'dist/'] },
	{
		files: ['**/*'],
		languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
		linterOptions: {
			noInlineConfig: false,
			reportUnusedDisableDirectives: true,
		},
		plugins: { '@eslint-community/eslint-comments': eslintComments },
		rules: {
			...js.configs.recommended.rules,
			...eslintComments.configs.recommended.rules,
			'@eslint-community/eslint-comments/no-unused-disable': ['error'],
			'@eslint-community/eslint-comments/require-description': [
				'error',
				{ ignore: ['eslint-enable'] },
			],
		},
	},
	{
		files: ['**/*.cjs'],
		languageOptions: { ecmaVersion: 'latest', sourceType: 'commonjs' },
	},
	{
		files: ['**/*.json'],
		plugins: { json: eslintJsonPlugin },
		processor: eslintJsonPlugin.processors['.json'],
		rules: eslintJsonPlugin.configs.recommended.rules,
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			ecmaVersion: 'latest',
			parser: typescriptEslintParser,
			parserOptions: {
				ecmaVersion: 'latest',
				project: ['./tsconfig.json'],
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
			sourceType: 'module',
		},
		plugins: { '@typescript-eslint': typescriptEslint },
		rules: {
			...typescriptEslint.configs['eslint-recommended'].overrides.reduce(
				(all, override) => ({ ...all, ...override.rules }),
				{},
			).rules,
			...typescriptEslint.configs['recommended'].rules,
			...typescriptEslint.configs['recommended-requiring-type-checking'].rules,
		},
	},
	eslintConfigPrettier,
]
