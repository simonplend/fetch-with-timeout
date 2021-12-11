const { setTimeout } = require("node:timers/promises");

exports.createFetchWithTimeout = function createFetchWithTimeout({
	fetch,
	timeout,
}) {
	return async function (url, init = {}) {
		const cancelRequest = new AbortController();
		const cancelTimeout = new AbortController();

		async function abortableRequest(url) {
			try {
				return await fetch(url, {
					...init,
					signal: cancelRequest.signal,
				});
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
			throw new Error(
				`fetchWithTimeout: Request aborted as it took longer than ${delay}ms`
			);
		}

		return await Promise.race([
			abortableRequest(url),
			timeoutAfter(timeout),
		]);
	};
};
