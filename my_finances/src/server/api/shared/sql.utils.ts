import { AppError } from "./app-error.class";
import type { Raw, SQL } from "./sql.type";

// Mock database for Angular environment
class MockDatabase {
	private data: Record<string, any[]> = {};
	
	constructor() {
		console.log('Using mock database for Angular environment');
	}
	
	query(query: string) {
		return {
			all: (params?: Record<string, any>) => {
				// Extract table name from query (simplified)
				const tableMatch = query.match(/FROM\s+(\w+)/i);
				const tableName = tableMatch ? tableMatch[1] : 'default';
				
				if (!this.data[tableName]) {
					this.data[tableName] = [];
				}
				
				// Filter by params if provided
				if (params) {
					return this.data[tableName].filter(item => {
						return Object.entries(params).every(([key, value]) => 
							item[key] === value
						);
					});
				}
				
				return this.data[tableName];
			},
			get: (params: Record<string, any>) => {
				const results = this.query(query).all(params);
				return results.length > 0 ? results[0] : null;
			},
			run: (params: Record<string, any>) => {
				// Extract table name and operation from query (simplified)
				const insertMatch = query.match(/INSERT\s+INTO\s+(\w+)/i);
				const updateMatch = query.match(/UPDATE\s+(\w+)/i);
				const deleteMatch = query.match(/DELETE\s+FROM\s+(\w+)/i);
				
				let tableName = '';
				let operation = '';
				
				if (insertMatch) {
					tableName = insertMatch[1];
					operation = 'INSERT';
				} else if (updateMatch) {
					tableName = updateMatch[1];
					operation = 'UPDATE';
				} else if (deleteMatch) {
					tableName = deleteMatch[1];
					operation = 'DELETE';
				}
				
				if (!tableName) {
					return { changes: 0, lastInsertRowid: 0 };
				}
				
				if (!this.data[tableName]) {
					this.data[tableName] = [];
				}
				
				let changes = 0;
				let lastInsertRowid = 0;
				
				if (operation === 'INSERT') {
					const newId = this.data[tableName].length + 1;
					const newItem = { ...params, id: newId };
					this.data[tableName].push(newItem);
					changes = 1;
					lastInsertRowid = newId;
				} else if (operation === 'UPDATE') {
					// Simplified update
					const whereMatch = query.match(/WHERE\s+(.+)/i);
					if (whereMatch) {
						const whereClause = whereMatch[1];
						const whereKey = whereClause.split('=')[0].trim();
						const whereValue = whereClause.split('=')[1].trim().replace(/['"]/g, '');
						
						this.data[tableName] = this.data[tableName].map(item => {
							if (item[whereKey] === whereValue) {
								changes++;
								return { ...item, ...params };
							}
							return item;
						});
					}
				} else if (operation === 'DELETE') {
					// Simplified delete
					const whereMatch = query.match(/WHERE\s+(.+)/i);
					if (whereMatch) {
						const whereClause = whereMatch[1];
						const whereKey = whereClause.split('=')[0].trim();
						const whereValue = whereClause.split('=')[1].trim().replace(/['"]/g, '');
						
						const originalLength = this.data[tableName].length;
						this.data[tableName] = this.data[tableName].filter(item => 
							item[whereKey] !== whereValue
						);
						changes = originalLength - this.data[tableName].length;
					}
				}
				
				return { changes, lastInsertRowid };
			}
		};
	}
}

// Create a mock database instance
const db = new MockDatabase();
const sqlFolder = 'sql';

export async function readCommands(entityName: string): Promise<SQL> {
	try {
		// In a real Angular app, you would use HttpClient to fetch this
		// For now, we'll return a mock SQL object
		return {
			TABLE: entityName,
			CREATE_TABLE: `CREATE TABLE IF NOT EXISTS ${entityName} (id INTEGER PRIMARY KEY)`,
			SELECT_ALL: `SELECT * FROM ${entityName}`,
			SELECT_BY_ID: `SELECT * FROM ${entityName} WHERE id = $id`,
			SELECT_BY_USER_ID: `SELECT * FROM ${entityName} WHERE user_id = $userId`,
			SELECT_BY_FIELD: `SELECT * FROM ${entityName} WHERE $field = $value`,
			SELECT_BY_QUERY: `SELECT * FROM ${entityName} WHERE $query`,
			INSERT: `INSERT INTO ${entityName} (${Object.keys({}).join(', ')}) VALUES (${Object.keys({}).map(k => `$${k}`).join(', ')})`,
			UPDATE: `UPDATE ${entityName} SET ${Object.keys({}).map(k => `${k} = $${k}`).join(', ')} WHERE id = $id`,
			DELETE: `DELETE FROM ${entityName} WHERE id = $id`,
			SEED: []
		};
	} catch (error) {
		console.error(`Error reading SQL commands for ${entityName}:`, error);
		throw new AppError(`Failed to read SQL commands for ${entityName}`, 'DATABASE');
	}
}

export const selectAll = <R>(query: string): R[] => {
	const q = db.query(query);
	const r = q.all();
	return r as R[];
};

/**
 * Retrieves a single record by ID from the database
 * @template R - The type of the result
 * @param query - SQL query with $id parameter
 * @param id - The ID to search for
 * @returns The matching record cast to type R
 * @throws AppError if the record is not found
 */
export const selectById = <R>(query: string, id: number): R => {
	const q = db.query(query);
	const r = q.get({ id });
	if (!r) throw new AppError("Record not found", "DATABASE");
	return r as R;
};

/**
 * Executes a SELECT query with a user ID parameter
 * @template R - The type of the result
 * @param query - SQL query string
 * @param userId - The user ID to filter by
 * @returns Query results cast to type R
 */
export const selectByUserId = <R>(query: string, userId: string): R[] => {
	const q = db.query(query);
	const r = q.all({ userId });
	return r as R[];
};

/**
 * Executes a SELECT query with a field parameter
 * @template R - The type of the result
 * @param query - SQL query string
 * @param field - The field to filter by
 * @param value - The value to filter by
 * @returns Query results cast to type R
 */
export const selectByField = <R>(
	query: string,
	field: string,
	value: unknown,
): R[] => {
	const q = db.query(query);
	const queryBindings = {
		[field]: value,
	};
	const r = q.all(queryBindings);
	return r as R[];
};

/**
 * Executes a SELECT query with optional parameters
 * @template R - The type of the result
 * @param query - SQL query string
 * @param params - Optional query parameters
 * @returns Query results cast to type R
 */
export const select = <R>(query: string, params?: unknown): R => {
	const q = db.query(query);
	const r = params ? q.all(params as Record<string, any>) : q.all();
	return r as R;
};

/**
 * Executes an INSERT query with parameters
 * @template P - The type of the parameters
 * @param query - SQL query string
 * @param entity - Query parameters
 * @returns Number of affected rows
 */
export const insert = <E>(query: string, entity: Raw<E>): number => {
	if (!entity) throw new AppError("Entity to insert is required", "DATABASE");
	const q = db.query(query);
	const queryBindings = {
		...entity,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
	const r = q.run(queryBindings);
	if (r.changes === 0) throw new AppError("Failed to insert", "DATABASE");
	return Number(r.lastInsertRowid);
};

/**
 * Executes an UPDATE query with parameters
 * @template P - The type of the parameters
 * @param query - SQL query string
 * @param params - Query parameters
 * @returns Number of affected rows
 */
export const update = <P>(query: string, params: P): number => {
	if (!params) throw new AppError("Parameters to update are required", "DATABASE");
	const q = db.query(query);
	const queryBindings = {
		...params,
		updated_at: new Date().toISOString(),
	};
	const r = q.run(queryBindings);
	return r.changes;
};

/**
 * Creates a table in the database
 * @param tableCreationCommand - SQL command to create a table
 * @returns Number of affected rows
 */
export const create = (tableCreationCommand: string): number => {
	const q = db.query(tableCreationCommand);
	const r = q.run({});
	return r.changes;
};

/**
 * Drops a table from the database
 * @param tableName - Name of the table to drop
 * @returns Number of affected rows
 */
export const drop = (tableName: string): number => {
	const q = db.query(`DROP TABLE IF EXISTS ${tableName}`);
	const r = q.run({});
	return r.changes;
};
