/**
 * Represents a new user DTO
 */
export interface UserPostRequest {
	name: string;
	description: string;
	url: string;
	email: string;
	password: string;
}
