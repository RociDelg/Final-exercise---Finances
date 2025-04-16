/**
 * User token response from the server
 */
export interface UserToken {
	userId: string;
	token: string;
}

/**
 * Default empty user token
 */
export const NULL_USER_TOKEN: UserToken = {
	userId: '',
	token: '',
};
