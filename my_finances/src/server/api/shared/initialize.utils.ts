import type { Chart } from "../domain/chart.type";
import type { Category } from "../domain/category.type";
import type { Transaction } from "../domain/transaction.type";
import type { User } from "../domain/user.type";
import type { FinancialSummary } from "../domain/financial_summary.type";
import type { CategorySummary } from "../domain/category_summary.type";
import { Raw } from "./sql.type";
import { create, drop, insert, readCommands } from "./sql.utils";
import searchHistoryCommands from '../../../sql/search_history.sql.json';
import filterPresetCommands from '../../../sql/filter_preset.sql.json';
import { SearchHistory } from '../domain/search_history.type';
import { FilterPreset } from '../domain/filter_preset.type';

const userSql = await readCommands("user");
const transactionSql = await readCommands("transaction");
const categorySql = await readCommands("category");
const chartSql = await readCommands("chart");
const financialSummarySql = await readCommands("financial_summary");
const categorySummarySql = await readCommands("category_summary");

/**
 * Initializes the database
 */
export const initializeTables = async (): Promise<void> => {
	initializeUsersTable();
	initializeCategoriesTable();
	initializeTransactionsTable();
	initializeChartTable();
	initializeFinancialSummaryTable();
	initializeCategorySummaryTable();
	initializeSearchHistoryTable();
	initializeFilterPresetTable();
};

const initializeUsersTable = (): void => {
	drop(userSql.TABLE);
	create(userSql.CREATE_TABLE);
	seedUsers();
};

const initializeCategoriesTable = (): void => {
	drop(categorySql.TABLE);
	create(categorySql.CREATE_TABLE);
	seedCategories();
};

const initializeTransactionsTable = (): void => {
	drop(transactionSql.TABLE);
	create(transactionSql.CREATE_TABLE);
	seedTransactions();
};

const initializeChartTable = (): void => {
	drop(chartSql.TABLE);
	create(chartSql.CREATE_TABLE);
	seedCharts();
};

const initializeFinancialSummaryTable = (): void => {
	drop(financialSummarySql.TABLE);
	create(financialSummarySql.CREATE_TABLE);
	seedFinancialSummaries();
};

const initializeCategorySummaryTable = (): void => {
	drop(categorySummarySql.TABLE);
	create(categorySummarySql.CREATE_TABLE);
	seedCategorySummaries();
};

const initializeSearchHistoryTable = (): void => {
	drop(searchHistoryCommands.TABLE);
	create(searchHistoryCommands.CREATE_TABLE);
	seedSearchHistory();
};

const initializeFilterPresetTable = (): void => {
	drop(filterPresetCommands.TABLE);
	create(filterPresetCommands.CREATE_TABLE);
	seedFilterPresets();
};

const seedUsers = (): void => {
	for (const user of userSql.SEED) {
		insert<User>(userSql.INSERT, user as Raw<User>);
	}
};

const seedCategories = (): void => {
	for (const category of categorySql.SEED) {
		insert<Category>(categorySql.INSERT, category as Raw<Category>);
	}
};

const seedTransactions = (): void => {
	for (const transaction of transactionSql.SEED) {
		insert<Transaction>(transactionSql.INSERT, transaction as Raw<Transaction>);
	}
};

const seedCharts = (): void => {
	for (const chart of chartSql.SEED) {
		insert<Chart>(chartSql.INSERT, chart as Raw<Chart>);
	}
};

const seedFinancialSummaries = (): void => {
	for (const summary of financialSummarySql.SEED) {
		insert<FinancialSummary>(financialSummarySql.INSERT, summary as Raw<FinancialSummary>);
	}
};

const seedCategorySummaries = (): void => {
	for (const summary of categorySummarySql.SEED) {
		insert<CategorySummary>(categorySummarySql.INSERT, summary as Raw<CategorySummary>);
	}
};

const seedSearchHistory = (): void => {
	for (const seed of searchHistoryCommands.SEED) {
		insert<SearchHistory>(searchHistoryCommands.INSERT, seed as Raw<SearchHistory>);
	}
};

const seedFilterPresets = (): void => {
	for (const seed of filterPresetCommands.SEED) {
		insert<FilterPreset>(filterPresetCommands.INSERT, seed as Raw<FilterPreset>);
	}
};

