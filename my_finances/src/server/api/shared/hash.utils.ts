/**
 * Hashes a password
 * @param password - The password to hash
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
	// In a real application, you would use a proper cryptographic library
	// For this example, we'll use a simple hashing function
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	return hashHex;
}

/**
 * Verifies a password against a hashed password
 * @param password - The password to verify
 * @param hash - The hashed password
 * @returns True if the password is correct, false otherwise
 */
export async function verifyPassword(
	password: string,
	hash: string,
): Promise<boolean> {
	const hashedPassword = await hashPassword(password);
	return hashedPassword === hash;
}
