import { AppError } from "../shared/app-error.class";

/**
 * Represents a transaction with authentication credentials and metadata
 */
export type Transaction = {
	transaction_id: number;
	user_id: string;
	amount: number;
	category: string; 
	date: Date;
	description: string;
	type: string;
	status: string;// Store hash, not plaintext password
	created_at: Date;
	updated_at: Date;
};

/**
 * Default empty transaction object
 */
export const NULL_TRANSACTION: Transaction = {
	transaction_id: 0,
	user_id: "",	
	amount: 0,
	category: "",
	date: new Date(),
	description: "",
	type: "",
	status: "",
	created_at: new Date(),
	updated_at: new Date(),
};

/**
 * Validates a transaction
 * @param transaction - The transaction to validate
 * @throws BAD_REQUEST_ERROR if the transaction is invalid
 */
export const validateTransaction = (transaction: Partial<Transaction>): void => {
	if (!transaction.transaction_id || !transaction.user_id || !transaction.amount) {
		throw new AppError("Invalid transaction", "LOGIC");
	}
};
