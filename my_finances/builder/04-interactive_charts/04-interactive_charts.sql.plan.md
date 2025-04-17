# SQL Plan for 04 - interactive_charts

## Plan Preparation

This plan outlines the SQL implementation for the interactive charts feature, which allows users to create, customize, and interact with various chart types to visualize their financial data.

### Documentation References

- [Project Architecture](../../docs/architecture.md)
- [Data Model](../../docs/data-model.md)
- [SQL Command Types](../../docs/sql-commands.md)

## Tables Definition

### 1. chart Table

This table will store chart configurations and metadata.

```sql
CREATE TABLE chart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  chart_type VARCHAR(20) NOT NULL,
  data_source VARCHAR(50) NOT NULL,
  config JSON,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  UNIQUE(user_id, name)
);
```

#### Fields Description

- `id`: Unique identifier for the chart
- `user_id`: Reference to the user who owns this chart
- `name`: Name of the chart
- `description`: Optional description of the chart
- `chart_type`: Type of chart (line, bar, pie, doughnut)
- `data_source`: Source of data for the chart (transactions, financial_summary, category_summary)
- `config`: JSON configuration for the chart (filters, colors, etc.)
- `created_at`: Timestamp when the record was created
- `updated_at`: Timestamp when the record was last updated

### 2. chart_filter Table

This table will store filters applied to charts.

```sql
CREATE TABLE chart_filter (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chart_id INTEGER NOT NULL,
  filter_type VARCHAR(50) NOT NULL,
  filter_value TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (chart_id) REFERENCES chart(id) ON DELETE CASCADE
);
```

#### Fields Description

- `id`: Unique identifier for the filter
- `chart_id`: Reference to the chart this filter belongs to
- `filter_type`: Type of filter (date_range, category, amount_range, etc.)
- `filter_value`: Value of the filter (JSON string)
- `created_at`: Timestamp when the record was created
- `updated_at`: Timestamp when the record was last updated

## Seed Data

### chart Seed Data

```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Monthly Income vs Expenses",
    "description": "Line chart showing monthly income and expenses",
    "chart_type": "line",
    "data_source": "financial_summary",
    "config": "{\"xAxis\":\"period_start\",\"yAxis\":[\"total_income\",\"total_expenses\"],\"colors\":[\"#4CAF50\",\"#F44336\"]}",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "name": "Expenses by Category",
    "description": "Pie chart showing expenses by category",
    "chart_type": "pie",
    "data_source": "category_summary",
    "config": "{\"labelField\":\"category_id\",\"valueField\":\"amount\",\"colors\":[\"#2196F3\",\"#FFC107\",\"#9C27B0\",\"#FF5722\"]}",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  },
  {
    "id": 3,
    "user_id": 2,
    "name": "Monthly Balance",
    "description": "Bar chart showing monthly balance",
    "chart_type": "bar",
    "data_source": "financial_summary",
    "config": "{\"xAxis\":\"period_start\",\"yAxis\":\"balance\",\"colors\":[\"#4CAF50\"]}",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
]
```

### chart_filter Seed Data

```json
[
  {
    "id": 1,
    "chart_id": 1,
    "filter_type": "date_range",
    "filter_value": "{\"start\":\"2023-01-01\",\"end\":\"2023-12-31\"}",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "chart_id": 2,
    "filter_type": "date_range",
    "filter_value": "{\"start\":\"2023-01-01\",\"end\":\"2023-01-31\"}",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  },
  {
    "id": 3,
    "chart_id": 2,
    "filter_type": "category_type",
    "filter_value": "{\"type\":\"expense\"}",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  },
  {
    "id": 4,
    "chart_id": 3,
    "filter_type": "date_range",
    "filter_value": "{\"start\":\"2023-01-01\",\"end\":\"2023-12-31\"}",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
]
```

## Implementation Tasks

### 1. SQL Commands

1. Create `chart.sql.json` with the following commands:
   - CREATE_TABLE
   - SELECT_ALL
   - SELECT_BY_ID
   - SELECT_BY_USER_ID
   - INSERT
   - UPDATE
   - DELETE
   - SEED (with the provided seed data)

2. Create `chart_filter.sql.json` with the following commands:
   - CREATE_TABLE
   - SELECT_ALL
   - SELECT_BY_ID
   - SELECT_BY_CHART_ID
   - INSERT
   - UPDATE
   - DELETE
   - SEED (with the provided seed data)

### 2. Domain Entity Types

1. Create `chart.type.ts` with:
   - Chart interface extending Entity
   - ChartType type (line, bar, pie, doughnut)
   - DataSource type (transactions, financial_summary, category_summary)
   - NULL_CHART constant
   - validateChart function

2. Create `chart_filter.type.ts` with:
   - ChartFilter interface extending Entity
   - FilterType type (date_range, category, amount_range, etc.)
   - NULL_CHART_FILTER constant
   - validateChartFilter function

### 3. Table Initialization

1. Update `initialize.utils.ts` to include:
   - initializeChartTable function
   - initializeChartFilterTable function
   - seedCharts function
   - seedChartFilters function

2. Ensure proper order of initialization:
   - Users
   - Categories
   - Transactions
   - Financial Summaries
   - Category Summaries
   - Charts
   - Chart Filters

_End of SQL Plan for 04 - interactive_charts_ 