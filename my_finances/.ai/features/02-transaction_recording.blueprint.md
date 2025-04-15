# Feature: **02 - Income and Expense Recording**

## Description

This feature enables users to record their financial transactions, including both income and expenses. It provides a user-friendly form for entering transaction details with predefined and custom categories, color-coded for better visualization. The system validates transaction data and stores it securely.

## Involved Data Models

- **Transaction**: Stores transaction details including amount, category, date, description, and type.
- **User**: Associated with transactions for data ownership and filtering.

## Acceptance Criteria (in Gherkin Syntax)

```gherkin
Feature: Income and Expense Recording
  As a user
  I want to record my income and expenses
  So that I can track my financial transactions

  Scenario: Add a new income transaction
    Given I am on the transaction form
    When I select "Income" as the transaction type
    And I enter a valid amount
    And I select or create a category
    And I select a valid date
    And I enter an optional description
    And I submit the form
    Then the transaction should be saved
    And I should see a success message
    And the transaction should appear in my transaction list

  Scenario: Add a new expense transaction
    Given I am on the transaction form
    When I select "Expense" as the transaction type
    And I enter a valid amount (including negative values)
    And I select or create a category
    And I select a valid date
    And I enter an optional description
    And I submit the form
    Then the transaction should be saved
    And I should see a success message
    And the transaction should appear in my transaction list

  Scenario: Create a custom category
    Given I am on the transaction form
    When I click "Add New Category"
    And I enter a category name
    And I select a color for the category
    And I save the category
    Then the new category should be available for selection
    And it should appear in my categories list

  Scenario: Validate future date
    Given I am on the transaction form
    When I select a future date
    And I try to submit the form
    Then I should see an error message
    And the form should not be submitted

  Scenario: Select predefined category
    Given I am on the transaction form
    When I select a predefined category
    Then the category's color should be displayed
    And the category should be properly associated with the transaction
```

## Additional Information

- **Dependencies**: 
  - Angular Material for form components
  - Angular Reactive Forms for form handling
  - LocalStorage for data persistence
  - Chart.js for category color visualization

- **Preconditions**: 
  - User must be logged in
  - Application must have LocalStorage access
  - Predefined categories must be initialized

- **Notes**: 
  - Categories are color-coded for better visual organization
  - Future dates are not allowed for transactions
  - Negative amounts are allowed for expenses
  - No limits on transaction amounts
  - Categories can be either predefined or custom
  - Each category has a unique color for visual distinction

_End of Feature Documentation for Income and Expense Recording_ 