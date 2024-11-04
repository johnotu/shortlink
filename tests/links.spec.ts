import { test, expect, type Page } from "@playwright/test";

const searchTerm = "example.com";
const shortSearchTerm = "ex";

async function createShortUrl(page: Page, url: string) {
  await page.goto("/");
  await page.fill('input[placeholder*="Paste your long URL"]', url);
  await page.click('button:has-text("Shorten URL")');
}

test.describe("ShortLink URL Shortener - Links page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("should show empty state when no links exist", async ({ page }) => {
    await page.goto("/links");

    await expect(page.getByText("You do not have any links yet")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Create short link" })
    ).toBeVisible();
  });

  test.describe("Links Page", () => {
    test.beforeEach(async ({ page }) => {
      await createShortUrl(page, "https://example1.com");
      await createShortUrl(page, "https://example2.com");
      await page.goto("/links");
    });

    test("should list all created links", async ({ page }) => {
      const linkElements = await page.locator(".card").all();
      expect(linkElements.length).toBe(2);
    });

    test("should not filter with search term less than 3 characters", async ({
      page,
    }) => {
      await page.fill('input[placeholder*="Search"]', shortSearchTerm);

      await expect(
        page.getByText("Please enter at least 3 characters")
      ).toBeVisible();

      const linkElements = await page.locator(".card").all();
      expect(linkElements.length).toBe(2);
    });

    test("should filter links with search term of 3 or more characters", async ({
      page,
    }) => {
      await page.fill('input[placeholder*="Search"]', searchTerm);

      const linkElements = await page.locator(".card").all();
      expect(linkElements.length).toBe(1);
      await expect(page.getByText("example.com")).toBeVisible();
    });

    test("should show no results message for non-matching search", async ({
      page,
    }) => {
      await page.fill('input[placeholder*="Search"]', "nonexistent");

      await expect(page.getByText("No links found matching")).toBeVisible();
    });
  });
});
