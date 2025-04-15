/**
 * Data stored in the JWT token.
 */
export type JwtData = {
	userId: string;
};

export const NULL_JWT_DATA: JwtData = {
	userId: "",
};
