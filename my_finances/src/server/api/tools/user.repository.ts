import type { Raw } from "../shared/sql.type";
import { type User, validateUser } from "../domain/user.type";
import {
	insert,
	readCommands,
	selectAll,
	selectById,
} from "../shared/sql.utils";

const usersSql = await readCommands("users");

/**
 * Selects all users
 * @returns The users array
 */
export const selectAllUsers = (): User[] => {
	const results = selectAll<User>(usersSql.SELECT_ALL);
	return results || [];
};

/**
 * Selects a user by id
 * @param id - The id of the user
 * @returns The user
 * @throws AppError if the user is not found
 */
export const selectUserById = (id: number): User => {
	const result = selectById<User>(usersSql.SELECT_BY_ID, id);
	return result;
};

/**
 * Inserts a user
 * @param userToInsert - The user to insert
 * @returns The user inserted
 * @throws AppError if the user is not valid
 */
export const insertUser = (userToInsert: Raw<User>): User => {
	validateUser(userToInsert);
	const userId = insert<Raw<User>>(usersSql.INSERT, userToInsert);
	const user = selectById<User>(usersSql.SELECT_BY_ID, userId);
	return user;
};
