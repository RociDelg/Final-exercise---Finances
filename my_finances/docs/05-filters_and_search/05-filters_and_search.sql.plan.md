# SQL Plan for **05 - filters_and_search**

## Plan Preparation

This plan ensures SQL structure, seeds, commands and entity types for the `05 - filters_and_search` feature.

Before implementing the plan, read the preconditions below.

### Documentation references

Read the following reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/05-filters_and_search/05-filters_and_search.blueprint.md)
- [SQL Commands Type](/src/server/api/shared/sql.type.ts)
- [Initialize Utils](/src/server/api/shared/initialize.utils.ts)
- [SQL utils](/src/server/api/shared/sql.utils.ts)
- [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc) 
- [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

### Bill of materials

#### Tables

- `transactions`: Stores transaction details for search and filtering
  - `id`: Unique identifier for the transaction
  - `user_id`: Foreign key reference to the user who owns the transaction
  - `amount`: The monetary value of the transaction (positive for income, negative for expenses)
  - `description`: Optional description of the transaction
  - `category`: Category of the transaction (e.g., salary, groceries, entertainment)
  - `transaction_date`: Date when the transaction occurred
  - `type`: Type of transaction (income or expense)
  - `status`: Status of the transaction (active, deleted, modified)
  - `created_at`: Timestamp when the transaction was created
  - `updated_at`: Timestamp when the transaction was last updated

- `categories`: Stores predefined and custom categories for filtering
  - `id`: Unique identifier for the category
  - `user_id`: Foreign key reference to the user who owns the category
  - `name`: Name of the category
  - `color`: Color code for the category (for UI display)
  - `is_system`: Boolean indicating if this is a system-defined category
  - `created_at`: Timestamp when the category was created
  - `updated_at`: Timestamp when the category was last updated

#### Seeds

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
      "status": "active",
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
      "status": "active",
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
      "status": "active",
      "created_at": "2023-01-18T19:45:00Z",
      "updated_at": "2023-01-18T19:45:00Z"
    },
    {
      "id": 4,
      "user_id": 1,
      "amount": -200.00,
      "description": "Electric bill",
      "category": "Utilities",
      "transaction_date": "2023-01-20",
      "type": "expense",
      "status": "active",
      "created_at": "2023-01-20T09:15:00Z",
      "updated_at": "2023-01-20T09:15:00Z"
    },
    {
      "id": 5,
      "user_id": 1,
      "amount": 1000.00,
      "description": "Freelance project",
      "category": "Freelance",
      "transaction_date": "2023-01-22",
      "type": "income",
      "status": "active",
      "created_at": "2023-01-22T11:30:00Z",
      "updated_at": "2023-01-22T11:30:00Z"
    },
    {
      "id": 6,
      "user_id": 1,
      "amount": -75.00,
      "description": "Bus pass",
      "category": "Transportation",
      "transaction_date": "2023-01-25",
      "type": "expense",
      "status": "active",
      "created_at": "2023-01-25T08:45:00Z",
      "updated_at": "2023-01-25T08:45:00Z"
    },
    {
      "id": 7,
      "user_id": 1,
      "amount": -120.00,
      "description": "Restaurant dinner",
      "category": "Dining",
      "transaction_date": "2023-01-28",
      "type": "expense",
      "status": "active",
      "created_at": "2023-01-28T20:15:00Z",
      "updated_at": "2023-01-28T20:15:00Z"
    },
    {
      "id": 8,
      "user_id": 1,
      "amount": -300.00,
      "description": "Shopping",
      "category": "Shopping",
      "transaction_date": "2023-01-30",
      "type": "expense",
      "status": "active",
      "created_at": "2023-01-30T16:30:00Z",
      "updated_at": "2023-01-30T16:30:00Z"
    },
    {
      "id": 9,
      "user_id": 1,
      "amount": -80.00,
      "description": "Gym membership",
      "category": "Health",
      "transaction_date": "2023-02-01",
      "type": "expense",
      "status": "active",
      "created_at": "2023-02-01T10:00:00Z",
      "updated_at": "2023-02-01T10:00:00Z"
    },
    {
      "id": 10,
      "user_id": 1,
      "amount": 5200.00,
      "description": "Monthly salary",
      "category": "Salary",
      "transaction_date": "2023-02-15",
      "type": "income",
      "status": "active",
      "created_at": "2023-02-15T10:30:00Z",
      "updated_at": "2023-02-15T10:30:00Z"
    },
    {
      "id": 11,
      "user_id": 1,
      "amount": -160.00,
      "description": "Weekly groceries",
      "category": "Groceries",
      "transaction_date": "2023-02-16",
      "type": "expense",
      "status": "active",
      "created_at": "2023-02-16T14:20:00Z",
      "updated_at": "2023-02-16T14:20:00Z"
    },
    {
      "id": 12,
      "user_id": 1,
      "amount": -60.00,
      "description": "Concert tickets",
      "category": "Entertainment",
      "transaction_date": "2023-02-18",
      "type": "expense",
      "status": "active",
      "created_at": "2023-02-18T19:45:00Z",
      "updated_at": "2023-02-18T19:45:00Z"
    },
    {
      "id": 13,
      "user_id": 1,
      "amount": -220.00,
      "description": "Electric bill",
      "category": "Utilities",
      "transaction_date": "2023-02-20",
      "type": "expense",
      "status": "active",
      "created_at": "2023-02-20T09:15:00Z",
      "updated_at": "2023-02-20T09:15:00Z"
    },
    {
      "id": 14,
      "user_id": 1,
      "amount": 1200.00,
      "description": "Freelance project",
      "category": "Freelance",
      "transaction_date": "2023-02-22",
      "type": "income",
      "status": "active",
      "created_at": "2023-02-22T11:30:00Z",
      "updated_at": "2023-02-22T11:30:00Z"
    },
    {
      "id": 15,
      "user_id": 1,
      "amount": -75.00,
      "description": "Bus pass",
      "category": "Transportation",
      "transaction_date": "2023-02-25",
      "type": "expense",
      "status": "active",
      "created_at": "2023-02-25T08:45:00Z",
      "updated_at": "2023-02-25T08:45:00Z"
    },
    {
      "id": 16,
      "user_id": 1,
      "amount": -130.00,
      "description": "Restaurant dinner",
      "category": "Dining",
      "transaction_date": "2023-02-28",
      "type": "expense",
      "status": "active",
      "created_at": "2023-02-28T20:15:00Z",
      "updated_at": "2023-02-28T20:15:00Z"
    },
    {
      "id": 17,
      "user_id": 1,
      "amount": -350.00,
      "description": "Shopping",
      "category": "Shopping",
      "transaction_date": "2023-03-01",
      "type": "expense",
      "status": "active",
      "created_at": "2023-03-01T16:30:00Z",
      "updated_at": "2023-03-01T16:30:00Z"
    },
    {
      "id": 18,
      "user_id": 1,
      "amount": -80.00,
      "description": "Gym membership",
      "category": "Health",
      "transaction_date": "2023-03-01",
      "type": "expense",
      "status": "active",
      "created_at": "2023-03-01T10:00:00Z",
      "updated_at": "2023-03-01T10:00:00Z"
    }
  ]
  ```

- `categories`: Needs seed data for testing and demonstration purposes
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "name": "Salary",
      "color": "#4CAF50",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "name": "Groceries",
      "color": "#F44336",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 3,
      "user_id": 1,
      "name": "Entertainment",
      "color": "#9C27B0",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 4,
      "user_id": 1,
      "name": "Utilities",
      "color": "#FF9800",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 5,
      "user_id": 1,
      "name": "Freelance",
      "color": "#2196F3",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 6,
      "user_id": 1,
      "name": "Transportation",
      "color": "#E91E63",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 7,
      "user_id": 1,
      "name": "Dining",
      "color": "#673AB7",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 8,
      "user_id": 1,
      "name": "Shopping",
      "color": "#00BCD4",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 9,
      "user_id": 1,
      "name": "Health",
      "color": "#8BC34A",
      "is_system": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": 10,
      "user_id": 1,
      "name": "Travel",
      "color": "#FFC107",
      "is_system": false,
      "created_at": "2023-01-15T00:00:00Z",
      "updated_at": "2023-01-15T00:00:00Z"
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
  initializeTransactionTable();
  initializeCategoryTable();
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
```

- [ ] Create or update the `/src/server/api/shared/initialize.utils.ts` file 
- [ ] Read the sql commands for the tables at `const transactionSql = await readCommands("transaction");` and `const categorySql = await readCommands("category");`
- [ ] Create if not exists functions called `initializeTransactionTable` and `initializeCategoryTable`
- [ ] Add the seed data function calls if needed
- [ ] Add the table initialization calls to the `initializeTables` function

_End of SQL Plan for 05 - filters_and_search_ 