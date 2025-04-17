import { Entity, Raw } from '../shared/sql.type';

/**
 * Represents a summary of transactions for a specific category in a specific period
 */
export interface CategorySummary extends Entity {
  user_id: number;
  category_id: number;
  period_start: Date;
  period_end: Date;
  amount: number;
  transaction_count: number;
  created_at: Date;
  updated_at: Date;
}

/**
 * Default empty category summary object
 */
export const NULL_CATEGORY_SUMMARY: CategorySummary = {
  id: 0,
  user_id: 0,
  category_id: 0,
  period_start: new Date(),
  period_end: new Date(),
  amount: 0,
  transaction_count: 0,
  created_at: new Date(),
  updated_at: new Date()
};

/**
 * Validates a category summary object
 * @param summary The category summary to validate
 * @returns True if the category summary is valid, false otherwise
 */
export function validateCategorySummary(summary: Raw<CategorySummary>): boolean {
  if (!summary) return false;
  
  // Check required fields
  if (summary.user_id === undefined || summary.user_id === null) return false;
  if (summary.category_id === undefined || summary.category_id === null) return false;
  if (!summary.period_start) return false;
  if (!summary.period_end) return false;
  if (summary.amount === undefined || summary.amount === null) return false;
  if (summary.transaction_count === undefined || summary.transaction_count === null) return false;
  
  // Check date fields
  if (isNaN(new Date(summary.period_start).getTime())) return false;
  if (isNaN(new Date(summary.period_end).getTime())) return false;
  
  // Check numeric fields
  if (isNaN(Number(summary.amount))) return false;
  if (isNaN(Number(summary.transaction_count))) return false;
  
  // Check that period_end is after period_start
  if (new Date(summary.period_end) <= new Date(summary.period_start)) return false;
  
  // Check that transaction_count is a non-negative integer
  if (Math.floor(Number(summary.transaction_count)) !== Number(summary.transaction_count) || Number(summary.transaction_count) < 0) return false;
  
  return true;
} 