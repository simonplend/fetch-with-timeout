import { setTimeout } from "node:timers/promises";

// TODO: Make this into a factory e.g.
// const fetchWithTimeout = createFetchWithTimeout({ fetch });

export async function fetchWithTimeout({ fetch, url, init = {}, timeout }) {
	const cancelRequest = new AbortController();
	const cancelTimeout = new AbortController();

	async function abortableRequest(url) {
		try {
			return await fetch(url, { ...init, signal: cancelRequest.signal });
		} finally {
			cancelTimeout.abort();
		}
	}

	async function timeoutAfter(delay) {
		try {
			await setTimeout(delay, undefined, {
				signal: cancelTimeout.signal,
			});
			cancelRequest.abort();
		} catch (error) {
			return;
		}
		// TODO: Throw a custom error instance e.g. FetchTimeout
		throw new Error(
			`fetchWithTimeout: Request aborted as it took longer than ${delay}ms`
		);
	}

	return await Promise.race([abortableRequest(url), timeoutAfter(timeout)]);
}
