import type { User } from "../domain/user.type";
import type { JwtData } from "../shared/jwt-data.type";
import type { Raw } from "../shared/sql.type";
import { generateJWT } from "../shared/jwt.utils";
import { guardGetBody } from "../shared/request.utils";
import { badRequest, ok } from "../shared/response.utils";
import { insertUser, selectUserByCredentials } from "./auth.repository";
import type { CredentialsRequest } from "./credentials-request.type";
import type { UserTokenResponse } from "./user-token-response.type";

const DEFAULT_ROLE_ID = 1;

/**
 * Routes controller for /api/auth/:action
 * - POST: Login or register
 * @description Object that wires the request to the correct controller
 */
export const authRoutes = {
	POST: async (request: Request) =>
		await authController(request, new URL(request.url).pathname.split('/').pop() || ''),
};

const authController = async (
	request: Request,
	action: string,
): Promise<Response> => {
	const credentials = (await guardGetBody(request)) as CredentialsRequest;
	if (action === "login") return await postLogin(credentials);
	if (action === "register") return await postRegister(credentials);
	return badRequest("Invalid endpoint");
};

const postLogin = async (
	credentials: CredentialsRequest,
): Promise<Response> => {
	const userId = await selectUserByCredentials(credentials);
	const userToken = createUserToken(userId.toString());

	return ok<UserTokenResponse>(userToken);
};

const postRegister = async (
	credentials: CredentialsRequest,
): Promise<Response> => {
	const rawUser: Raw<User> = {
		...credentials,
		user_id: "0",
	};
	const userId = await insertUser(rawUser);
	const userToken = createUserToken(userId.toString());
	return ok<UserTokenResponse>(userToken);
};

const createUserToken = (userId: string): UserTokenResponse => {
	const jwtData: JwtData = { userId };
	const token = generateJWT(jwtData);
	return { userId, token };
};
