import { User, validateUser } from '../domain/user.type';
import { AppError } from '../shared/app-error.class';
import { Raw } from '../shared/sql.type';
import {
	insert,
	readCommands,
	selectAll,
	selectById,
	selectByUserId,
} from "../shared/sql.utils";

const usersSql = await readCommands("users");

/**
 * Selects all users
 * @returns The users array
 */
export const selectAllUsers = (): User[] => {
	const query = 'SELECT * FROM users';
	return selectByUserId<User>(query, '');
};

/**
 * Selects a user by id
 * @param id - The id of the user
 * @returns The user
 * @throws AppError if the user is not found
 */
export const selectUserById = (id: number): User => {
	const query = 'SELECT * FROM users WHERE id = ?';
	const users = selectByUserId<User>(query, id.toString());
	if (!users.length) {
		throw new AppError('User not found', 'LOGIC');
	}
	return users[0];
};

/**
 * Inserts a user
 * @param userToInsert - The user to insert
 * @returns The user inserted
 * @throws AppError if the user is not valid
 */
export const insertUser = (userToInsert: Raw<User>): User => {
	if (!validateUser(userToInsert)) {
		throw new AppError('Invalid user data', 'LOGIC');
	}
	const query = 'INSERT INTO users (username, email, password_hash, first_name, last_name, theme_preference) VALUES (?, ?, ?, ?, ?, ?)';
	const userId = insert(query, [
		userToInsert.username,
		userToInsert.email,
		userToInsert.password_hash,
		userToInsert.first_name || null,
		userToInsert.last_name || null,
		userToInsert.theme_preference || 'system'
	]);
	return { ...userToInsert, id: userId } as User;
};

export class UserRepository {
	private users: User[] = [];

	constructor() {
		// Initialize with some test users
		this.users = [
			{
				id: 1,
				username: 'admin',
				email: 'admin@example.com',
				password_hash: 'hashed_password_1',
				theme_preference: 'system',
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				id: 2,
				username: 'demo',
				email: 'demo@example.com',
				password_hash: 'hashed_password_2',
				theme_preference: 'system',
				created_at: new Date(),
				updated_at: new Date()
			}
		];
	}

	private validateUser(user: Partial<User>): void {
		if (!user.email || !user.password_hash) {
			throw new AppError('Email and password are required', 'LOGIC');
		}
	}

	async findById(id: number): Promise<User | null> {
		return this.users.find(user => user.id === id) || null;
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.users.find(user => user.email === email) || null;
	}

	async create(user: Raw<User>): Promise<User> {
		if (!validateUser(user)) {
			throw new AppError('Invalid user data', 'LOGIC');
		}

		const newUser: User = {
			id: this.users.length + 1,
			username: user.username,
			email: user.email,
			password_hash: user.password_hash,
			first_name: user.first_name,
			last_name: user.last_name,
			theme_preference: user.theme_preference || 'system',
			created_at: new Date(),
			updated_at: new Date()
		};

		this.users.push(newUser);
		return newUser;
	}

	async update(id: number, user: Partial<User>): Promise<User | null> {
		const index = this.users.findIndex(u => u.id === id);
		if (index === -1) return null;

		const updatedUser = {
			...this.users[index],
			...user,
			updated_at: new Date()
		};

		this.users[index] = updatedUser;
		return updatedUser;
	}

	async delete(id: number): Promise<boolean> {
		const index = this.users.findIndex(user => user.id === id);
		if (index === -1) return false;

		this.users.splice(index, 1);
		return true;
	}

	async findAll(): Promise<User[]> {
		return [...this.users];
	}
}
