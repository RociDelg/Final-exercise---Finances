# SQL Plan for 03 - financial_summary

## Plan Preparation

This plan outlines the SQL implementation for the financial summary feature, which provides users with a comprehensive overview of their financial status, including income, expenses, and balance.

### Documentation References

- [Project Architecture](../../docs/architecture.md)
- [Data Model](../../docs/data-model.md)
- [SQL Command Types](../../docs/sql-commands.md)

## Tables Definition

### 1. financial_summary Table

This table will store pre-calculated financial summaries for users to improve performance.

```sql
CREATE TABLE financial_summary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_income DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_expenses DECIMAL(10,2) NOT NULL DEFAULT 0,
  balance DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  UNIQUE(user_id, period_start, period_end)
);
```

#### Fields Description

- `id`: Unique identifier for the summary
- `user_id`: Reference to the user who owns this summary
- `period_start`: Start date of the summary period
- `period_end`: End date of the summary period
- `total_income`: Total income for the period
- `total_expenses`: Total expenses for the period
- `balance`: Net balance (income - expenses) for the period
- `created_at`: Timestamp when the record was created
- `updated_at`: Timestamp when the record was last updated

### 2. category_summary Table

This table will store pre-calculated summaries by category for each period.

```sql
CREATE TABLE category_summary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  transaction_count INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (category_id) REFERENCES category(id),
  UNIQUE(user_id, category_id, period_start, period_end)
);
```

#### Fields Description

- `id`: Unique identifier for the category summary
- `user_id`: Reference to the user who owns this summary
- `category_id`: Reference to the category
- `period_start`: Start date of the summary period
- `period_end`: End date of the summary period
- `amount`: Total amount for this category in the period
- `transaction_count`: Number of transactions in this category for the period
- `created_at`: Timestamp when the record was created
- `updated_at`: Timestamp when the record was last updated

## Seed Data

### financial_summary Seed Data

```json
[
  {
    "id": 1,
    "user_id": 1,
    "period_start": "2023-01-01",
    "period_end": "2023-01-31",
    "total_income": 5000.00,
    "total_expenses": 3500.00,
    "balance": 1500.00,
    "created_at": "2023-01-31T23:59:59Z",
    "updated_at": "2023-01-31T23:59:59Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "period_start": "2023-02-01",
    "period_end": "2023-02-28",
    "total_income": 5200.00,
    "total_expenses": 3800.00,
    "balance": 1400.00,
    "created_at": "2023-02-28T23:59:59Z",
    "updated_at": "2023-02-28T23:59:59Z"
  },
  {
    "id": 3,
    "user_id": 2,
    "period_start": "2023-01-01",
    "period_end": "2023-01-31",
    "total_income": 4500.00,
    "total_expenses": 3200.00,
    "balance": 1300.00,
    "created_at": "2023-01-31T23:59:59Z",
    "updated_at": "2023-01-31T23:59:59Z"
  }
]
```

### category_summary Seed Data

```json
[
  {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "period_start": "2023-01-01",
    "period_end": "2023-01-31",
    "amount": 5000.00,
    "transaction_count": 1,
    "created_at": "2023-01-31T23:59:59Z",
    "updated_at": "2023-01-31T23:59:59Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "category_id": 2,
    "period_start": "2023-01-01",
    "period_end": "2023-01-31",
    "amount": 1200.00,
    "transaction_count": 1,
    "created_at": "2023-01-31T23:59:59Z",
    "updated_at": "2023-01-31T23:59:59Z"
  },
  {
    "id": 3,
    "user_id": 1,
    "category_id": 3,
    "period_start": "2023-01-01",
    "period_end": "2023-01-31",
    "amount": 800.00,
    "transaction_count": 1,
    "created_at": "2023-01-31T23:59:59Z",
    "updated_at": "2023-01-31T23:59:59Z"
  },
  {
    "id": 4,
    "user_id": 1,
    "category_id": 4,
    "period_start": "2023-01-01",
    "period_end": "2023-01-31",
    "amount": 1500.00,
    "transaction_count": 1,
    "created_at": "2023-01-31T23:59:59Z",
    "updated_at": "2023-01-31T23:59:59Z"
  }
]
```

## Implementation Tasks

### 1. SQL Commands

1. Create `financial_summary.sql.json` with the following commands:
   - CREATE_TABLE
   - SELECT_ALL
   - SELECT_BY_ID
   - SELECT_BY_USER_ID
   - SELECT_BY_PERIOD
   - INSERT
   - UPDATE
   - DELETE
   - SEED (with the provided seed data)

2. Create `category_summary.sql.json` with the following commands:
   - CREATE_TABLE
   - SELECT_ALL
   - SELECT_BY_ID
   - SELECT_BY_USER_ID
   - SELECT_BY_CATEGORY
   - SELECT_BY_PERIOD
   - INSERT
   - UPDATE
   - DELETE
   - SEED (with the provided seed data)

### 2. Domain Entity Types

1. Create `financial_summary.type.ts` with:
   - FinancialSummary interface extending Entity
   - NULL_FINANCIAL_SUMMARY constant
   - validateFinancialSummary function

2. Create `category_summary.type.ts` with:
   - CategorySummary interface extending Entity
   - NULL_CATEGORY_SUMMARY constant
   - validateCategorySummary function

### 3. Table Initialization

1. Update `initialize.utils.ts` to include:
   - initializeFinancialSummaryTable function
   - initializeCategorySummaryTable function
   - seedFinancialSummaries function
   - seedCategorySummaries function

2. Ensure proper order of initialization:
   - Users
   - Categories
   - Transactions
   - Financial Summaries
   - Category Summaries

_End of SQL Plan for 03 - financial_summary_ 