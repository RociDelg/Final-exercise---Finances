# SQL Plan for 05 - filters_and_search

## Plan Preparation

This plan outlines the SQL implementation for the filters and search feature, which enables users to efficiently search and filter their financial transactions with real-time updates and advanced filtering capabilities.

### Documentation References

- [Project Architecture](../../docs/architecture.md)
- [Data Model](../../docs/data-model.md)
- [SQL Command Types](../../docs/sql-commands.md)

## Tables Definition

### 1. search_history Table

This table will store user search history for potential future enhancements.

```sql
CREATE TABLE search_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  search_term TEXT NOT NULL,
  filters JSON,
  result_count INTEGER NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
```

#### Fields Description

- `id`: Unique identifier for the search history entry
- `user_id`: Reference to the user who performed the search
- `search_term`: The search term used
- `filters`: JSON object containing the filters applied during the search
- `result_count`: Number of results returned by this search
- `created_at`: Timestamp when the record was created
- `updated_at`: Timestamp when the record was last updated

### 2. filter_preset Table

This table will store user-defined filter presets for future implementation.

```sql
CREATE TABLE filter_preset (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  filters JSON NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  UNIQUE(user_id, name)
);
```

#### Fields Description

- `id`: Unique identifier for the filter preset
- `user_id`: Reference to the user who owns this preset
- `name`: Name of the preset
- `description`: Optional description of the preset
- `filters`: JSON object containing the filter configuration
- `is_default`: Whether this preset is the default for the user
- `created_at`: Timestamp when the record was created
- `updated_at`: Timestamp when the record was last updated

## Seed Data

### search_history Seed Data

```json
[
  {
    "id": 1,
    "user_id": 1,
    "search_term": "groceries",
    "filters": "{\"date_range\":{\"start\":\"2023-01-01\",\"end\":\"2023-12-31\"},\"category\":\"food\"}",
    "result_count": 15,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "search_term": "rent",
    "filters": "{\"transaction_type\":\"expense\",\"amount_range\":{\"min\":500,\"max\":2000}}",
    "result_count": 12,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
]
```

### filter_preset Seed Data

```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Monthly Bills",
    "description": "Filter for recurring monthly bills",
    "filters": "{\"categories\":[\"utilities\",\"rent\",\"insurance\"],\"transaction_type\":\"expense\"}",
    "is_default": true,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "name": "Income Sources",
    "description": "Track all income sources",
    "filters": "{\"transaction_type\":\"income\",\"date_range\":{\"start\":\"2023-01-01\",\"end\":\"2023-12-31\"}}",
    "is_default": false,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
]
```

## Implementation Tasks

### 1. SQL Commands

1. Create `search_history.sql.json` with the following commands:
   - CREATE_TABLE
   - SELECT_ALL
   - SELECT_BY_ID
   - SELECT_BY_USER_ID
   - SELECT_RECENT_BY_USER_ID (limit to last N searches)
   - INSERT
   - DELETE_OLD_ENTRIES (maintain reasonable history size)
   - SEED (with the provided seed data)

2. Create `filter_preset.sql.json` with the following commands:
   - CREATE_TABLE
   - SELECT_ALL
   - SELECT_BY_ID
   - SELECT_BY_USER_ID
   - SELECT_DEFAULT_BY_USER_ID
   - INSERT
   - UPDATE
   - DELETE
   - SEED (with the provided seed data)

3. Update `transaction.sql.json` with new search-related commands:
   - SEARCH_BY_TERM
   - SEARCH_WITH_FILTERS
   - COUNT_BY_FILTER
   - GET_FILTER_OPTIONS

### 2. Domain Entity Types

1. Create `search_history.type.ts` with:
   - SearchHistory interface extending Entity
   - NULL_SEARCH_HISTORY constant
   - validateSearchHistory function

2. Create `filter_preset.type.ts` with:
   - FilterPreset interface extending Entity
   - NULL_FILTER_PRESET constant
   - validateFilterPreset function

3. Update `transaction.type.ts` with:
   - SearchFilters interface
   - FilterOptions interface
   - validateSearchFilters function

### 3. Table Initialization

1. Update `initialize.utils.ts` to include:
   - initializeSearchHistoryTable function
   - initializeFilterPresetTable function
   - seedSearchHistory function
   - seedFilterPresets function

2. Ensure proper order of initialization:
   - Users
   - Categories
   - Transactions
   - Search History
   - Filter Presets

_End of SQL Plan for 05 - filters_and_search_ 