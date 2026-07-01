# Billing Widget QA Assignment

**Submitted by:** Guy Adler

------------------------------------------------------------------------

# A. UI Review -- Problems Found

## Security

1.  The payment form appears to collect raw credit card information
    directly in the application, which is a major PCI-DSS compliance
    risk.
2.  A CVV (Card Verification Value) field is missing.
3.  There is no visible indication that the page is secured using
    HTTPS/SSL.
4.  No indication of support for 3D Secure (3DS/SCA), which is required
    in many regions.
5.  Sensitive payment information could potentially be logged if proper
    controls are not implemented.

## Usability

1.  The payment amount is displayed as **30.00** without specifying the
    currency.
2.  There is no **Country** field, making the form unsuitable for
    international users.
3.  **State or Province** is mandatory although many countries do not
    use this field.
4.  The instruction **'Postal Code (no dashes)'** is US-centric and may
    reject valid international postal codes.
5.  The **MI** (Middle Initial) field is unclear for many users.
6.  No inline validation messages are visible.
7.  The behavior of the **Cancel** button is not defined.

## Functional

1.  Credit card numbers should be validated for digits only, correct
    length, and the Luhn checksum.
2.  Expired cards should not be accepted.
3.  Multiple clicks on **Continue** could result in duplicate payments.
4.  The UI does not demonstrate handling of payment failures, declined
    cards, or network errors.
5.  Billing address fields do not fully support international address
    formats.

## Performance & Reliability

1.  No loading indicator is shown while the payment is being processed.
2.  No retry mechanism is visible for temporary network failures.
3.  No indication of an idempotency mechanism to prevent duplicate
    charges.

------------------------------------------------------------------------

# B. Sample Test Cases

## TC-01 -- Required Fields Validation

**Steps** 1. Open the billing page. 2. Leave all required fields empty.
3. Click **Continue**.

**Expected Result** - Submission is blocked. - Required fields are
highlighted. - Clear validation messages are displayed.

## TC-02 -- Invalid Credit Card

**Steps** 1. Enter an invalid credit card number. 2. Fill all other
required fields. 3. Click **Continue**.

**Expected Result** - The payment is rejected. - An 'Invalid Card
Number' message is displayed.

## TC-03 -- Successful Payment

**Steps** 1. Enter valid payment information. 2. Enter a valid billing
address. 3. Click **Continue**.

**Expected Result** - The Continue button displays a loading state. -
Duplicate submissions are prevented. - A payment confirmation page is
displayed. - Only one payment transaction is created.

------------------------------------------------------------------------

# C. Product Solution for the Most Severe Issue

The most critical issue is that the application appears to collect raw
credit card information directly.

A better solution is to use PCI-compliant hosted payment fields such as
Stripe Elements, Adyen Components, or Braintree Hosted Fields. The
browser sends the card details directly to the payment provider, while
the application receives only a secure payment token.

Additional recommendations: - Enforce HTTPS. - Add a CVV field. -
Support 3D Secure (SCA). - Use idempotency keys to prevent duplicate
charges. - Mask card information. - Prevent sensitive data from being
logged. - Display clear validation and error messages.
