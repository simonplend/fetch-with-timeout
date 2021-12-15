# fetch-with-timeout

> Cancels HTTP requests with the Abort API. Bring your own Fetch API implementation.

🤔 [Should I make this a proper package and publish it to npm?](https://github.com/simonplend/fetch-with-timeout/issues/1)

# Requirements

- Node.js >= v16.0.0

_Note: This library won't be needed in future versions of Node.js which
support [AbortSignal.timeout](https://github.com/nodejs/node/pull/40899)._

## Installation

```
npm install github:simonplend/fetch-with-timeout
```

## Usage

```javascript
/**
 * This could be any implementation of the Fetch API.
 */
import fetch from "node-fetch";

import { createFetchWithTimeout } from "fetch-with-timeout";

const fetchWithTimeout = createFetchWithTimeout({ fetch, timeout: 100 });

try {
	const url = "https://jsonplaceholder.typicode.com/posts";
	const response = await fetchWithTimeout(url);
	const responseData = await response.json();

	console.log({ responseData });
} catch (error) {
	console.error(error);
}
```

## TODO

- [ ] Throw a custom error instance e.g. `FetchTimeout`
- [ ] Add tests
- [ ] Add types
- [ ] Improve the README
	- [ ] Link to James Snell's article
	- [ ] Link to my 'How to cancel an HTTP request in Node.js' article
	- [ ] Link to my NodeConf Remote talk
- [ ] Publish to npm
