import { test, expect, type Page } from "@playwright/test";

const validUrl = "https://example.com/very/long/url/that/needs/shortening";
const invalidUrl = "not-a-url";

async function createShortUrl(page: Page, url: string) {
  await page.goto("/");
  await page.fill('input[placeholder*="Paste your long URL"]', url);
  await page.click('button:has-text("Shorten URL")');
}

test.describe("ShortLink URL Shortener - Home page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("should show empty state initially", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Recent Short Links")).not.toBeVisible();
  });

  test("should show error for invalid URL", async ({ page }) => {
    await createShortUrl(page, invalidUrl);

    await expect(page.getByText("Invalid URL")).toBeVisible();
  });

  test("should show maximum of 5 recent links", async ({ page }) => {
    // Create 6 short URLs
    for (let i = 1; i <= 6; i++) {
      await createShortUrl(page, `https://example${i}.com`);
    }

    // Verify only 5 links are visible
    const linkElements = await page.locator(".list-group-item").all();
    expect(linkElements.length).toBe(5);
  });

  test.describe("valid urls", () => {
    test.beforeEach(async ({ page }) => {
      await createShortUrl(page, validUrl);
    });

    test("should create short URL with valid input", async ({ page }) => {
      const shortUrlElement = await page.getByText("shrtl.nk/");
      await expect(shortUrlElement).toBeVisible();

      await expect(page.getByText("Recent Short Links")).toBeVisible();
    });

    test("should clear input after successful URL creation", async ({
      page,
    }) => {
      const input = await page.locator(
        'input[placeholder*="Paste your long URL"]'
      );
      await expect(input).toHaveValue("");
    });

    test("should copy URL to clipboard when copy button clicked", async ({
      page,
    }) => {
      await page.click('button:has-text("Copy")');

      await expect(page.getByText("URL copied to clipboard")).toBeVisible();
    });
  });
});
