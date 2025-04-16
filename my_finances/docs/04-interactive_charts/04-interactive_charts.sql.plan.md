# SQL Plan for **04 - interactive_charts**

## Plan Preparation

This plan ensures SQL structure, seeds, commands and entity types for the `04 - interactive_charts` feature.

Before implementing the plan, read the preconditions below.

### Documentation references

Read the following reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/04-interactive_charts/04-interactive_charts.blueprint.md)
- [SQL Commands Type](/src/server/api/shared/sql.type.ts)
- [Initialize Utils](/src/server/api/shared/initialize.utils.ts)
- [SQL utils](/src/server/api/shared/sql.utils.ts)
- [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc) 
- [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

### Bill of materials

#### Tables

- `charts`: Stores chart configurations, data, and user preferences
  - `id`: Unique identifier for the chart
  - `user_id`: Foreign key reference to the user who owns the chart
  - `name`: Name of the chart
  - `description`: Optional description of the chart
  - `chart_type`: Type of chart (bar, line, pie)
  - `data`: JSON string containing the chart data
  - `config`: JSON string containing chart configuration (colors, labels, etc.)
  - `period`: Time period for data aggregation (monthly, yearly)
  - `comparison_enabled`: Boolean indicating if period comparison is enabled
  - `created_at`: Timestamp when the chart was created
  - `updated_at`: Timestamp when the chart was last updated

- `transactions`: Stores transaction details for chart data source
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

#### Seeds

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
      "config": "{\"colors\":[\"#4CAF50\"],\"showLegend\":true,\"showTooltips\":true,\"animation\":true}",
      "period": "monthly",
      "comparison_enabled": false,
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
      "config": "{\"showLegend\":true,\"showTooltips\":true,\"animation\":true}",
      "period": "monthly",
      "comparison_enabled": false,
      "created_at": "2023-01-31T00:00:00Z",
      "updated_at": "2023-01-31T00:00:00Z"
    },
    {
      "id": 3,
      "user_id": 1,
      "name": "Monthly vs Yearly Comparison",
      "description": "Compares monthly and yearly income and expenses",
      "chart_type": "bar",
      "data": "{\"labels\":[\"Jan\",\"Feb\",\"Mar\",\"Apr\",\"May\",\"Jun\",\"Jul\",\"Aug\",\"Sep\",\"Oct\",\"Nov\",\"Dec\"],\"datasets\":[{\"label\":\"Monthly Income\",\"data\":[5000,5200,5100,5300,5400,5500,5600,5700,5800,5900,6000,6100],\"backgroundColor\":\"#4CAF50\"},{\"label\":\"Monthly Expenses\",\"data\":[3000,3100,3200,3300,3400,3500,3600,3700,3800,3900,4000,4100],\"backgroundColor\":\"#F44336\"},{\"label\":\"Yearly Income\",\"data\":[60000,60000,60000,60000,60000,60000,60000,60000,60000,60000,60000,60000],\"backgroundColor\":\"#2196F3\"},{\"label\":\"Yearly Expenses\",\"data\":[36000,36000,36000,36000,36000,36000,36000,36000,36000,36000,36000,36000],\"backgroundColor\":\"#FF9800\"}]}",
      "config": "{\"showLegend\":true,\"showTooltips\":true,\"animation\":true}",
      "period": "yearly",
      "comparison_enabled": true,
      "created_at": "2023-01-31T00:00:00Z",
      "updated_at": "2023-01-31T00:00:00Z"
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
    }
  ]
  ```

## Plan implementation tasks

### 1. SQL Commands 

- [ ] Create or update the `/src/sql` folder with the SQL commands

- **Rule**: Respect the [SQL-Commands JSON rule](/.cursor/rules/sql-commands-json.mdc)

- [ ] Create if not exists a file called `chart.sql.json`
- [ ] Fill it or update it with the SQL commands
- [ ] Add the seed data as an array of objects to the `SEED` property if needed

- [ ] Create if not exists a file called `transaction.sql.json`
- [ ] Fill it or update it with the SQL commands
- [ ] Add the seed data as an array of objects to the `SEED` property if needed

### 2. Domain Entity types

- [ ] Create or update the `/src/server/api/domain` folder with the domain types
  
- **Rule**: Respect the [Server domain entity rule](/.cursor/rules/server-domain-entity.mdc)

- [ ] Create if not exists a file called `chart.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

- [ ] Create if not exists a file called `transaction.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

### 3. Table Initialization functions

Example of desired result:
```typescript
const chartSql = await readCommands("chart");
const transactionSql = await readCommands("transaction");

export const initializeTables = async (): Promise<void> => {
  // other tables initialization...
  initializeChartTable();
  initializeTransactionTable();
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
- [ ] Read the sql commands for the tables at `const chartSql = await readCommands("chart");` and `const transactionSql = await readCommands("transaction");`
- [ ] Create if not exists functions called `initializeChartTable` and `initializeTransactionTable`
- [ ] Add the seed data function calls if needed
- [ ] Add the table initialization calls to the `initializeTables` function

_End of SQL Plan for 04 - interactive_charts_ 