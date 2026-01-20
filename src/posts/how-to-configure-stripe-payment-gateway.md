---
title: How to configure Stripe payment gateway (Sandbox / Test Mode)
date: 2026-01-22
excerpt: Step-by-step setup for Stripe Test Mode in Giftflow get API keys, configure Giftflow, and enable webhooks for payment success, failure, and refunds.
---

# How to configure Stripe payment gateway (Sandbox / Test Mode)

![Giftflow PayPal Settings Example](https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/GiftFlow-Stripe-Settings.jpg)

This guide walks you through configuring **Stripe Test Mode** (sandbox) for Giftflow: creating test API keys, connecting them to Giftflow, and enabling the required webhook events:

- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

## Prerequisites

- A Stripe account
- Admin access to your WordPress site running Giftflow
- The **Stripe webhook URL** from Giftflow (usually shown in Giftflow’s Stripe settings screen)

## Step 1: Create a Stripe account and switch to Test Mode

1. Go to the Stripe Dashboard: `https://dashboard.stripe.com/`
2. Sign in (or create an account).
3. Turn on **Test mode** (Stripe shows a toggle like “Test mode / Live mode”).

## Step 2: Create API keys (Test Mode)

1. In Stripe Dashboard, go to **Developers → API keys**.
2. Make sure you are still in **Test mode**.
3. Copy these values:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

### Add the keys to Giftflow

In your WordPress Admin:

1. Open **Giftflow → Settings → Payments → Stripe** (or the Stripe settings screen in your Giftflow plugin).
2. Set **Environment** to **Sandbox / Test**.
3. Paste:
   - **Stripe Publishable Key** = `pk_test_...`
   - **Stripe Secret Key** = `sk_test_...`
4. Save changes.

## Step 3: Create a Stripe webhook endpoint

Giftflow relies on Stripe webhooks so the system can update donation statuses even if the donor closes the browser.

1. In Stripe Dashboard, go to **Developers → Webhooks**.
2. Make sure you’re still in **Test mode**.
3. Click **Add endpoint**.
4. For **Endpoint URL**, paste the webhook URL shown in Giftflow’s Stripe settings (example format: `https://your-domain.com/...`).
5. Under **Select events**, enable:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
6. Click **Add endpoint**.

## Step 4: Test the sandbox flow

### 1) Make a test donation

1. Open a campaign donation form on your site.
2. Choose **Stripe** and complete a donation using a Stripe test card.

### 2) Confirm Stripe events were delivered

1. In Stripe Dashboard, go to **Developers → Webhooks**.
2. Click your endpoint.
3. Open **Event deliveries** and confirm you see:
   - `payment_intent.succeeded` for a successful donation
   - `payment_intent.payment_failed` for a failed donation attempt (optional test)

### 3) Test refund handling (optional)

1. In Stripe Dashboard, find the test payment.
2. Create a refund.
3. Confirm your webhook endpoint receives `charge.refunded`.

## What each webhook event does in Giftflow (expected behavior)

- **`payment_intent.succeeded`**: mark the Donation as **Paid** (and trigger confirmation emails if configured).
- **`payment_intent.payment_failed`**: mark the Donation as **Failed** (and optionally notify admin).
- **`charge.refunded`**: mark the Donation as **Refunded** (or update status/metadata to reflect the refund).

## Common issues

- **No webhook deliveries**: double-check the endpoint URL, and ensure you created the webhook in **Test mode** (not Live).
- **Signature verification failed**: confirm the `whsec_...` secret matches the endpoint you created.
- **Donation marked paid in Stripe but not in Giftflow**: verify the webhook is enabled and that Giftflow’s endpoint is reachable from the public internet.
