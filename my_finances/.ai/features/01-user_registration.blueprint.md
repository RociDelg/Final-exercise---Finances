# Feature: **01 - User Registration and Login**

## Description

This feature enables users to register and log in to the my_finances application. It provides a secure authentication system that supports both email/password and Google authentication methods. The system validates user credentials and stores user data locally for persistence.

## Involved Data Models

- **User**: Stores user authentication and profile information including email, password, and timestamps.

## Acceptance Criteria (in Gherkin Syntax)

```gherkin
Feature: User Registration and Login
  As a new user
  I want to create an account and log in
  So that I can access my financial management features

  Scenario: Register with email and password
    Given I am on the registration page
    When I enter a valid email and password
    And I submit the registration form
    Then I should be successfully registered
    And I should be redirected to the dashboard

  Scenario: Register with Google
    Given I am on the registration page
    When I click the "Sign in with Google" button
    And I select my Google account
    Then I should be successfully registered
    And I should be redirected to the dashboard

  Scenario: Login with email and password
    Given I have a registered account
    When I enter my email and password
    And I submit the login form
    Then I should be successfully logged in
    And I should be redirected to the dashboard

  Scenario: Password Recovery
    Given I am on the login page
    When I click the "Forgot Password" link
    And I enter my registered email
    Then I should receive a password reset email
    And I should be able to reset my password

  Scenario: Invalid Login Attempt
    Given I am on the login page
    When I enter incorrect credentials
    And I submit the login form
    Then I should see an error message
    And I should remain on the login page
```

## Additional Information

- **Dependencies**: 
  - Firebase Authentication
  - LocalStorage for data persistence
  - Angular Router for navigation
  - Angular Material for UI components

- **Preconditions**: 
  - Firebase project must be configured
  - Google OAuth credentials must be set up
  - Application must have internet connectivity for Firebase services

- **Notes**: 
  - Email format validation follows standard RFC 5322
  - Password must be at least 8 characters long with at least one number and one special character
  - User data is primarily stored in LocalStorage with Firebase as backup
  - JWT tokens are used for session management

_End of Feature Documentation for User Registration and Login_ 