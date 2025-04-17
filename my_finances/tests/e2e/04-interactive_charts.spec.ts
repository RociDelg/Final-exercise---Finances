import { test, expect } from '@playwright/test';
import './matchers';

test.describe('Interactive Charts', () => {
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
    
    // Navigate to the charts page
    await page.click('text=Charts');
  });

  test('should switch between chart types', async ({ page }) => {
    // Verify initial chart is displayed
    await expect(page.locator('.chart-container')).toBeVisible();
    
    // Switch to bar chart
    await page.click('button:has-text("Bar")');
    await expect(page.locator('.chart-container')).toHaveClass(/bar-chart/);
    
    // Switch to line chart
    await page.click('button:has-text("Line")');
    await expect(page.locator('.chart-container')).toHaveClass(/line-chart/);
    
    // Switch to pie chart
    await page.click('button:has-text("Pie")');
    await expect(page.locator('.chart-container')).toHaveClass(/pie-chart/);
  });

  test('should customize chart appearance', async ({ page }) => {
    // Open customization panel
    await page.click('button:has-text("Customize")');
    await expect(page.locator('.customization-panel')).toBeVisible();
    
    // Change chart colors
    await page.click('input[name="primaryColor"]');
    await page.fill('input[name="primaryColor"]', '#FF0000');
    
    // Change labels
    await page.fill('input[name="xAxisLabel"]', 'Custom X Label');
    await page.fill('input[name="yAxisLabel"]', 'Custom Y Label');
    
    // Apply changes
    await page.click('button:has-text("Apply")');
    
    // Verify changes are reflected
    await expect(page.locator('.chart-container')).toHaveCSS('--primary-color', '#FF0000');
    await expect(page.locator('.x-axis-label')).toHaveText('Custom X Label');
    await expect(page.locator('.y-axis-label')).toHaveText('Custom Y Label');
  });

  test('should save chart configuration', async ({ page }) => {
    // Open customization panel
    await page.click('button:has-text("Customize")');
    
    // Make some customizations
    await page.fill('input[name="primaryColor"]', '#00FF00');
    await page.fill('input[name="xAxisLabel"]', 'Saved Label');
    
    // Save configuration
    await page.click('button:has-text("Save Configuration")');
    
    // Verify success message
    await expect(page.locator('text=Configuration saved successfully')).toBeVisible();
    
    // Refresh page
    await page.reload();
    
    // Verify configuration persists
    await expect(page.locator('.chart-container')).toHaveCSS('--primary-color', '#00FF00');
    await expect(page.locator('.x-axis-label')).toHaveText('Saved Label');
  });

  test('should view monthly vs yearly comparison', async ({ page }) => {
    // Enable comparison mode
    await page.click('button:has-text("Comparison Mode")');
    
    // Select monthly and yearly periods
    await page.click('button:has-text("Monthly")');
    await page.click('button:has-text("Yearly")');
    
    // Verify both periods are displayed
    await expect(page.locator('.chart-container .monthly-data')).toBeVisible();
    await expect(page.locator('.chart-container .yearly-data')).toBeVisible();
    
    // Verify data aggregation
    await expect(page.locator('.monthly-data .data-point')).toBeVisible();
    await expect(page.locator('.yearly-data .data-point')).toBeVisible();
  });

  test('should display chart tooltips', async ({ page }) => {
    // Hover over a data point
    await page.hover('.data-point');
    
    // Verify tooltip appears
    await expect(page.locator('.chart-tooltip')).toBeVisible();
    
    // Verify tooltip content
    await expect(page.locator('.tooltip-value')).toBeVisible();
    await expect(page.locator('.tooltip-date')).toBeVisible();
    await expect(page.locator('.tooltip-category')).toBeVisible();
    
    // Move mouse away
    await page.mouse.move(0, 0);
    
    // Verify tooltip disappears
    await expect(page.locator('.chart-tooltip')).not.toBeVisible();
  });
}); 