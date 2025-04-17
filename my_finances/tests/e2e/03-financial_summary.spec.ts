import { test, expect } from '@playwright/test';

test.describe('Financial Summary', () => {
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
    
    // Navigate to the financial summary page
    await page.click('text=Financial Summary');
  });

  test('should display current balance and trend', async ({ page }) => {
    // Verify current balance is displayed
    await expect(page.locator('.current-balance')).toBeVisible();
    await expect(page.locator('.balance-amount')).toBeVisible();
    
    // Verify balance trend chart is displayed
    await expect(page.locator('.balance-trend-chart')).toBeVisible();
    
    // Verify only active transactions are included in balance
    await expect(page.locator('.balance-note')).toContainText('Active transactions only');
  });

  test('should display paginated transactions', async ({ page }) => {
    // Verify transactions are displayed
    await expect(page.locator('.transaction-list')).toBeVisible();
    
    // Verify exactly 8 transactions per page
    const transactions = await page.locator('.transaction-item').count();
    expect(transactions).toBeLessThanOrEqual(8);
    
    // Verify pagination controls are visible
    await expect(page.locator('.pagination-controls')).toBeVisible();
    await expect(page.locator('.page-number')).toBeVisible();
    await expect(page.locator('.next-page')).toBeVisible();
    
    // Navigate to next page
    await page.click('.next-page');
    
    // Verify page number has changed
    const currentPage = await page.locator('.page-number').textContent();
    expect(currentPage).toBe('2');
  });

  test('should filter transactions', async ({ page }) => {
    // Open filter panel
    await page.click('text=Filter');
    
    // Select date range
    await page.fill('input[name="startDate"]', '2024-01-01');
    await page.fill('input[name="endDate"]', '2024-12-31');
    
    // Select category
    await page.selectOption('select[name="category"]', 'Groceries');
    
    // Select transaction type
    await page.selectOption('select[name="type"]', 'expense');
    
    // Apply filters
    await page.click('button:has-text("Apply")');
    
    // Verify filtered results
    await expect(page.locator('.transaction-item')).toBeVisible();
    await expect(page.locator('.pagination-controls')).toBeVisible();
    
    // Verify first page is selected
    const currentPage = await page.locator('.page-number').textContent();
    expect(currentPage).toBe('1');
  });

  test('should perform bulk delete transactions', async ({ page }) => {
    // Select multiple transactions
    await page.click('.transaction-checkbox >> nth=0');
    await page.click('.transaction-checkbox >> nth=1');
    
    // Click delete button
    await page.click('button:has-text("Delete Selected")');
    
    // Verify confirmation dialog
    await expect(page.locator('.confirmation-dialog')).toBeVisible();
    await expect(page.locator('text=Are you sure you want to delete the selected transactions?')).toBeVisible();
    
    // Confirm deletion
    await page.click('button:has-text("Confirm")');
    
    // Verify success message
    await expect(page.locator('text=Transactions deleted successfully')).toBeVisible();
    
    // Verify transactions are removed from list
    const selectedTransactions = await page.locator('.transaction-checkbox:checked').count();
    expect(selectedTransactions).toBe(0);
  });

  test('should display balance trends with different periods', async ({ page }) => {
    // Verify chart is visible
    await expect(page.locator('.balance-trend-chart')).toBeVisible();
    
    // Select weekly period
    await page.click('button:has-text("Weekly")');
    await expect(page.locator('.balance-trend-chart')).toBeVisible();
    
    // Select monthly period
    await page.click('button:has-text("Monthly")');
    await expect(page.locator('.balance-trend-chart')).toBeVisible();
    
    // Verify chart is interactive
    await page.hover('.balance-trend-chart');
    await expect(page.locator('.chart-tooltip')).toBeVisible();
  });

  test('should display transaction status', async ({ page }) => {
    // Verify transaction status is visible
    await expect(page.locator('.transaction-status')).toBeVisible();
    
    // Verify different statuses are displayed correctly
    await expect(page.locator('text=Active')).toBeVisible();
    await expect(page.locator('text=Deleted')).toBeVisible();
    await expect(page.locator('text=Modified')).toBeVisible();
  });
}); 