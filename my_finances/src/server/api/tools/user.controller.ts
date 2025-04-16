import type { User } from "../domain/user.type";
import { guardGetUserId } from "../shared/request.utils";
import type { Raw } from "../shared/sql.type";
import { ok } from "../shared/response.utils";
import type { UserPostRequest } from "./user-post-request.type";
import { insertUser, selectAllUsers } from "./user.repository";

/**
 * Routes controller for /api/users
 * - GET: Get all users
 * - POST: Create a new user
 * @description Object that wires the request to the correct controller
 */
export const usersRoutes = {
	GET: async (request: Request) => await getUsers(request),
	POST: async (request: Request) => await postUser(request),
};

const getUsers = async (request: Request): Promise<Response> => {
	const users = selectAllUsers();
	return ok<User[]>(users);
};

const postUser = async (request: Request): Promise<Response> => {
	const userId = guardGetUserId(request);
	const userDto = (await request.json()) as UserPostRequest;
	const userToInsert: Raw<User> = {
		...userDto,
		user_id: userId,
		email: userDto.email || '',
		password: userDto.password || '',
	};
	const user = insertUser(userToInsert);
	return ok<User>(user);
};
