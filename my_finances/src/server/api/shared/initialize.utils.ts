import type { Chart } from "../domain/chart.type";
import type { Transaction } from "../domain/transaction.type";
import type { User } from "../domain/user.type";
import { create, drop, insert, readCommands } from "./sql.utils";

const userSql = await readCommands("user");
const transactionSql = await readCommands("transaction");
const chartSql = await readCommands("chart");

/**
 * Initializes the database
 */
export const initializeTables = async (): Promise<void> => {
	initializeUsersTable();
	initializeTransactionsTable();
	initializeChartTable();
};

const initializeUsersTable = (): void => {
	drop(userSql.TABLE);
	create(userSql.CREATE_TABLE);
};

const initializeTransactionsTable = (): void => {
	drop(transactionSql.TABLE);
	create(transactionSql.CREATE_TABLE);
};

const initializeChartTable = (): void => {
	drop(chartSql.TABLE);
	create(chartSql.CREATE_TABLE);
};

