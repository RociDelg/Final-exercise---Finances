# Architecture Blueprint for **my_finances**

**my_finances** is a web application for personal use that allows users to register incomes and expenses, view statistics with interactive graphs, and get a summary of their financial situation.

## Main Features

1. **Login and Registration**
   - Authentication with email/password.

2. **Income and Expense Recording**
   - Form to add income and expenses with the following fields:
     - Amount (number)
     - Category (e.g., Food, Transportation, Entertainment)
     - Date (date picker)
     - Optional description
   - Save in Database or LocalStorage.

3. **Financial Summary Display**
   - Show current balance based on income - expenses.
   - Latest recorded transactions with filters by date and category.
   - Option to edit or delete transactions.

4. **Interactive Charts**
   - Bar or line chart: Compare income vs. expenses by month.
   - Pie or donut chart: Expense distribution by category.
   - Use of Chart.js or ngx-charts for dynamic charts.

5. **Filters and Search**
   - Filter transactions by date, category, or type (income/expense).
   - Quick search by description.

6. **Data Export**
   - Download data in CSV or PDF for external analysis.

7. **Dark Mode**
   - Implement light/dark mode with Angular Material.

## Specifications

- **Interaction**: Web
- **Architecture**: Frontend_Backend
- **Database**: Relational
- **Authentication**: JWT
- **Integrations**: None
- **Presentation**: Responsive, Light and Dark_Mode, Lime and Cyan colors, Roboto font

## Tech Stack

- **Frontend**: Angular_SPA
- **Backend**: Node_Express
- **Database**: SQLite
- **E2E Testing**: PlayWright
- **Code Quality**: EsLint_Prettier
- **Styles**: sCSS

## Metadata

- **Date**: 2025-03-26
- **Author**: Rocío Delgado Morales
- **Company**: eMarketingSolutions

_End of Architecture Document for my_finances_ 