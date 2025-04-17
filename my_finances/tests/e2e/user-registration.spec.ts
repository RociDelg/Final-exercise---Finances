import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display registration form', async ({ page }) => {
    await page.click('text=Register');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.click('text=Register');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('text=Username is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should successfully register a new user', async ({ page }) => {
    await page.click('text=Register');
    
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Test123!');
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Registration successful')).toBeVisible();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error for existing username', async ({ page }) => {
    await page.click('text=Register');
    
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Test123!');
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Username already exists')).toBeVisible();
  });
}); 