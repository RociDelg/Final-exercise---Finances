import { AppError } from "../shared/app-error.class";
import { Entity, Raw } from '../shared/sql.type';

/**
 * Represents a transaction with its properties
 */
export interface Transaction extends Entity {
	user_id: number;
	amount: number;
	description?: string;
	category: string;
	transaction_date: Date;
	type: 'income' | 'expense';
	status: 'active' | 'deleted' | 'modified';
	created_at: Date;
	updated_at: Date;
}

/**
 * Default empty transaction object
 */
export const NULL_TRANSACTION: Transaction = {
	id: 0,
	user_id: 0,
	amount: 0,
	description: '',
	category: '',
	transaction_date: new Date(),
	type: 'expense',
	status: 'active',
	created_at: new Date(),
	updated_at: new Date()
};

/**
 * Validates a transaction entity
 * @param transaction - The transaction to validate
 * @throws AppError if the transaction is invalid
 */
export function validateTransaction(transaction: Raw<Transaction>): boolean {
	if (!transaction) return false;
	
	// Required fields
	if (!transaction.user_id || typeof transaction.user_id !== 'number') return false;
	if (typeof transaction.amount !== 'number') return false;
	if (!transaction.category || typeof transaction.category !== 'string') return false;
	if (!transaction.transaction_date || !(transaction.transaction_date instanceof Date)) return false;
	if (!transaction.type || !['income', 'expense'].includes(transaction.type)) return false;
	if (!transaction.status || !['active', 'deleted', 'modified'].includes(transaction.status)) return false;
	
	// Optional fields
	if (transaction.description && typeof transaction.description !== 'string') return false;
	
	// Date fields
	if (!(transaction.created_at instanceof Date)) return false;
	if (!(transaction.updated_at instanceof Date)) return false;
	
	return true;
}

export interface SearchFilters {
    date_range?: {
        start: string;
        end: string;
    };
    amount_range?: {
        min: number;
        max: number;
    };
    categories?: string[];
    transaction_type?: 'income' | 'expense';
    status?: 'active' | 'deleted' | 'modified';
}

export interface FilterOptions {
    categories: {
        id: string;
        name: string;
        count: number;
    }[];
    transaction_types: {
        type: 'income' | 'expense';
        count: number;
    }[];
    amount_ranges: {
        min: number;
        max: number;
        count: number;
    }[];
    date_ranges: {
        start: string;
        end: string;
        count: number;
    }[];
}

export function validateSearchFilters(filters: SearchFilters): boolean {
    if (!filters) return false;

    // Validate date range if present
    if (filters.date_range) {
        const { start, end } = filters.date_range;
        if (!start || !end || new Date(start) > new Date(end)) return false;
    }

    // Validate amount range if present
    if (filters.amount_range) {
        const { min, max } = filters.amount_range;
        if (typeof min !== 'number' || typeof max !== 'number' || min > max || min < 0) return false;
    }

    // Validate categories if present
    if (filters.categories) {
        if (!Array.isArray(filters.categories)) return false;
        if (filters.categories.some(cat => typeof cat !== 'string')) return false;
    }

    // Validate transaction type if present
    if (filters.transaction_type) {
        if (!['income', 'expense'].includes(filters.transaction_type)) return false;
    }

    // Validate status if present
    if (filters.status) {
        if (!['active', 'deleted', 'modified'].includes(filters.status)) return false;
    }

    return true;
}
