import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	jest,
} from '@jest/globals'
import {
	HttpClientException,
	NetworkFailure,
	RequestAborted,
} from '../../../src/HttpClient/HttpClientException.ts'
import { FetchHttpClient } from '../../../src/HttpClient/FetchHttpClient.ts'
import { FinalClassWasExtended } from '../../../src/Exception/Exception.ts'

it('should instantiate', () =>
	expect(new FetchHttpClient()).toBeInstanceOf(FetchHttpClient))

describe('when attempting to extend this class', () => {
	it('should throw an exception', () =>
		expect(() => new (class extends FetchHttpClient {})()).toThrow(
			FinalClassWasExtended,
		))
})

describe('FetchHttpClient.sendRequest(Request)', () => {
	const fetchOriginal = global.fetch

	beforeEach(() => {
		global.fetch = jest.fn(() => Promise.resolve(new Response()))
	})

	afterEach(() => {
		global.fetch = fetchOriginal
	})

	describe('when there is a network failure', () => {
		beforeEach(() => {
			const typeError = new TypeError('network error')
			global.fetch = jest.fn(() => Promise.reject(typeError))
		})

		it('should throw a network failure exception', async () => {
			await expect(() =>
				new FetchHttpClient().sendRequest(
					new Request('https://www.example.com/'),
				),
			).rejects.toThrow(NetworkFailure)
		})
	})

	describe('when the request is aborted', () => {
		beforeEach(() => {
			const domException = new DOMException('request aborted', 'AbortError')
			global.fetch = jest.fn(() => Promise.reject(domException))
		})

		it('should throw a request aborted exception', async () => {
			const request = new Request('https://www.example.com/')

			await expect(() =>
				new FetchHttpClient().sendRequest(request),
			).rejects.toThrow(RequestAborted)
		})
	})

	describe('when there is some other unexpected exception', () => {
		beforeEach(() => {
			const exception = new Error('unexpected exception')
			global.fetch = jest.fn(() => Promise.reject(exception))
		})

		it('should throw the exception', async () => {
			const request = new Request('https://www.example.com/')

			await expect(() =>
				new FetchHttpClient().sendRequest(request),
			).rejects.toThrow(HttpClientException)
		})
	})

	it('should send a request', async () => {
		await new FetchHttpClient().sendRequest(
			new Request('https://www.example.com/'),
		)

		expect(fetch).toHaveBeenCalled()
	})
})

describe('FetchHttpClient.getResponseBody(Response)', () => {
	describe('when a response has no body', () => {
		const response = new Response()

		it('should return null', async () => {
			await expect(
				new FetchHttpClient().getResponseBody(response),
			).resolves.toBe(null)
		})
	})

	describe('when a response has no content type and a text body', () => {
		const body = 'text'
		const response = new Response(body)

		it('should return the body text', async () => {
			await expect(
				new FetchHttpClient().getResponseBody(response),
			).resolves.toBe(body)
		})
	})

	describe.each([
		['text/plain', 'plain text'],
		['text/html', 'html text'],
	])(
		'when a response content type is "%s"',
		(contentType: string, body: string) => {
			const response = new Response(body, {
				headers: new Headers({ 'Content-Type': contentType }),
			})

			it('should return the body text', async () => {
				await expect(
					new FetchHttpClient().getResponseBody(response),
				).resolves.toBe(body)
			})
		},
	)
})
