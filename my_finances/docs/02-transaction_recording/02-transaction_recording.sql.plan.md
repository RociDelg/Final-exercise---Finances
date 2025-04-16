# SQL Plan for **02 - transaction_recording**

## Plan Preparation

This plan ensures SQL structure, seeds, commands and entity types for the `02 - transaction_recording` feature.

Before implementing the plan, read the preconditions below.

### Documentation references

Read the following reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/02-transaction_recording/02-transaction_recording.blueprint.md)
- [SQL Commands Type](/src/server/api/shared/sql.type.ts)
- [Initialize Utils](/src/server/api/shared/initialize.utils.ts)
- [SQL utils](/src/server/api/shared/sql.utils.ts)
- [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc) 
- [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

### Bill of materials

#### Tables

- `transactions`: Stores transaction details including amount, category, date, description, and type
  - `id`: Unique identifier for the transaction
  - `user_id`: Foreign key reference to the user who owns the transaction
  - `amount`: The monetary value of the transaction (positive for income, negative for expenses)
  - `description`: Optional description of the transaction
  - `category`: Category of the transaction (e.g., salary, groceries, entertainment)
  - `transaction_date`: Date when the transaction occurred
  - `type`: Type of transaction (income or expense)
  - `created_at`: Timestamp when the transaction was created
  - `updated_at`: Timestamp when the transaction was last updated

- `categories`: Stores predefined and custom categories for transactions
  - `id`: Unique identifier for the category
  - `user_id`: Foreign key reference to the user who owns the category (null for system categories)
  - `name`: Name of the category
  - `color`: Color code for visual representation
  - `is_system`: Boolean indicating if this is a system-provided category
  - `created_at`: Timestamp when the category was created
  - `updated_at`: Timestamp when the category was last updated

#### Seeds

- `categories`: Needs seed data for predefined categories
  ```json
  [
    {
      "id": 1,
      "user_id": null,
      "name": "Salary",
      "color": "#4CAF50",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "user_id": null,
      "name": "Freelance",
      "color": "#8BC34A",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 3,
      "user_id": null,
      "name": "Groceries",
      "color": "#F44336",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 4,
      "user_id": null,
      "name": "Entertainment",
      "color": "#9C27B0",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 5,
      "user_id": null,
      "name": "Transportation",
      "color": "#2196F3",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
  ]
  ```

- `transactions`: Needs seed data for testing and demonstration purposes
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "amount": 5000.00,
      "description": "Monthly salary",
      "category": "Salary",
      "transaction_date": "2023-01-15",
      "type": "income",
      "created_at": "2023-01-15T10:30:00Z",
      "updated_at": "2023-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "amount": -150.00,
      "description": "Weekly groceries",
      "category": "Groceries",
      "transaction_date": "2023-01-16",
      "type": "expense",
      "created_at": "2023-01-16T14:20:00Z",
      "updated_at": "2023-01-16T14:20:00Z"
    },
    {
      "id": 3,
      "user_id": 1,
      "amount": -50.00,
      "description": "Movie tickets",
      "category": "Entertainment",
      "transaction_date": "2023-01-18",
      "type": "expense",
      "created_at": "2023-01-18T19:45:00Z",
      "updated_at": "2023-01-18T19:45:00Z"
    },
    {
      "id": 4,
      "user_id": 2,
      "amount": 1000.00,
      "description": "Freelance project",
      "category": "Freelance",
      "transaction_date": "2023-01-20",
      "type": "income",
      "created_at": "2023-01-20T11:15:00Z",
      "updated_at": "2023-01-20T11:15:00Z"
    },
    {
      "id": 5,
      "user_id": 2,
      "amount": -75.00,
      "description": "Bus pass",
      "category": "Transportation",
      "transaction_date": "2023-01-22",
      "type": "expense",
      "created_at": "2023-01-22T09:30:00Z",
      "updated_at": "2023-01-22T09:30:00Z"
    }
  ]
  ```

## Plan implementation tasks

### 1. SQL Commands 

- [ ] Create or update the `/src/sql` folder with the SQL commands

- **Rule**: Respect the [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc)

- [ ] Create if not exists a file called `transaction.sql.json`
- [ ] Fill it or update it with the SQL commands
- [ ] Add the seed data as an array of objects to the `SEED` property if needed

- [ ] Create if not exists a file called `category.sql.json`
- [ ] Fill it or update it with the SQL commands
- [ ] Add the seed data as an array of objects to the `SEED` property if needed

### 2. Domain Entity types

- [ ] Create or update the `/src/server/api/domain` folder with the domain types
  
- **Rule**: Respect the [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

- [ ] Create if not exists a file called `transaction.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

- [ ] Create if not exists a file called `category.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

### 3. Table Initialization functions

Example of desired result:
```typescript
const transactionSql = await readCommands("transaction");
const categorySql = await readCommands("category");

export const initializeTables = async (): Promise<void> => {
  // other tables initialization...
  initializeCategoryTable();
  initializeTransactionTable();
};

const initializeCategoryTable = (): void => {
	drop(categorySql.TABLE);
	create(categorySql.CREATE_TABLE);
	seedCategories();
};

const seedCategories = (): void => {
	for (const category of categorySql.SEED) {
		insert<Category>(categorySql.INSERT, category as Raw<Category>);
	}
};

const initializeTransactionTable = (): void => {
	drop(transactionSql.TABLE);
	create(transactionSql.CREATE_TABLE);
	seedTransactions();
};

const seedTransactions = (): void => {
	for (const transaction of transactionSql.SEED) {
		insert<Transaction>(transactionSql.INSERT, transaction as Raw<Transaction>);
	}
};
```

- [ ] Create or update the `/src/server/api/shared/initialize.utils.ts` file 
- [ ] Read the sql commands for the tables at `const transactionSql = await readCommands("transaction");` and `const categorySql = await readCommands("category");`
- [ ] Create if not exists functions called `initializeTransactionTable` and `initializeCategoryTable`
- [ ] Add the seed data function calls if needed
- [ ] Add the table initialization calls to the `initializeTables` function

_End of SQL Plan for 02 - transaction_recording_ 