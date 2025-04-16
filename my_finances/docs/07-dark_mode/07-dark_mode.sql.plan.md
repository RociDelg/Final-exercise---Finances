# SQL Plan for **07 - dark_mode**

## Plan Preparation

This plan ensures SQL structure, seeds, commands and entity types for the `07 - dark_mode` feature.

Before implementing the plan, read the preconditions below.

### Documentation references

Read the following reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/07-dark_mode/07-dark_mode.blueprint.md)
- [SQL Commands Type](/src/server/api/shared/sql.type.ts)
- [Initialize Utils](/src/server/api/shared/initialize.utils.ts)
- [SQL utils](/src/server/api/shared/sql.utils.ts)
- [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc) 
- [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

### Bill of materials

#### Tables

- `users`: Stores user information including theme preferences
  - `id`: Unique identifier for the user
  - `username`: Username for login
  - `email`: User's email address
  - `password_hash`: Hashed password for authentication
  - `first_name`: User's first name
  - `last_name`: User's last name
  - `theme_preference`: User's preferred theme (light, dark, or system)
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
      "password_hash": "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iq.s4pJ9Jq1Hy",
      "first_name": "Admin",
      "last_name": "User",
      "theme_preference": "system",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "username": "demo",
      "email": "demo@example.com",
      "password_hash": "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iq.s4pJ9Jq1Hy",
      "first_name": "Demo",
      "last_name": "User",
      "theme_preference": "dark",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 3,
      "username": "light_user",
      "email": "light@example.com",
      "password_hash": "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iq.s4pJ9Jq1Hy",
      "first_name": "Light",
      "last_name": "Theme",
      "theme_preference": "light",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
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
- [ ] Ensure the `theme_preference` field is included in the user type definition

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
- [ ] Add the seed data function calls if needed
- [ ] Add the table initialization call to the `initializeTables` function

_End of SQL Plan for 07 - dark_mode_ 