import { type JwtData, NULL_JWT_DATA } from "./jwt-data.type";

const SECRET = "my-super-secret-key-for-jwt";

const ENCODED_HEADER = encodeObject({
	typ: "JWT",
	alg: "HS256",
});

function encodeObject(object: Record<string, unknown>): string {
	return btoa(JSON.stringify(object));
}

/**
 * Generates a JWT token
 * @param jwtData - The JWT data to encode
 * @param expiresIn - The expiration time in seconds (default: 3600)
 * @returns The generated JWT token
 */
export function generateJWT(jwtData: JwtData, expiresIn = 3600): string {
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + expiresIn;
	const payload = { ...jwtData, iat, exp };
	const encodedPayload = encodeObject(payload);
	
	// Create a simple signature using the secret and payload
	const signature = createSignature(encodedPayload);
	
	return `${ENCODED_HEADER}.${encodedPayload}.${signature}`;
}

/**
 * Verifies a JWT token
 * @param token - The JWT token to verify
 * @returns The decoded JWT data
 * @throws Error if the token is invalid or expired
 */
export function verifyJWT(token: string): JwtData {
	if (!token) return NULL_JWT_DATA;
	
	const parts = token.split(".");
	if (parts.length !== 3) {
		throw new Error("Invalid token format");
	}
	
	const [encodedHeader, encodedPayload, signature] = parts;
	
	// Verify signature
	const expectedSignature = createSignature(encodedPayload);
	if (signature !== expectedSignature) {
		throw new Error("Invalid token");
	}
	
	// Decode payload
	const payloadString = atob(encodedPayload);
	const payload: JwtData & { exp: number } = JSON.parse(payloadString);
	
	// Check expiration
	const now = Math.floor(Date.now() / 1000);
	if (now > payload.exp) {
		throw new Error("Token expired");
	}
	
	return payload;
}

/**
 * Creates a simple signature for JWT
 * @param data - The data to sign
 * @returns The signature
 */
function createSignature(data: string): string {
	// This is a simplified signature for demonstration
	// In a real application, you would use a proper cryptographic function
	const encoder = new TextEncoder();
	const dataBytes = encoder.encode(data);
	const secretBytes = encoder.encode(SECRET);
	
	// Simple XOR-based signature (not secure for production)
	let signature = '';
	for (let i = 0; i < dataBytes.length; i++) {
		signature += String.fromCharCode(dataBytes[i] ^ secretBytes[i % secretBytes.length]);
	}
	
	return btoa(signature);
}
