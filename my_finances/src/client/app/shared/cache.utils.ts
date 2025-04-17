/**
 * Cache utility for storing API responses in memory
 * Uses URL as key and stores the response data
 * Cache persists for the lifetime of the application
 */

// Cache storage using Map for better performance with string keys
const cache = new Map<string, unknown>();

/**
 * Reads a value from the cache
 * @param key - The URL to look up in the cache
 * @returns The cached value or undefined if not found
 */
export const read = <T>(key: string): T | undefined => {
	return cache.get(key) as T | undefined;
};

/**
 * Writes a value to the cache
 * @param key - The URL to use as cache key
 * @param value - The value to cache
 * @returns The cached value
 */
export const write = <T>(key: string, value: T): T => {
	cache.set(key, value);
	return value;
};

/**
 * Clears the entire cache
 */
export const clear = (): void => {
	cache.clear();
};

/**
 * Removes a specific entry from the cache
 * @param key - The URL to remove from the cache
 */
export const remove = (key: string): void => {
	cache.delete(key);
};
