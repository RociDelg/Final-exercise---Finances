## Architect

- Read and follow instructions in the `architect.instructions.md` file to ask user questions to fill the `architect.template.md` file and generate the `architect.blueprint.md` file.

my_finances is a web application for my private use to register incomes and expenses , view statistics with interactive graphs and get a summary of my financial situacion.

Key Features

1️. Login and Registration (Optional)
• Authentication with email/password.
• Save user data in LocalStorage.

2️. Income and Expense Recording
• Form to add income and expenses with the following fields:
o Amount 💰 (number)
o Category 📌 (e.g., Food, Transportation, Entertainment)
o Date 📅 (date picker)
o Optional description 📝
• Save in LocalStorage.

3️. Financial Summary Display
• Show current balance based on income - expenses.
• Latest recorded transactions with filters by date and category.
• Option to edit or delete transactions.

4️. Interactive Charts 📊
• Bar or line chart: Compare income vs. expenses by month.
• Pie or donut chart: Expense distribution by category.
• Use of Chart.js or ngx-charts for dynamic charts.

5️. Filters and Search 🔍
• Filter transactions by date, category, or type (income/expense).
• Quick search by description.

6️. Data Export 📂
• Download data in CSV or PDF for external analysis.

7️. Dark Mode 🌙 (Optional)
• Implement light/dark mode with Angular Material or Tailwind.

- Go with defaults of your own criteria for this particular case

- Read and follow instructions in the `system-architecture.instructions.md` file to ask user questions to fill the `system-architecture.template.md` file and generate the `system-architecture.blueprint.md` file.

- Read and follow instructions in the `data-model.instructions.md` file to ask user questions to fill the `data-model.template.md` file and generate the `data-model.blueprint.md` file for the `architect.blueprint.md` and `system-architecture.blueprint.md` project documents.

