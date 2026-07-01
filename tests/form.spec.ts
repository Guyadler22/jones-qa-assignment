import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/FormPage';

const TEST_DATA = {
  name: 'Guy Adler',
  email: 'guy@example.com',
  phone: '050-1234567',
  company: 'Acme Corp',
  website: 'https://www.acmecorp.com',
  numberOfEmployees: '51-500',
};

test.describe('Request a Call Back Form', () => {
  let formPage: FormPage;

  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    await formPage.navigate();
  });

  test('should successfully submit the contact form and reach the thank-you page', async ({ page }) => {
    await test.step('Fill all form fields', async () => {
      await formPage.fillForm(TEST_DATA);
    });

    await test.step('Bonus: verify Number of Employees changed to 51-500', async () => {
      await expect(formPage.numberOfEmployeesSelect).toHaveValue('51-500');
    });

    await test.step('Take a screenshot before submitting', async () => {
      await formPage.takeScreenshot('before-submit');
      console.log('Screenshot saved to: screenshots/before-submit.png');
    });

    await test.step('Submit the form', async () => {
      await formPage.submit();
    });

    await test.step('Assert thank-you page is reached', async () => {
      await page.waitForURL(/thank/i, { timeout: 10_000 });

      const thankYouHeading = await formPage.getThankYouHeading();
      await expect(thankYouHeading).toBeVisible();

      console.log('SUCCESS: Reached the thank-you page. URL:', page.url());
    });
  });

  test('should show native validation errors when submitting an empty form', async ({ page }) => {
    await formPage.submit();
    await expect(page.locator('input:invalid')).toHaveCount(3);

    // Page must not have navigated away
    await expect(page).toHaveURL('/');
  });
});
