# SQL Plan for **01 - user_registration**

## Plan Preparation

This plan ensures SQL structure, seeds, commands and entity types for the `01 - user_registration` feature.

Before implementing the plan, read the preconditions below.

### Documentation references

Read the following reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/01-user_registration/01-user_registration.blueprint.md)
- [SQL Commands Type](/src/server/api/shared/sql.type.ts)
- [Initialize Utils](/src/server/api/shared/initialize.utils.ts)
- [SQL utils](/src/server/api/shared/sql.utils.ts)
- [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc) 
- [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

### Bill of materials

#### Tables

- `users`: Stores user authentication and profile information
  - `id`: Unique identifier for the user
  - `username`: Unique username for login
  - `email`: User's email address (unique)
  - `password_hash`: Hashed password for secure storage
  - `first_name`: User's first name
  - `last_name`: User's last name
  - `created_at`: Timestamp when the user was created
  - `updated_at`: Timestamp when the user was last updated

#### Seeds

- `users`: Needs seed data for testing and demonstration purposes
  ```json
  [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "password_hash": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
      "first_name": "Admin",
      "last_name": "User",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "username": "demo",
      "email": "demo@example.com",
      "password_hash": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
      "first_name": "Demo",
      "last_name": "User",
      "created_at": "2023-01-02T00:00:00Z",
      "updated_at": "2023-01-02T00:00:00Z"
    }
  ]
  ```

## Plan implementation tasks

### 1. SQL Commands 

- [ ] Create or update the `/src/sql` folder with the SQL commands

- **Rule**: Respect the [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc)

- [ ] Create if not exists a file called `user.sql.json`
- [ ] Fill it or update it with the SQL commands
- [ ] Add the seed data as an array of objects to the `SEED` property if needed

### 2. Domain Entity types

- [ ] Create or update the `/src/server/api/domain` folder with the domain types
  
- **Rule**: Respect the [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

- [ ] Create if not exists a file called `user.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

### 3. Table Initialization functions

Example of desired result:
```typescript
const userSql = await readCommands("user");

export const initializeTables = async (): Promise<void> => {
  // other tables initialization...
  initializeUserTable();
};

const initializeUserTable = (): void => {
	drop(userSql.TABLE);
	create(userSql.CREATE_TABLE);
	seedUsers();
};

const seedUsers = (): void => {
	for (const user of userSql.SEED) {
		insert<User>(userSql.INSERT, user as Raw<User>);
	}
};
```

- [ ] Create or update the `/src/server/api/shared/initialize.utils.ts` file 
- [ ] Read the sql commands for the table at `const userSql = await readCommands("user");`
- [ ] Create if not exists a function called `initializeUserTable`
- [ ] Add the seed data function call if needed
- [ ] Add the table initialization call to the `initializeTables` function

_End of SQL Plan for 01 - user_registration_ 