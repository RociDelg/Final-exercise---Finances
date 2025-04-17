import { Locator } from '@playwright/test';

declare module '@playwright/test' {
  interface Matchers<R> {
    toHaveStyle(style: Record<string, string>): Promise<R>;
    toContainElement(selector: string): Promise<R>;
  }
} 