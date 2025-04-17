import { expect, Locator } from '@playwright/test';

expect.extend({
  async toHaveStyle(locator: Locator, style: Record<string, string>) {
    const element = await locator.elementHandle();
    if (!element) {
      return {
        message: () => `Expected ${locator} to have style ${JSON.stringify(style)}`,
        pass: false,
      };
    }

    const computedStyle = await element.evaluate((el, s) => {
      const style = window.getComputedStyle(el);
      return Object.entries(s).every(([key, value]) => style.getPropertyValue(key) === value);
    }, style);

    return {
      message: () => `Expected ${locator} to have style ${JSON.stringify(style)}`,
      pass: computedStyle,
    };
  },

  async toContainElement(locator: Locator, selector: string) {
    const element = await locator.locator(selector).count();
    return {
      message: () => `Expected ${locator} to contain element ${selector}`,
      pass: element > 0,
    };
  },
}); 