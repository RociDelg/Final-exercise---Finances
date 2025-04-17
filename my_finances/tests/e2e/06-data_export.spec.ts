import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Data Export', () => {
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

  test('should export filtered transactions to CSV', async ({ page }) => {
    // Apply filters
    await page.fill('input[name="startDate"]', '2024-01-01');
    await page.fill('input[name="endDate"]', '2024-12-31');
    await page.selectOption('select[name="category"]', 'Groceries');
    
    // Click export to CSV button
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Export to CSV")');
    const download = await downloadPromise;
    
    // Verify file is downloaded
    expect(download.suggestedFilename()).toMatch(/\.csv$/);
    
    // Save the file
    const filePath = path.join(process.cwd(), 'downloads', download.suggestedFilename());
    await download.saveAs(filePath);
    
    // Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
    
    // Read and verify file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    expect(fileContent).toContain('Date,Description,Amount,Category,Type');
    expect(fileContent).toContain('Groceries');
    expect(fileContent).toContain('2024');
    
    // Clean up
    fs.unlinkSync(filePath);
  });

  test('should export filtered transactions to PDF', async ({ page }) => {
    // Apply filters
    await page.fill('input[name="startDate"]', '2024-01-01');
    await page.fill('input[name="endDate"]', '2024-12-31');
    await page.selectOption('select[name="type"]', 'expense');
    
    // Click export to PDF button
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Export to PDF")');
    const download = await downloadPromise;
    
    // Verify file is downloaded
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    
    // Save the file
    const filePath = path.join(process.cwd(), 'downloads', download.suggestedFilename());
    await download.saveAs(filePath);
    
    // Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
    
    // Clean up
    fs.unlinkSync(filePath);
  });

  test('should export all transactions with no filters', async ({ page }) => {
    // Clear any existing filters
    await page.click('button:has-text("Clear All Filters")');
    
    // Click export button
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Export to CSV")');
    const download = await downloadPromise;
    
    // Verify file is downloaded
    expect(download.suggestedFilename()).toMatch(/\.csv$/);
    
    // Save the file
    const filePath = path.join(process.cwd(), 'downloads', download.suggestedFilename());
    await download.saveAs(filePath);
    
    // Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
    
    // Read and verify file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    expect(fileContent).toContain('Date,Description,Amount,Category,Type');
    
    // Clean up
    fs.unlinkSync(filePath);
  });

  test('should export transactions with date range filter', async ({ page }) => {
    // Apply date range filter
    await page.fill('input[name="startDate"]', '2024-01-01');
    await page.fill('input[name="endDate"]', '2024-12-31');
    
    // Click export button
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Export to CSV")');
    const download = await downloadPromise;
    
    // Verify file is downloaded
    expect(download.suggestedFilename()).toMatch(/\.csv$/);
    
    // Save the file
    const filePath = path.join(process.cwd(), 'downloads', download.suggestedFilename());
    await download.saveAs(filePath);
    
    // Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
    
    // Read and verify file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    expect(fileContent).toContain('Date,Description,Amount,Category,Type');
    expect(fileContent).toContain('2024');
    
    // Clean up
    fs.unlinkSync(filePath);
  });

  test('should export transactions with category filter', async ({ page }) => {
    // Apply category filter
    await page.selectOption('select[name="category"]', 'Groceries');
    
    // Click export button
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Export to CSV")');
    const download = await downloadPromise;
    
    // Verify file is downloaded
    expect(download.suggestedFilename()).toMatch(/\.csv$/);
    
    // Save the file
    const filePath = path.join(process.cwd(), 'downloads', download.suggestedFilename());
    await download.saveAs(filePath);
    
    // Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
    
    // Read and verify file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    expect(fileContent).toContain('Date,Description,Amount,Category,Type');
    expect(fileContent).toContain('Groceries');
    
    // Clean up
    fs.unlinkSync(filePath);
  });
}); 