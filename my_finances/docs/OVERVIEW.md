# Table of Contents
1. [Overview](#1-overview)
2. [Key Components](#2-key-components)
3. [Data Flow](#3-data-flow)
4. [How to Run](#4-how-to-run)
5. [Key Features](#5-key-features)
6. [Directory Structure](#6-directory-structure)

## 1. Overview

my_finances is a web application designed for personal financial management. It allows users to track their income and expenses, visualize financial data through interactive charts, and export their financial information for external analysis. The application provides a comprehensive dashboard for financial overview and supports both light and dark themes for comfortable usage in different lighting conditions.

The application is built using Angular for the frontend, with TypeScript as the programming language. It utilizes Angular Material for UI components, Chart.js for data visualization, and a mock SQL database for data persistence. The application follows a functional programming paradigm and implements a layered architecture for clean separation of concerns.

### Key Technologies
- **Frontend Framework**: Angular
- **Language**: TypeScript
- **Styling**: SCSS
- **UI Components**: Angular Material
- **Data Visualization**: Chart.js
- **Data Persistence**: Mock SQL Database
- **Routing**: Angular Router
- **Testing**: Jasmine, Karma, Cypress

### Critical External Libraries/Services
- Angular Material (UI components)
- Chart.js (data visualization)
- Web Crypto API (password hashing)
- Angular Forms (form handling)
- Angular Router (navigation)

## 2. Key Components

### Major Modules/Directories
- **client/app/**: Contains the main client-side application code
  - **domain/**: Type definitions for user tokens, tools, and credentials
  - **tools/**: Components for tools management
  - **home/**: Home page component
  - **shared/**: Common components and utilities
  - **auth/**: Authentication-related components
- **server/api/**: Contains the server-side application code
  - **domain/**: Type definitions for transactions, users, and charts
  - **auth/**: Authentication-related files
  - **tools/**: User management tools
  - **shared/**: Utility files for hashing, JWT, SQL operations, etc.
- **sql/**: JSON files defining SQL commands for charts, transactions, and users
- **models/**: Data model definitions

### Core Classes/Functions
- **AuthService**: Manages user authentication and session handling
- **UserService**: Handles user profile data and preferences
- **TransactionService**: Manages financial transactions (CRUD operations)
- **ChartService**: Processes data for visualization and manages chart configurations
- **ThemeService**: Handles theme switching and persistence
- **MockDatabase**: Simulates database operations for the Angular environment
- **HashUtils**: Handles password hashing using Web Crypto API

## 3. Data Flow

The application follows a structured data flow pattern:

1. **Input Layer**:
   - User authentication (login/registration)
   - Transaction entry forms
   - Filter and search inputs
   - Theme preferences

2. **Processing Layer**:
   - Data validation and sanitization
   - Business logic processing
   - Data aggregation for charts
   - Mock database persistence

3. **Output Layer**:
   - Dashboard displays
   - Transaction lists
   - Interactive charts
   - Export files (CSV/PDF)

The application uses an event-driven architecture where user actions trigger data updates, which in turn update the UI. The main data flow is:

```
User Authentication → User Data Storage → Transaction Management → Data Visualization → Data Export
```

## 4. How to Run

### Setup/Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/RociDelg/Final-exercise---Finances.git
   cd my_finances
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Access the application at `http://localhost:4200`

### Environment Configuration
- Mock database configuration in `src/server/api/shared/sql.utils.ts`
- Theme configuration in `src/app/shared/toggle-theme.component.ts`
- API endpoints in `src/client/app/shared/fetch.utils.ts`

## 5. Key Features

- **User Authentication**:
  - Email/password registration and login
  - Password recovery functionality
  - Session management

- **Transaction Management**:
  - Income and expense recording
  - Category management
  - Transaction filtering and search
  - Bulk transaction actions

- **Financial Dashboard**:
  - Current balance display
  - Transaction history with pagination
  - Balance trends visualization
  - Category-based expense analysis

- **Data Visualization**:
  - Interactive charts (bar, line, pie)
  - Monthly and yearly comparisons
  - Customizable chart configurations
  - Data aggregation options

- **Data Export**:
  - CSV and PDF export formats
  - Filtered data export
  - Structured data formatting

- **Theme Support**:
  - Light and dark mode
  - System preference detection
  - Smooth theme transitions
  - Consistent component styling

## 6. Directory Structure

```
my_finances/
├── src/
│   ├── client/
│   │   └── app/
│   │       ├── domain/       # Type definitions
│   │       │   ├── user-token.type.ts
│   │       │   ├── tool.type.ts
│   │       │   └── credentials.type.ts
│   │       ├── tools/        # Tools management
│   │       │   ├── tools-table.component.ts
│   │       │   ├── tools.repository.ts
│   │       │   └── tools.page.ts
│   │       ├── home/         # Home page
│   │       │   └── home.page.ts
│   │       ├── shared/       # Shared components and utilities
│   │       │   ├── header.component.ts
│   │       │   ├── footer.component.ts
│   │       │   ├── toggle-theme.component.ts
│   │       │   ├── navigation.utils.ts
│   │       │   ├── dom.utils.ts
│   │       │   ├── fetch.utils.ts
│   │       │   ├── result.type.ts
│   │       │   └── format.utils.ts
│   │       └── auth/         # Authentication
│   │           ├── auth.page.ts
│   │           ├── auth-form.component.ts
│   │           └── auth.repository.ts
│   ├── server/
│   │   └── api/
│   │       ├── domain/       # Type definitions
│   │       │   ├── transaction.type.ts
│   │       │   ├── user.type.ts
│   │       │   └── chart.type.ts
│   │       ├── auth/         # Authentication
│   │       │   ├── auth.repository.ts
│   │       │   ├── auth.controller.ts
│   │       │   ├── user-token-response.type.ts
│   │       │   └── credentials-request.type.ts
│   │       ├── tools/        # User management tools
│   │       │   ├── user-post-request.type.ts
│   │       │   ├── user.controller.ts
│   │       │   └── user.repository.ts
│   │       └── shared/       # Utility files
│   │           ├── hash.utils.ts
│   │           ├── jwt.utils.ts
│   │           ├── sql.utils.ts
│   │           ├── request.utils.ts
│   │           ├── jwt-data.type.ts
│   │           ├── initialize.utils.ts
│   │           ├── sql.type.ts
│   │           ├── response.utils.ts
│   │           ├── log.utils.ts
│   │           ├── app-error.class.ts
│   │           └── api-error.type.ts
│   ├── sql/                  # SQL commands
│   │   ├── chart.sql.json
│   │   ├── transaction.sql.json
│   │   └── user.sql.json
│   └── models/               # Data models
│       └── user.model.ts
├── docs/
│   ├── OVERVIEW.md           # Project overview
│   └── JOURNAL.md            # Development journal
```

[Project Repository](https://github.com/RociDelg/Final-exercise---Finances) 