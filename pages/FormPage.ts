import { type Page, type Locator } from '@playwright/test';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  numberOfEmployees?: string;
}

export class FormPage {
  readonly page: Page;

  // Form field locators
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly companyInput: Locator;
  readonly websiteInput: Locator;
  readonly numberOfEmployeesSelect: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.getByLabel('Name');
    this.emailInput = page.getByLabel('Email');
    this.phoneInput = page.getByLabel('Phone');
    this.companyInput = page.getByLabel('Company');
    this.websiteInput = page.getByLabel('Website');
    this.numberOfEmployeesSelect = page.getByLabel('Number of Employees');
    this.submitButton = page.getByRole('button', { name: 'Request a call back' });
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async fillForm(data: FormData): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.companyInput.fill(data.company);
    await this.websiteInput.fill(data.website);

    if (data.numberOfEmployees) {
      await this.numberOfEmployeesSelect.selectOption(data.numberOfEmployees);
    }
  }

  async takeScreenshot(filename: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${filename}.png`, fullPage: true });
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async getThankYouHeading(): Promise<Locator> {
    return this.page.getByRole('heading', { name: /thank you/i });
  }
}
