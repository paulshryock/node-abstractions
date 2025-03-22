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
import { FinalClassWasExtended } from '../../../src/Exception/Exception.ts'
import { HttpClient } from '../../../src/HttpClient/HttpClient.ts'

it('should instantiate', () =>
	expect(new HttpClient()).toBeInstanceOf(HttpClient))

describe('when attempting to extend this class', () => {
	it('should throw an exception', () =>
		expect(() => new (class extends HttpClient {})()).toThrow(
			FinalClassWasExtended,
		))
})

describe('HttpClient.sendRequest(Request)', () => {
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
				new HttpClient().sendRequest(new Request('https://www.example.com/')),
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

			await expect(() => new HttpClient().sendRequest(request)).rejects.toThrow(
				RequestAborted,
			)
		})
	})

	describe('when there is some other unexpected exception', () => {
		beforeEach(() => {
			const exception = new Error('unexpected exception')
			global.fetch = jest.fn(() => Promise.reject(exception))
		})

		it('should throw the exception', async () => {
			const request = new Request('https://www.example.com/')

			await expect(() => new HttpClient().sendRequest(request)).rejects.toThrow(
				HttpClientException,
			)
		})
	})

	it('should send a request', async () => {
		await new HttpClient().sendRequest(new Request('https://www.example.com/'))

		expect(fetch).toHaveBeenCalled()
	})
})
