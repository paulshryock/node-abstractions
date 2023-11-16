import { describe, expect, it } from '@jest/globals'
import { Configuration } from '../../src/Configuration/Configuration.ts'
import { NetworkInput } from '../../src/Input/NetworkInput.ts'

describe('NetworkInput', () => {
	describe('getConfiguration', () => {
		const formData = new FormData()
		formData.set('lorem', 'ipsum')

		interface TestCases {
			[_: string]: [string, Configuration, Configuration]
		}

		const testCases: TestCases = {
			'request body form data': [
				'https://www.example.com/',
				{ body: formData, method: 'POST' },
				{ formData: { lorem: 'ipsum' } },
			],
			'request body json': [
				'https://www.example.com/',
				{
					body: JSON.stringify({ lorem: 'ipsum' }),
					headers: new Headers({ 'Content-Type': 'application/json' }),
					method: 'POST',
				},
				{ json: { lorem: 'ipsum' } },
			],
			'request body plain text': [
				'https://www.example.com/',
				{ body: 'lorem ipsum', method: 'POST' },
				{ text: 'lorem ipsum' },
			],
			'request headers': [
				'https://www.example.com/',
				{ headers: new Headers({ lorem: 'ipsum' }) },
				{ headers: { lorem: 'ipsum' } },
			],
			'request method': [
				'https://www.example.com/',
				{ method: 'POST' },
				{ method: 'POST' },
			],
			'request url': [
				'https://www.example.com/?key=value#lorem-ipsum',
				{},
				{ url: 'https://www.example.com/?key=value#lorem-ipsum' },
			],
			'request url hash': [
				'https://www.example.com/?key=value#lorem-ipsum',
				{},
				{ hash: 'lorem-ipsum' },
			],
			'request url query params': [
				'https://www.example.com/?key=value#lorem-ipsum',
				{},
				{ queryParams: { key: 'value' } },
			],
			'request url query params (encoded)': [
				`https://www.example.com/?${encodeURIComponent(
					'key=value#lorem-ipsum',
				)}`,
				{
					headers: new Headers({
						'Content-Type': 'application/x-www-form-urlencoded',
					}),
				},
				{ queryParams: { key: 'value' } },
			],
		}

		it.each(Object.entries(testCases))(
			'should get the %s',
			async (_, [resource, options, expected]) => {
				expect(
					await new NetworkInput(
						new Request(resource, options),
					).getConfiguration(),
				).toMatchObject(expected)
			},
		)
	})
})
