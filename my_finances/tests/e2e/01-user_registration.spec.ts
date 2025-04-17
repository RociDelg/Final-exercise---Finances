import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
  });

  test('should display registration form', async ({ page }) => {
    // Click on the register link
    await page.click('text=Register');
    
    // Verify the registration form is displayed
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty form submission', async ({ page }) => {
    // Navigate to registration page
    await page.click('text=Register');
    
    // Submit the form without filling any fields
    await page.click('button[type="submit"]');
    
    // Verify validation error messages are displayed
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('text=Username is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should show validation error for invalid email format', async ({ page }) => {
    // Navigate to registration page
    await page.click('text=Register');
    
    // Fill the form with invalid email
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'Test123!');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify email validation error is displayed
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

  test('should show validation error for weak password', async ({ page }) => {
    // Navigate to registration page
    await page.click('text=Register');
    
    // Fill the form with weak password
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'weak');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify password validation error is displayed
    await expect(page.locator('text=Password must be at least 8 characters')).toBeVisible();
    await expect(page.locator('text=Password must contain at least one number')).toBeVisible();
    await expect(page.locator('text=Password must contain at least one special character')).toBeVisible();
  });

  test('should successfully register a new user', async ({ page }) => {
    // Navigate to registration page
    await page.click('text=Register');
    
    // Generate a unique username to avoid conflicts
    const uniqueUsername = `testuser${Date.now()}`;
    
    // Fill the form with valid data
    await page.fill('input[name="username"]', uniqueUsername);
    await page.fill('input[name="email"]', `${uniqueUsername}@example.com`);
    await page.fill('input[name="password"]', 'Test123!');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify successful registration
    await expect(page.locator('text=Registration successful')).toBeVisible();
    
    // Verify redirection to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should show error for existing username', async ({ page }) => {
    // Navigate to registration page
    await page.click('text=Register');
    
    // Fill the form with an existing username
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Test123!');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify error message for existing username
    await expect(page.locator('text=Username already exists')).toBeVisible();
  });

  test('should show error for existing email', async ({ page }) => {
    // Navigate to registration page
    await page.click('text=Register');
    
    // Fill the form with an existing email
    await page.fill('input[name="username"]', 'newuser');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'Test123!');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify error message for existing email
    await expect(page.locator('text=Email already registered')).toBeVisible();
  });

  test('should navigate to login page from registration', async ({ page }) => {
    // Navigate to registration page
    await page.click('text=Register');
    
    // Click on the login link
    await page.click('text=Already have an account? Login');
    
    // Verify redirection to login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });
}); 