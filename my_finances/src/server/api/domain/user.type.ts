import { AppError } from "../shared/app-error.class";
import { Entity, Raw } from '../shared/sql.type';

/**
 * Represents a user with its properties
 */
export type ThemePreference = 'light' | 'dark' | 'system';

export interface User extends Entity {
	username: string;
	email: string;
	password_hash: string;
	first_name?: string;
	last_name?: string;
	theme_preference: ThemePreference;
	created_at: Date;
	updated_at: Date;
}

/**
 * Default empty user object
 */
export const NULL_USER: User = {
	id: 0,
	username: '',
	email: '',
	password_hash: '',
	theme_preference: 'system',
	created_at: new Date(),
	updated_at: new Date()
};

/**
 * Validates a user entity
 * @param user - The user to validate
 * @throws AppError if the user is invalid
 */
export function validateUser(user: Raw<User>): boolean {
	if (!user) return false;
	
	// Required fields
	if (!user.username || typeof user.username !== 'string') return false;
	if (!user.email || typeof user.email !== 'string') return false;
	if (!user.password_hash || typeof user.password_hash !== 'string') return false;
	
	// Optional fields
	if (user.first_name && typeof user.first_name !== 'string') return false;
	if (user.last_name && typeof user.last_name !== 'string') return false;
	
	// Theme preference
	if (!user.theme_preference || !['light', 'dark', 'system'].includes(user.theme_preference)) return false;
	
	// Date fields
	if (!(user.created_at instanceof Date)) return false;
	if (!(user.updated_at instanceof Date)) return false;
	
	return true;
}
