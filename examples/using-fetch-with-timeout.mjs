// using-fetch-with-timeout.mjs

/**
 * This could be any implementation of the Fetch API.
 */
import fetch from "node-fetch";

import { fetchWithTimeout } from "../src/fetch-with-timeout.mjs";

try {
	const url = "https://jsonplaceholder.typicode.com/posts";
	const response = await fetchWithTimeout({ fetch, url, timeout: 100 });
	const responseData = await response.json();

	console.log({ responseData });
} catch (error) {
	console.error(error);
}
