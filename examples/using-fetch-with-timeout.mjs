// using-fetch-with-timeout.mjs

import fetch from "node-fetch";
import { createFetchWithTimeout } from "../src/fetch-with-timeout.js";

const fetchWithTimeout = createFetchWithTimeout({ fetch, timeout: 100 });

try {
	const url = "https://jsonplaceholder.typicode.com/posts";
	const response = await fetchWithTimeout(url);
	const responseData = await response.json();

	console.log({ responseData });
} catch (error) {
	console.error(error);
}
