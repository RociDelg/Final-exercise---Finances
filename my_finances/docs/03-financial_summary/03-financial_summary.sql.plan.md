# SQL Plan for **03 - financial_summary**

## Plan Preparation

This plan ensures SQL structure, seeds, commands and entity types for the `03 - financial_summary` feature.

Before implementing the plan, read the preconditions below.

### Documentation references

Read the following reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/03-financial_summary/03-financial_summary.blueprint.md)
- [SQL Commands Type](/src/server/api/shared/sql.type.ts)
- [Initialize Utils](/src/server/api/shared/initialize.utils.ts)
- [SQL utils](/src/server/api/shared/sql.utils.ts)
- [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc) 
- [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

### Bill of materials

#### Tables

- `transactions`: Stores transaction details including amount, category, date, description, type, and status
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

- `charts`: Stores aggregated data for balance trends visualization
  - `id`: Unique identifier for the chart
  - `user_id`: Foreign key reference to the user who owns the chart
  - `name`: Name of the chart
  - `description`: Optional description of the chart
  - `chart_type`: Type of chart (line, bar, etc.)
  - `data`: JSON string containing the chart data
  - `created_at`: Timestamp when the chart was created
  - `updated_at`: Timestamp when the chart was last updated

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
    }
  ]
  ```

- `charts`: Needs seed data for testing and demonstration purposes
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "name": "Monthly Balance Trend",
      "description": "Shows balance changes over the current month",
      "chart_type": "line",
      "data": "{\"labels\":[\"Jan 1\",\"Jan 5\",\"Jan 10\",\"Jan 15\",\"Jan 20\",\"Jan 25\",\"Jan 30\"],\"datasets\":[{\"label\":\"Balance\",\"data\":[0,0,0,5000,4850,4800,4700,4400,5400,5325,5225,4925,4625],\"borderColor\":\"#4CAF50\",\"tension\":0.1}]}",
      "created_at": "2023-01-31T00:00:00Z",
      "updated_at": "2023-01-31T00:00:00Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "name": "Expense by Category",
      "description": "Shows expenses broken down by category",
      "chart_type": "pie",
      "data": "{\"labels\":[\"Groceries\",\"Entertainment\",\"Utilities\",\"Transportation\",\"Dining\",\"Shopping\",\"Health\"],\"datasets\":[{\"data\":[150,50,200,75,120,300,80],\"backgroundColor\":[\"#F44336\",\"#9C27B0\",\"#FF9800\",\"#2196F3\",\"#E91E63\",\"#673AB7\",\"#00BCD4\"]}]}",
      "created_at": "2023-01-31T00:00:00Z",
      "updated_at": "2023-01-31T00:00:00Z"
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

- [ ] Create if not exists a file called `chart.sql.json`
- [ ] Fill it or update it with the SQL commands
- [ ] Add the seed data as an array of objects to the `SEED` property if needed

### 2. Domain Entity types

- [ ] Create or update the `/src/server/api/domain` folder with the domain types
  
- **Rule**: Respect the [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

- [ ] Create if not exists a file called `transaction.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

- [ ] Create if not exists a file called `chart.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

### 3. Table Initialization functions

Example of desired result:
```typescript
const transactionSql = await readCommands("transaction");
const chartSql = await readCommands("chart");

export const initializeTables = async (): Promise<void> => {
  // other tables initialization...
  initializeTransactionTable();
  initializeChartTable();
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

const initializeChartTable = (): void => {
	drop(chartSql.TABLE);
	create(chartSql.CREATE_TABLE);
	seedCharts();
};

const seedCharts = (): void => {
	for (const chart of chartSql.SEED) {
		insert<Chart>(chartSql.INSERT, chart as Raw<Chart>);
	}
};
```

- [ ] Create or update the `/src/server/api/shared/initialize.utils.ts` file 
- [ ] Read the sql commands for the tables at `const transactionSql = await readCommands("transaction");` and `const chartSql = await readCommands("chart");`
- [ ] Create if not exists functions called `initializeTransactionTable` and `initializeChartTable`
- [ ] Add the seed data function calls if needed
- [ ] Add the table initialization calls to the `initializeTables` function

_End of SQL Plan for 03 - financial_summary_ 