import { AppError } from "../shared/app-error.class";
import { Entity, Raw } from '../shared/sql.type';

/**
 * Represents a category with its properties
 */
export interface Category extends Entity {
	user_id: number | null;
	name: string;
	color: string;
	is_system: boolean;
	created_at: Date;
	updated_at: Date;
}

/**
 * Default empty category object
 */
export const NULL_CATEGORY: Category = {
	id: 0,
	user_id: null,
	name: '',
	color: '#000000',
	is_system: false,
	created_at: new Date(),
	updated_at: new Date()
};

/**
 * Validates a category entity
 * @param category - The category to validate
 * @throws AppError if the category is invalid
 */
export function validateCategory(category: Raw<Category>): boolean {
	if (!category) return false;
	
	// Required fields
	if (!category.name || typeof category.name !== 'string') return false;
	if (!category.color || typeof category.color !== 'string') return false;
	if (typeof category.is_system !== 'boolean') return false;
	
	// Optional fields
	if (category.user_id !== null && typeof category.user_id !== 'number') return false;
	
	// Date fields
	if (!(category.created_at instanceof Date)) return false;
	if (!(category.updated_at instanceof Date)) return false;
	
	return true;
} 