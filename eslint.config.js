import * as typescriptEslintParser from '@typescript-eslint/parser'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintJsonPlugin from 'eslint-plugin-json'
import { fileURLToPath as fileUrlToPath } from 'node:url'
import jest from 'eslint-plugin-jest'
import js from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import path from 'node:path'
import typescriptEslint from '@typescript-eslint/eslint-plugin'

const __filename = fileUrlToPath(import.meta.url)
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
		plugins: { '@eslint-community/eslint-comments': eslintComments, jsdoc },
		rules: {
			...js.configs.recommended.rules,
			...eslintComments.configs.recommended.rules,
			'@eslint-community/eslint-comments/no-unused-disable': 'error',
			'@eslint-community/eslint-comments/require-description': [
				'error',
				{ ignore: ['eslint-enable'] },
			],
			'block-scoped-var': 'error',
			camelcase: 'error',
			complexity: ['error', 4],
			curly: ['error', 'multi-or-nest'],
			'default-case': 'error',
			'default-case-last': 'error',
			'default-param-last': 'error',
			'dot-notation': 'error',
			eqeqeq: 'error',
			'func-name-matching': 'error',
			'func-names': 'error',
			'func-style': ['error', 'declaration'],
			'grouped-accessor-pairs': ['error', 'getBeforeSet'],
			'id-denylist': ['error', 'data', 'err', 'e', 'cb', 'callback'],
			'jsdoc/check-access': 'error',
			'jsdoc/check-alignment': 'error',
			'jsdoc/check-line-alignment': ['error', 'always'],
			'jsdoc/check-param-names': 'error',
			'jsdoc/check-property-names': 'error',
			'jsdoc/check-syntax': 'error',
			'jsdoc/check-tag-names': [
				'error',
				{ definedTags: ['alpha', 'beta'], typed: true },
			],
			'jsdoc/check-types': 'error',
			'jsdoc/empty-tags': 'error',
			'jsdoc/implements-on-classes': 'error',
			'jsdoc/informative-docs': 'error',
			'jsdoc/match-description': [
				'error',
				{
					tags: {
						since: {
							match:
								'^((\\d+.\\d+.\\d+(-(alpha|beta|rc).\\d+)?)|(unreleased))( - .+)?$',
							message:
								'Valid SemVer or unreleased, optionally with description',
						},
					},
				},
			],
			'jsdoc/multiline-blocks': 'error',
			'jsdoc/no-bad-blocks': 'error',
			'jsdoc/no-blank-block-descriptions': 'error',
			'jsdoc/no-defaults': 'error',
			'jsdoc/no-multi-asterisks': 'error',
			'jsdoc/no-undefined-types': 'error',
			'jsdoc/require-asterisk-prefix': 'error',
			'jsdoc/require-description': 'error',
			'jsdoc/require-description-complete-sentence': 'error',
			'jsdoc/require-hyphen-before-param-description': ['error', 'never'],
			'jsdoc/require-jsdoc': [
				'error',
				{
					enableFixer: false,
					require: {
						ClassDeclaration: true,
						FunctionDeclaration: true,
						MethodDefinition: true,
					},
				},
			],
			'jsdoc/require-param': 'error',
			'jsdoc/require-param-description': 'error',
			'jsdoc/require-param-name': 'error',
			'jsdoc/require-param-type': 'error',
			'jsdoc/require-property': 'error',
			'jsdoc/require-property-description': 'error',
			'jsdoc/require-property-name': 'error',
			'jsdoc/require-property-type': 'error',
			'jsdoc/require-returns': [
				'error',
				{ forceRequireReturn: true, forceReturnsWithAsync: true },
			],
			'jsdoc/require-returns-check': 'error',
			'jsdoc/require-returns-description': 'error',
			'jsdoc/require-returns-type': 'error',
			'jsdoc/require-throws': 'error',
			'jsdoc/require-yields': 'error',
			'jsdoc/require-yields-check': 'error',
			'jsdoc/sort-tags': 'error',
			'jsdoc/tag-lines': ['error', 'never', { startLines: 1 }],
			'jsdoc/valid-types': 'error',
			'max-depth': ['error', 4],
			'max-lines': [
				'error',
				{ max: 500, skipBlankLines: true, skipComments: true },
			],
			'max-lines-per-function': [
				'warn',
				{ IIFEs: true, max: 15, skipBlankLines: true, skipComments: true },
			],
			'max-params': ['error', 3],
			'multiline-comment-style': 'error',
			'new-cap': 'error',
			'no-alert': 'warn',
			'no-array-constructor': 'error',
			'no-bitwise': 'error',
			'no-caller': 'error',
			'no-case-declarations': 'error',
			'no-console': 'error',
			'no-delete-var': 'error',
			'no-else-return': 'error',
			'no-empty': ['error', { allowEmptyCatch: true }],
			'no-empty-function': ['error', { allow: ['constructors'] }],
			'no-empty-static-block': 'error',
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-label': 'error',
			'no-floating-decimal': 'error',
			'no-implicit-coercion': 'error',
			'no-implicit-globals': 'error',
			'no-implied-eval': 'error',
			'no-inline-comments': 'error',
			'no-invalid-this': 'error',
			'no-iterator': 'error',
			'no-label-var': 'error',
			'no-labels': 'error',
			'no-lone-blocks': 'error',
			'no-lonely-if': 'error',
			'no-loop-func': 'error',
			'no-mixed-operators': 'error',
			'no-multi-assign': 'error',
			'no-multi-str': 'error',
			'no-negated-condition': 'error',
			'no-nested-ternary': 'error',
			'no-new': 'error',
			'no-new-func': 'error',
			'no-new-object': 'error',
			'no-new-wrappers': 'error',
			'no-nonoctal-decimal-escape': 'error',
			'no-octal-escape': 'error',
			'no-param-reassign': [
				'error',
				{ ignorePropertyModificationsForRegex: ['Mutable$'], props: true },
			],
			'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
			'no-proto': 'error',
			'no-restricted-globals': [
				'error',
				{ message: 'Use Number.isNaN instead.', name: 'isNaN' },
			],
			'no-return-assign': ['error', 'except-parens'],
			'no-return-await': 'off',
			'no-script-url': 'error',
			'no-sequences': 'off',
			'no-throw-literal': 'error',
			'no-undef': 'off',
			'no-undef-init': 'error',
			'no-undefined': 'error',
			'no-underscore-dangle': [
				'error',
				{
					allow: ['__dirname', '__filename'],
					enforceInClassFields: true,
					enforceInMethodNames: true,
				},
			],
			'no-unneeded-ternary': ['error', { defaultAssignment: false }],
			'no-unused-expressions': [
				'error',
				{ allowShortCircuit: true, allowTernary: true },
			],
			'no-useless-call': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'no-useless-rename': 'error',
			'no-useless-return': 'error',
			'no-var': 'error',
			'no-void': 'error',
			'no-warning-comments': 'warn',
			'object-shorthand': 'error',
			'one-var': ['error', 'never'],
			'one-var-declaration-per-line': ['error', 'always'],
			'operator-assignment': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-const': 'error',
			'prefer-destructuring': 'error',
			'prefer-exponentiation-operator': 'error',
			'prefer-named-capture-group': 'error',
			'prefer-object-has-own': 'error',
			'prefer-object-spread': 'error',
			'prefer-promise-reject-errors': 'error',
			'prefer-regex-literals': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			'quote-props': ['error', 'as-needed'],
			radix: 'error',
			'require-unicode-regexp': 'error',
			'sort-imports': ['error', { ignoreCase: true }],
			'sort-keys': 'error',
			'spaced-comment': ['error', 'always', { block: { balanced: true } }],
			strict: ['error', 'safe'],
			'symbol-description': 'error',
			yoda: 'error',
		},
		settings: {
			jsdoc: {
				tagNamePreference: {
					return: 'return',
					returns: 'return',
					var: 'var',
				},
			},
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
			...typescriptEslint.configs.recommended.rules,
			...typescriptEslint.configs['recommended-requiring-type-checking'].rules,
			'@typescript-eslint/return-await': 'error',
		},
	},
	{
		files: ['tests/**/*'],
		plugins: { jest },
		rules: {
			...jest.configs.recommended.rules,
			'id-denylist': ['error', 'data', 'err', 'cb', 'callback'],
			'max-lines': 'off',
			'max-lines-per-function': 'off',
		},
	},
	{
		files: ['tests/acceptance/compile.test.ts'],
		rules: {
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
		},
	},
	eslintConfigPrettier,
]
