import { Entity, Raw } from '../shared/sql.type';

/**
 * Represents a financial summary for a specific period
 */
export interface FinancialSummary extends Entity {
  user_id: number;
  period_start: Date;
  period_end: Date;
  total_income: number;
  total_expenses: number;
  balance: number;
  created_at: Date;
  updated_at: Date;
}

/**
 * Default empty financial summary object
 */
export const NULL_FINANCIAL_SUMMARY: FinancialSummary = {
  id: 0,
  user_id: 0,
  period_start: new Date(),
  period_end: new Date(),
  total_income: 0,
  total_expenses: 0,
  balance: 0,
  created_at: new Date(),
  updated_at: new Date()
};

/**
 * Validates a financial summary object
 * @param summary The financial summary to validate
 * @returns True if the financial summary is valid, false otherwise
 */
export function validateFinancialSummary(summary: Raw<FinancialSummary>): boolean {
  if (!summary) return false;
  
  // Check required fields
  if (summary.user_id === undefined || summary.user_id === null) return false;
  if (!summary.period_start) return false;
  if (!summary.period_end) return false;
  if (summary.total_income === undefined || summary.total_income === null) return false;
  if (summary.total_expenses === undefined || summary.total_expenses === null) return false;
  if (summary.balance === undefined || summary.balance === null) return false;
  
  // Check date fields
  if (isNaN(new Date(summary.period_start).getTime())) return false;
  if (isNaN(new Date(summary.period_end).getTime())) return false;
  
  // Check numeric fields
  if (isNaN(Number(summary.total_income))) return false;
  if (isNaN(Number(summary.total_expenses))) return false;
  if (isNaN(Number(summary.balance))) return false;
  
  // Check that period_end is after period_start
  if (new Date(summary.period_end) <= new Date(summary.period_start)) return false;
  
  // Check that balance equals income minus expenses (with small tolerance for floating point errors)
  const calculatedBalance = Number(summary.total_income) - Number(summary.total_expenses);
  if (Math.abs(calculatedBalance - Number(summary.balance)) > 0.01) return false;
  
  return true;
} 