import { test, expect } from '@playwright/test';

test.describe('Filters and Search', () => {
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
    
    // Navigate to the transactions page
    await page.click('text=Transactions');
  });

  test('should perform real-time search across all fields', async ({ page }) => {
    // Type in the search box
    await page.fill('input[name="search"]', 'groceries');
    
    // Verify results update in real-time
    await expect(page.locator('.transaction-list')).toBeVisible();
    
    // Verify matching text is highlighted
    await expect(page.locator('.highlighted-text')).toContainText('groceries');
    
    // Verify search works across different fields
    await page.fill('input[name="search"]', '100.00');
    await expect(page.locator('.highlighted-text')).toContainText('100.00');
    
    await page.fill('input[name="search"]', '2024-01');
    await expect(page.locator('.highlighted-text')).toContainText('2024-01');
  });

  test('should apply multiple filters simultaneously', async ({ page }) => {
    // Select date range
    await page.fill('input[name="startDate"]', '2024-01-01');
    await page.fill('input[name="endDate"]', '2024-12-31');
    
    // Select category
    await page.selectOption('select[name="category"]', 'Groceries');
    
    // Select transaction type
    await page.selectOption('select[name="type"]', 'expense');
    
    // Verify all filters are applied
    await expect(page.locator('.transaction-list')).toBeVisible();
    
    // Verify results show only matching transactions
    const transactions = await page.locator('.transaction-item').all();
    for (const transaction of transactions) {
      await expect(transaction.locator('.transaction-category')).toContainText('Groceries');
      await expect(transaction.locator('.transaction-type')).toContainText('expense');
      await expect(transaction.locator('.transaction-date')).toContainText('2024');
    }
    
    // Verify result count is displayed
    await expect(page.locator('.result-count')).toBeVisible();
  });

  test('should clear all filters', async ({ page }) => {
    // Apply some filters first
    await page.fill('input[name="startDate"]', '2024-01-01');
    await page.selectOption('select[name="category"]', 'Groceries');
    await page.selectOption('select[name="type"]', 'expense');
    
    // Click clear all filters button
    await page.click('button:has-text("Clear All Filters")');
    
    // Verify filters are reset
    await expect(page.locator('input[name="startDate"]')).toHaveValue('');
    await expect(page.locator('select[name="category"]')).toHaveValue('');
    await expect(page.locator('select[name="type"]')).toHaveValue('');
    
    // Verify full list is displayed
    await expect(page.locator('.transaction-list')).toBeVisible();
    
    // Verify filter count is reset
    await expect(page.locator('.filter-count')).toHaveText('0');
  });

  test('should display filter result counts', async ({ page }) => {
    // Open category filter dropdown
    await page.click('select[name="category"]');
    
    // Verify each option shows result count
    const options = await page.locator('select[name="category"] option').all();
    for (const option of options) {
      await expect(option).toContainText(/\(\d+\)/);
    }
    
    // Apply a filter and verify counts update
    await page.selectOption('select[name="type"]', 'expense');
    
    // Verify counts update
    const updatedOptions = await page.locator('select[name="category"] option').all();
    for (const option of updatedOptions) {
      await expect(option).toContainText(/\(\d+\)/);
    }
    
    // Verify zero results are indicated
    await expect(page.locator('.zero-results')).toBeVisible();
  });

  test('should handle special characters in search', async ({ page }) => {
    // Test various special characters
    const specialChars = ['$', '@', '#', '%', '&', '*', '(', ')', '+', '-', '=', '[', ']', '{', '}', '|', '\\', ';', ':', '"', "'", '<', '>', ',', '.', '?', '/'];
    
    for (const char of specialChars) {
      // Enter special character in search
      await page.fill('input[name="search"]', char);
      
      // Verify search works without errors
      await expect(page.locator('.transaction-list')).toBeVisible();
      
      // Verify results update
      await expect(page.locator('.result-count')).toBeVisible();
    }
  });
}); 