- Read and follow instructions in the `features.instructions.md` file to ask user questions to fill the `features.template.md`  and generate `features/<featureNumber>-<feature_short_name>.blueprint.md files for the `architect.blueprint.md`, `system-architecture.blueprint.md` and `data-model.blueprint.md`project documents.

1. For the User Registration feature:
Should we include social login (Google) as a separate scenario, or keep it as part of the main registration flow? Keep it as part of the main registration flow
Do we need to validate email format and password strength? Yes
Should we include email verification as part of the registration process? No
2. For the Login feature:
Should we include "Remember me" functionality? 
Do we need to implement password recovery? Yes
Should we limit login attempts? No
For Data Storage:
The blueprint mentions both Firestore and LocalStorage. Which one should be the primary storage for user data? LocalStorage
Should we implement a fallback mechanism if the primary storage fails? No

1. For Transaction Categories:
Should we provide predefined categories or allow users to create custom ones? Both
Should categories be color-coded for better visualization? Yes
2. For Transaction Management:
Should we allow recurring transactions (e.g., monthly rent)? No
Should we implement transaction templates for common entries? No
Should we allow splitting transactions into multiple categories? No
3. For Data Validation:
Should we implement any limits on transaction amounts? No
Should we validate future dates for transactions? Yes
Should we allow negative amounts for expenses? Yes

1.For Balance Calculation:
Should we show running balance for each transaction? No
Should we include pending transactions in the balance? No
Should we show balance trends (e.g., weekly/monthly changes)? Yes
2.For Transaction List:
How many transactions should be shown per page? 8
Should we implement infinite scroll or pagination? Pagination
Should we show transaction status (active/deleted/modified)? Yes
3.For Transaction Management:
Should we allow bulk actions (e.g., delete multiple transactions)? Yes
Should we implement undo/redo functionality for edits/deletes? No
Should we show transaction history (previous versions)? No

1.For Chart Types:
Should we allow users to switch between different chart types (e.g., bar/line for trends)? Yes
Should we provide chart customization options (colors, labels, etc.)? Yes
Should we allow users to save their preferred chart configurations? Yes
2.For Data Visualization:
What time periods should be available for data aggregation (daily/weekly/monthly/yearly)? Monthly and yearly
Should we show data comparison between different periods? Yes
Should we include data export options within the charts? No
3.For Chart Interaction:
Should we implement drill-down functionality for detailed views? No
Should we allow users to add annotations or notes to charts? No
Should we provide tooltips with detailed information on hover? Yes


1.For Search Functionality:
Should we implement real-time search as the user types? Yes
Should we search across all transaction fields or specific ones? All transaction fields
Should we provide search suggestions based on previous searches? No
2.For Filtering:
Should we allow combining multiple filters (e.g., date range + category)? Yes
Should we save filter combinations as presets? No
Should we show the number of results for each filter option? Yes
3.For Filter Display:
Should we show active filters as tags that can be removed? No
Should we provide a "clear all filters" option? Yes
Should we remember the last used filters between sessions? No


1.For Export Formats:
Should we support both CSV and PDF formats as mentioned in the blueprint? Yes
Should we allow users to customize the columns/fields in the export? No
Should we include charts and graphs in the PDF export? No
2.For Export Content:
Should we include all transactions or allow filtering before export? Allow filtering before export
Should we include summary statistics in the export? No
Should we include metadata (export date, user info) in the export? No
3.For Export Process:
Should we show a progress indicator during export? No
Should we allow scheduling recurring exports? No
Should we provide a preview before final export? No

1.For Theme Switching:
Should we allow automatic theme switching based on system preferences? Yes
Should we persist the user's theme preference between sessions? Yes
Should we provide a theme toggle button in the navigation bar? Yes
2.For Theme Colors:
Should we use the specified Lime and Cyan colors for both themes? Yes
Should we adjust the contrast ratios for better accessibility? Yes
Should we provide different accent colors for each theme? Yes
3.For Theme Implementation:
Should we implement smooth transitions between themes? Yes
Should we apply the theme to all components consistently? Yes
Should we include custom styling for specific components in dark mode? Yes


Execute @overview.prompt.md to generate the OVERVIEW.md doc

Execute the User entity with email and password

Generate a rule to be applied when generating this kind of files @tools.sql.json

Generate the SQL commands json files for User, Chart and Transaction entities

Generate a resource for User CRUD API (@server-resource.mdc)

I'll help you update the OVERVIEW.md document based on the prompt template and current project state. First, let me examine the current project structure to identify any changes

Write the plan for the feature following the instructions

Implement the plan

Document the e2e installation and running process

Add and e2e rule to the @rules  based on this example and the current rules

Write e2e test for @01-user_registration.blueprint.md 
Write e2e test for  @02-transaction_recording.blueprint.md (with every feature))

Implement cache and unit test

doc and release this project

## Builder

- Follow the instructions in @builder.instructions.md to generate the construction blueprint following the @builder.template.md template and save it as builder.blueprint.md

- Review the @builder.blueprint.md file and make sure it can be used as a prompt for a code generation tool. Ensure it is written in a way that makes sense to code, and double-check naming conventions and coding @rules and respect current folder structure and tech stack.

- Execute the plan from the @builder.blueprint.md file to generate the project's code. Think step by step and execute one step at a time. Choose the most straightforward approach. Follow project @rules and coding conventions.

## Craftsman

- Follow the instructions in @craftsman.instructions.md to generate the improvement blueprint following the @craftsman.template.md template and save it as craftsman.blueprint.md

- Review the @craftsman.blueprint.md file and make sure it can be used as a prompt for a code generation tool. Ensure it is written in a way that makes sense to code, and double-check naming conventions and coding @rules and respect current folder structure and tech stack.

- Execute the plan from the @craftsman.blueprint.md file to generate the project's code. Think step by step and execute one step at a time,ask the user to create a commit for each step. Choose the most straightforward approach. Follow project rules and coding conventions.
