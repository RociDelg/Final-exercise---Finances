import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
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
  });

  test('should toggle theme manually', async ({ page }) => {
    // Get initial theme
    const initialTheme = await page.evaluate(() => document.body.classList.contains('dark-theme'));
    
    // Click theme toggle button
    await page.click('button:has-text("Toggle Theme")');
    
    // Wait for theme transition
    await page.waitForTimeout(300);
    
    // Verify theme has changed
    const newTheme = await page.evaluate(() => document.body.classList.contains('dark-theme'));
    expect(newTheme).toBe(!initialTheme);
    
    // Verify components have updated styling
    await expect(page.locator('.app-container')).toHaveClass(/theme-transition/);
    await expect(page.locator('.card')).toHaveClass(/theme-transition/);
    await expect(page.locator('.button')).toHaveClass(/theme-transition/);
    
    // Verify accent colors are appropriate
    if (newTheme) {
      await expect(page.locator('.accent-color')).toHaveCSS('color', 'rgb(0, 255, 255)'); // Cyan
    } else {
      await expect(page.locator('.accent-color')).toHaveCSS('color', 'rgb(50, 205, 50)'); // Lime
    }
  });

  test('should update theme based on system preferences', async ({ page, context }) => {
    // Set system theme to dark
    await context.setColorScheme('dark');
    await page.reload();
    
    // Verify application theme is dark
    await expect(page.locator('body')).toHaveClass(/dark-theme/);
    
    // Set system theme to light
    await context.setColorScheme('light');
    await page.reload();
    
    // Verify application theme is light
    await expect(page.locator('body')).not.toHaveClass(/dark-theme/);
    
    // Verify transitions are smooth
    await expect(page.locator('.app-container')).toHaveClass(/theme-transition/);
  });

  test('should persist theme preference', async ({ page, context }) => {
    // Set theme to dark mode
    await page.click('button:has-text("Toggle Theme")');
    
    // Close and reopen the application
    await context.clearCookies();
    await page.goto('/');
    
    // Login again
    await page.click('text=Login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Test123!');
    await page.click('button[type="submit"]');
    
    // Verify theme preference is restored
    await expect(page.locator('body')).toHaveClass(/dark-theme/);
  });

  test('should apply theme to all components', async ({ page }) => {
    // Navigate to different pages to test various components
    const pages = ['Transactions', 'Charts', 'Settings'];
    
    for (const pageName of pages) {
      await page.click(`text=${pageName}`);
      
      // Toggle theme
      await page.click('button:has-text("Toggle Theme")');
      await page.waitForTimeout(300);
      
      // Verify component styling updates
      await expect(page.locator('.component')).toHaveClass(/theme-transition/);
      
      // Verify contrast ratios meet accessibility standards
      const textColor = await page.locator('.text').evaluate(el => 
        window.getComputedStyle(el).color
      );
      const bgColor = await page.locator('.background').evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Note: Actual contrast ratio calculation would be more complex
      // This is a simplified check
      expect(textColor).not.toBe(bgColor);
    }
  });

  test('should apply custom dark mode styling', async ({ page }) => {
    // Toggle to dark mode
    await page.click('button:has-text("Toggle Theme")');
    
    // Test charts component
    await page.click('text=Charts');
    await expect(page.locator('.chart-container')).toHaveClass(/dark-theme/);
    await expect(page.locator('.chart-axis')).toHaveCSS('color', 'rgb(200, 200, 200)');
    
    // Test tables component
    await page.click('text=Transactions');
    await expect(page.locator('.table-container')).toHaveClass(/dark-theme/);
    await expect(page.locator('.table-header')).toHaveCSS('background-color', 'rgb(40, 40, 40)');
    
    // Test forms component
    await page.click('text=Settings');
    await expect(page.locator('.form-container')).toHaveClass(/dark-theme/);
    await expect(page.locator('.input-field')).toHaveCSS('background-color', 'rgb(30, 30, 30)');
    
    // Verify readability
    await expect(page.locator('.text-content')).toHaveCSS('color', 'rgb(240, 240, 240)');
  });
}); 