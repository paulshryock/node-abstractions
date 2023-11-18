/**
 * @internal
 * @since unreleased
 */
export type Entries = ReturnType<
	(FormData | Headers | URLSearchParams)['entries']
>
