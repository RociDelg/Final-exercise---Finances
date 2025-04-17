# SQL Plan for **06 - data_export**

## Plan Preparation

This plan ensures SQL structure, seeds, commands and entity types for the `06 - data_export` feature.

Before implementing the plan, read the preconditions below.

### Documentation references

Read the following reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/06-data_export/06-data_export.blueprint.md)
- [SQL Commands Type](/src/server/api/shared/sql.type.ts)
- [Initialize Utils](/src/server/api/shared/initialize.utils.ts)
- [SQL utils](/src/server/api/shared/sql.utils.ts)
- [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc) 
- [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

### Bill of materials

#### Tables

- `transactions`: Stores transaction details for export functionality
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

- `export_logs`: Tracks export operations for auditing purposes
  - `id`: Unique identifier for the export log
  - `user_id`: Foreign key reference to the user who performed the export
  - `export_type`: Type of export (CSV or PDF)
  - `filter_criteria`: JSON string containing the filter criteria used for the export
  - `record_count`: Number of records exported
  - `export_date`: Timestamp when the export was performed
  - `created_at`: Timestamp when the log was created
  - `updated_at`: Timestamp when the log was last updated

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
    }
  ]
  ```

- `export_logs`: Needs seed data for testing and demonstration purposes
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "export_type": "CSV",
      "filter_criteria": "{\"dateRange\":{\"start\":\"2023-01-01\",\"end\":\"2023-01-31\"},\"category\":\"all\"}",
      "record_count": 8,
      "export_date": "2023-02-01T14:30:00Z",
      "created_at": "2023-02-01T14:30:00Z",
      "updated_at": "2023-02-01T14:30:00Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "export_type": "PDF",
      "filter_criteria": "{\"dateRange\":{\"start\":\"2023-01-01\",\"end\":\"2023-01-31\"},\"category\":\"Groceries\"}",
      "record_count": 1,
      "export_date": "2023-02-02T10:15:00Z",
      "created_at": "2023-02-02T10:15:00Z",
      "updated_at": "2023-02-02T10:15:00Z"
    },
    {
      "id": 3,
      "user_id": 1,
      "export_type": "CSV",
      "filter_criteria": "{\"dateRange\":{\"start\":\"2023-01-01\",\"end\":\"2023-12-31\"},\"category\":\"all\",\"type\":\"income\"}",
      "record_count": 2,
      "export_date": "2023-02-05T16:45:00Z",
      "created_at": "2023-02-05T16:45:00Z",
      "updated_at": "2023-02-05T16:45:00Z"
    }
  ]
  ```

## Plan implementation tasks

### 1. SQL Commands 

- [x] Create or update the `/src/sql` folder with the SQL commands

- **Rule**: Respect the [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc)

- [x] Create if not exists a file called `transaction.sql.json`
- [x] Fill it or update it with the SQL commands
- [x] Add the seed data as an array of objects to the `SEED` property if needed

- [x] Create if not exists a file called `export_log.sql.json`
- [x] Fill it or update it with the SQL commands
- [x] Add the seed data as an array of objects to the `SEED` property if needed

### 2. Domain Entity types

- [x] Create or update the `/src/server/api/domain` folder with the domain types
  
- **Rule**: Respect the [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

- [x] Create if not exists a file called `transaction.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

- [x] Create if not exists a file called `export_log.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

### 3. Table Initialization functions

Example of desired result:
```typescript
const transactionSql = await readCommands("transaction");
const exportLogSql = await readCommands("export_log");

export const initializeTables = async (): Promise<void> => {
  // other tables initialization...
  initializeTransactionTable();
  initializeExportLogTable();
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

const initializeExportLogTable = (): void => {
	drop(exportLogSql.TABLE);
	create(exportLogSql.CREATE_TABLE);
	seedExportLogs();
};

const seedExportLogs = (): void => {
	for (const exportLog of exportLogSql.SEED) {
		insert<ExportLog>(exportLogSql.INSERT, exportLog as Raw<ExportLog>);
	}
};
```

- [x] Create or update the `/src/server/api/shared/initialize.utils.ts` file 
- [x] Read the sql commands for the tables at `const transactionSql = await readCommands("transaction");` and `const exportLogSql = await readCommands("export_log");`
- [x] Create if not exists functions called `initializeTransactionTable` and `initializeExportLogTable`
- [x] Add the seed data function calls if needed
- [x] Add the table initialization calls to the `initializeTables` function

_End of SQL Plan for 06 - data_export_ 