# Table of Contents
1. [Overview](#1-overview)
2. [Key Components](#2-key-components)
3. [Data Flow](#3-data-flow)
4. [How to Run](#4-how-to-run)
5. [Key Features](#5-key-features)
6. [Directory Structure](#6-directory-structure)

## 1. Overview

my_finances is a web application designed for personal financial management. It allows users to track their income and expenses, visualize financial data through interactive charts, and export their financial information for external analysis. The application provides a comprehensive dashboard for financial overview and supports both light and dark themes for comfortable usage in different lighting conditions.

The application is built using Angular for the frontend, with TypeScript as the programming language. It utilizes Angular Material for UI components, Chart.js for data visualization, and LocalStorage for data persistence. The application follows a functional programming paradigm and implements a layered architecture for clean separation of concerns.

### Key Technologies
- **Frontend Framework**: Angular
- **Language**: TypeScript
- **Styling**: SCSS
- **UI Components**: Angular Material
- **Data Visualization**: Chart.js
- **State Management**: LocalStorage
- **Routing**: Angular Router
- **Testing**: Jasmine, Karma, Cypress

### Critical External Libraries/Services
- Angular Material (UI components)
- Chart.js (data visualization)
- LocalStorage API (data persistence)
- Angular Forms (form handling)
- Angular Router (navigation)

## 2. Key Components

### Major Modules/Directories
- **app/**: Contains the main application code
  - **components/**: Reusable UI components
  - **pages/**: Application pages and views
  - **services/**: Business logic and data services
  - **guards/**: Route protection and authentication
  - **interceptors/**: HTTP request/response handling
  - **models/**: TypeScript interfaces and types
  - **utils/**: Helper functions and utilities

### Core Classes/Functions
- **AuthService**: Manages user authentication and session handling
- **UserService**: Handles user profile data and preferences
- **TransactionService**: Manages financial transactions (CRUD operations)
- **ChartService**: Processes data for visualization and manages chart configurations
- **ThemeService**: Handles theme switching and persistence
- **LocalStorageService**: Manages data persistence in browser storage
- **ExportService**: Handles data export in various formats

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
   - LocalStorage persistence

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
- LocalStorage preferences in `src/app/services/storage.service.ts`
- Theme configuration in `src/styles/themes/`
- API endpoints in `src/app/services/api.service.ts`

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
│   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── transactions/ # Transaction components
│   │   │   ├── charts/       # Chart components
│   │   │   └── shared/       # Shared components
│   │   ├── pages/            # Application pages
│   │   │   ├── auth/         # Authentication pages
│   │   │   ├── dashboard/    # Dashboard page
│   │   │   ├── transactions/ # Transaction pages
│   │   │   └── settings/     # Settings page
│   │   ├── services/         # Business logic services
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── transaction.service.ts
│   │   │   ├── chart.service.ts
│   │   │   └── theme.service.ts
│   │   ├── guards/           # Route guards
│   │   │   ├── auth.guard.ts
│   │   │   └── non-auth.guard.ts
│   │   ├── interceptors/     # HTTP interceptors
│   │   │   └── auth.interceptor.ts
│   │   └── models/           # Data models
│   │       ├── user.model.ts
│   │       ├── transaction.model.ts
│   │       └── chart.model.ts
│   ├── assets/
│   │   ├── styles/           # Global styles and themes
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   └── themes/
│   │   └── icons/            # Application icons
│   └── environments/
│       ├── environment.ts    # Development environment
│       └── environment.prod.ts # Production environment
├── .ai/
│   ├── features/             # Feature documentation
│   │   ├── 01-user_registration.blueprint.md
│   │   ├── 02-transaction_recording.blueprint.md
│   │   └── ...
│   ├── architect.blueprint.md  # Architecture documentation
│   ├── system-architecture.blueprint.md  # System architecture
│   └── data-model.blueprint.md  # Data model documentation
└── docs/
    ├── OVERVIEW.md           # Project overview
    └── JOURNAL.md            # Development journal
```

[Project Repository](https://github.com/AIcodeAcademy/full_stack_blueprint) 