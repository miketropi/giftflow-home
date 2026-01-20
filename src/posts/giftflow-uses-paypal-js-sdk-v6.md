---
title: Giftflow uses PayPal JS SDK v6
date: 2026-01-21
excerpt: How Giftflow integrates PayPal’s JavaScript SDK v6 to offer a fast, trusted donation checkout while keeping sensitive payment logic on the server.
---

# Giftflow uses PayPal JS SDK v6

PayPal is one of the most recognized payment methods worldwide. In Giftflow, we use **PayPal JavaScript SDK v6** to provide a smooth donor checkout experience while keeping **order creation, capture, and verification** on the server side.

## Why PayPal (and why SDK v6)

- **Trust & conversion**: donors already have PayPal accounts and recognize the brand.
- **Fast checkout**: PayPal Buttons reduce friction vs. manual card entry.
- **Modern SDK model**: v6 emphasizes a safer initialization flow and more explicit component setup (instead of hardcoding everything in a script URL).

## What Giftflow does with PayPal

When PayPal is enabled for a campaign’s donation form, Giftflow:

- Loads PayPal’s SDK **only on pages that need it** (donation form pages)
- Creates an **Order** on the server with the final amount/currency
- Lets the donor approve the payment in the PayPal UI
- Captures the payment on the server and stores the result as a **Donation**
- Sends confirmation emails to **admin + donor** after a successful payment

## End-to-end workflow (high level)

```text
Donor opens Campaign donation form
  -> Choose PayPal
  -> PayPal SDK renders buttons
  -> Click "Donate"
  -> Server creates PayPal Order (amount + currency + metadata)
  -> Donor approves in PayPal popup/redirect
  -> Client calls server to capture PayPal Order
  -> Server verifies capture + records Donation
  -> Send emails (admin + donor)
```

## Integration outline

### 1) Settings (WordPress admin)

Giftflow’s settings include PayPal configuration such as:

- **Environment**: Sandbox vs Live
- **Client ID**: safe to use client-side (still treat as configuration)
- **Secret / credentials**: **server-side only** (never expose to the browser)
- **Currency defaults** (or per-campaign currency rules if enabled)

### 2) Load the SDK (v6 core)

In PayPal JS SDK **v6**, the SDK core is loaded from a versioned endpoint (rather than configuring everything in a `?client-id=...` query string).

- **Live**: `https://www.paypal.com/web-sdk/v6/core`
- **Sandbox**: `https://www.sandbox.paypal.com/web-sdk/v6/core`

Giftflow loads the SDK only when the donor selects PayPal (or when the PayPal payment option is visible), to keep other pages fast.

### 2) Render the PayPal UI in the donation form

The donation form renders a container for PayPal (e.g., “PayPal Buttons”), and the front-end initializes the SDK and mounts UI components in that container.

At this stage the client should *not* decide the “real” amount—Giftflow treats the browser as untrusted input and re-validates everything on the server.

### 3) Create the PayPal Order on the server

When the donor clicks PayPal’s button, Giftflow requests the server to create an order using the **validated** donation amount/currency and ties it back to the current campaign and donor session.

Conceptually:

- Input: campaign ID, amount, currency (validated)
- Output: PayPal `orderID`

### 4) Capture + verify server-side

After approval, the client asks the server to capture the order. The server:

- Captures the order with PayPal APIs
- Checks the capture status and money amounts match expectations
- Creates/updates the **Donor** record
- Creates the **Donation** record with a “paid” (or equivalent) status
- Triggers admin/donor email notifications

## Practical notes & pitfalls

- **Never trust the browser for amount/currency**: always verify in the capture step.
- **Load PayPal only where needed**: improves performance across the rest of the site.
- **Handle failure states**: cancellations, declined payments, and timeouts should map to clear Donation statuses (e.g., `failed`, `cancelled`, `pending`).
- **Webhooks (optional but recommended)**: add an extra safety net for asynchronous updates (refunds, chargebacks, delayed captures).
- **Sandbox testing**: validate with multiple test accounts and edge cases (zero/low amounts, unsupported currencies, network interruptions).

## References

- [PayPal JavaScript SDK v6 reference](https://docs.paypal.ai/reference/sdk/js/v6/reference)
- [PayPal JavaScript SDK v6 configuration](https://docs.paypal.ai/developer/how-to/sdk/js/v6/configuration)
