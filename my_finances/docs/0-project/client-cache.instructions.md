# Client Cache

Add a shared util module with a cache for improve performance by avoiding calls to the server.

Will be used from the `get` function of the `fetch.utils` module.

Will use the url as a key.

Do not invalidate the cache, will stay in memory for the app lifetime.

## Usage

```ts
import { read, write } from "@/client/shared/cache.utils";

const url = "https://api.example.com/data";
const result = await read(url);
if (!result) {
	const result = // normal fetch call
	write(url, result);
}
return result;
```


## Unit test

Generate unit test for the cache util module based on the unit test rule [unit-test.mdc](/.cursor/rules/project-unit-test.mdc).
