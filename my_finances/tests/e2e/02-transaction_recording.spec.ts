import { test, expect } from '@playwright/test';

test.describe('Transaction Recording', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page and login before each test
    await page.goto('/');
    
    // Login with test credentials
    await page.click('text=Login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Test123!');
    await page.click('button[type="submit"]');
    
    // Wait for navigation to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Navigate to the transaction form
    await page.click('text=Add Transaction');
  });

  test('should display transaction form', async ({ page }) => {
    // Verify the transaction form is displayed with all required fields
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('select[name="type"]')).toBeVisible();
    await expect(page.locator('input[name="amount"]')).toBeVisible();
    await expect(page.locator('select[name="category"]')).toBeVisible();
    await expect(page.locator('input[name="date"]')).toBeVisible();
    await expect(page.locator('textarea[name="description"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should add a new income transaction', async ({ page }) => {
    // Select income as transaction type
    await page.selectOption('select[name="type"]', 'income');
    
    // Enter valid amount
    await page.fill('input[name="amount"]', '1000');
    
    // Select a category
    await page.selectOption('select[name="category"]', 'Salary');
    
    // Select today's date
    const today = new Date().toISOString().split('T')[0];
    await page.fill('input[name="date"]', today);
    
    // Enter description
    await page.fill('textarea[name="description"]', 'Monthly salary');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=Transaction saved successfully')).toBeVisible();
    
    // Verify transaction appears in the list
    await expect(page.locator('text=Monthly salary')).toBeVisible();
    await expect(page.locator('text=1000')).toBeVisible();
    await expect(page.locator('text=Salary')).toBeVisible();
  });

  test('should add a new expense transaction', async ({ page }) => {
    // Select expense as transaction type
    await page.selectOption('select[name="type"]', 'expense');
    
    // Enter valid amount (negative for expense)
    await page.fill('input[name="amount"]', '-50');
    
    // Select a category
    await page.selectOption('select[name="category"]', 'Groceries');
    
    // Select today's date
    const today = new Date().toISOString().split('T')[0];
    await page.fill('input[name="date"]', today);
    
    // Enter description
    await page.fill('textarea[name="description"]', 'Weekly groceries');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=Transaction saved successfully')).toBeVisible();
    
    // Verify transaction appears in the list
    await expect(page.locator('text=Weekly groceries')).toBeVisible();
    await expect(page.locator('text=-50')).toBeVisible();
    await expect(page.locator('text=Groceries')).toBeVisible();
  });

  test('should create a custom category', async ({ page }) => {
    // Click on add new category button
    await page.click('text=Add New Category');
    
    // Wait for the category form to appear
    await expect(page.locator('input[name="categoryName"]')).toBeVisible();
    
    // Enter category name
    await page.fill('input[name="categoryName"]', 'Custom Category');
    
    // Select a color
    await page.click('input[name="categoryColor"]');
    await page.click('.color-picker-option:nth-child(3)'); // Select the third color option
    
    // Save the category
    await page.click('button:has-text("Save Category")');
    
    // Verify the new category is available in the dropdown
    await page.selectOption('select[name="category"]', 'Custom Category');
    
    // Verify the category appears in the categories list
    await page.click('text=Categories');
    await expect(page.locator('text=Custom Category')).toBeVisible();
  });

  test('should validate future date', async ({ page }) => {
    // Select a future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    await page.fill('input[name="date"]', futureDateString);
    
    // Fill other required fields
    await page.selectOption('select[name="type"]', 'income');
    await page.fill('input[name="amount"]', '100');
    await page.selectOption('select[name="category"]', 'Salary');
    
    // Try to submit the form
    await page.click('button[type="submit"]');
    
    // Verify error message
    await expect(page.locator('text=Future dates are not allowed')).toBeVisible();
    
    // Verify form is not submitted
    await expect(page.locator('text=Transaction saved successfully')).not.toBeVisible();
  });

  test('should display category color when selected', async ({ page }) => {
    // Select a predefined category
    await page.selectOption('select[name="category"]', 'Entertainment');
    
    // Verify the category's color is displayed
    await expect(page.locator('.category-color-indicator')).toBeVisible();
    
    // Verify the color matches the expected color for Entertainment
    const colorIndicator = await page.locator('.category-color-indicator');
    const backgroundColor = await colorIndicator.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(backgroundColor).toBe('rgb(255, 0, 0)'); // Assuming Entertainment is red
  });

  test('should show validation errors for empty form submission', async ({ page }) => {
    // Submit the form without filling any fields
    await page.click('button[type="submit"]');
    
    // Verify validation error messages are displayed
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('text=Transaction type is required')).toBeVisible();
    await expect(page.locator('text=Amount is required')).toBeVisible();
    await expect(page.locator('text=Category is required')).toBeVisible();
    await expect(page.locator('text=Date is required')).toBeVisible();
  });

  test('should show validation error for invalid amount', async ({ page }) => {
    // Fill the form with invalid amount
    await page.selectOption('select[name="type"]', 'income');
    await page.fill('input[name="amount"]', 'abc');
    await page.selectOption('select[name="category"]', 'Salary');
    
    // Select today's date
    const today = new Date().toISOString().split('T')[0];
    await page.fill('input[name="date"]', today);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify amount validation error is displayed
    await expect(page.locator('text=Please enter a valid number')).toBeVisible();
  });

  test('should filter transactions by type', async ({ page }) => {
    // Add an income transaction
    await page.selectOption('select[name="type"]', 'income');
    await page.fill('input[name="amount"]', '1000');
    await page.selectOption('select[name="category"]', 'Salary');
    const today = new Date().toISOString().split('T')[0];
    await page.fill('input[name="date"]', today);
    await page.fill('textarea[name="description"]', 'Monthly salary');
    await page.click('button[type="submit"]');
    
    // Add an expense transaction
    await page.click('text=Add Transaction');
    await page.selectOption('select[name="type"]', 'expense');
    await page.fill('input[name="amount"]', '-50');
    await page.selectOption('select[name="category"]', 'Groceries');
    await page.fill('input[name="date"]', today);
    await page.fill('textarea[name="description"]', 'Weekly groceries');
    await page.click('button[type="submit"]');
    
    // Filter by income
    await page.click('text=Filter');
    await page.selectOption('select[name="filterType"]', 'income');
    await page.click('button:has-text("Apply Filter")');
    
    // Verify only income transactions are displayed
    await expect(page.locator('text=Monthly salary')).toBeVisible();
    await expect(page.locator('text=Weekly groceries')).not.toBeVisible();
    
    // Filter by expense
    await page.click('text=Filter');
    await page.selectOption('select[name="filterType"]', 'expense');
    await page.click('button:has-text("Apply Filter")');
    
    // Verify only expense transactions are displayed
    await expect(page.locator('text=Monthly salary')).not.toBeVisible();
    await expect(page.locator('text=Weekly groceries')).toBeVisible();
  });
}); 