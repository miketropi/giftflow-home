---
title: How to configure PayPal payment gateway (Sandbox)
date: 2026-01-23
excerpt: Step-by-step setup for PayPal Sandbox in Giftflow, create a sandbox app, copy client credentials, configure Giftflow, and (optionally) enable webhooks for capture success, failure, and refunds.
---

# How to configure PayPal payment gateway (Sandbox)

![Giftflow PayPal Settings Example](https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/paypal-config.jpg)

This guide shows how to configure **PayPal Sandbox** for Giftflow so you can test donations safely before going live.

## Prerequisites

- Admin access to your WordPress site running Giftflow
- A PayPal/Developer account

## Step 1: Go to the PayPal Developer Dashboard

1. Open `https://developer.paypal.com/`
2. Sign in.

## Step 2: Create a Sandbox app and get credentials

1. In the dashboard, go to **Apps & Credentials**.
2. Switch to the **Sandbox** tab (not Live).
3. Click **Create App**.
4. Name the app (example: “Giftflow Sandbox”).
5. After the app is created, copy:
   - **Client ID** (Sandbox)
   - **Client Secret** (Sandbox)

## Step 3: Configure PayPal in Giftflow

In your WordPress Admin:

1. Open **Giftflow → Settings → Payments → PayPal** (or the PayPal settings screen in your Giftflow plugin).
2. Set **Environment** to **Sandbox**.
3. Paste:
   - **PayPal Client ID (Sandbox)**
   - **PayPal Client Secret (Sandbox)**
4. Save changes.

## Step 4 (Recommended): Create Sandbox test accounts

To simulate real donations, PayPal provides sandbox “buyer” accounts.

1. In the PayPal Developer Dashboard, go to **Testing Tools → Sandbox Accounts**.
2. Create (or use) a **Personal** account as the donor/buyer.
3. Save the email/password so you can log in during checkout.

## Step 5 (Optional but recommended): Enable PayPal webhooks

Webhooks help Giftflow stay in sync with PayPal payment results (especially if a donor closes the tab during checkout).

1. In the PayPal Developer Dashboard, open your **Sandbox app**.
2. Find **Webhooks** and click **Add Webhook**.
3. For the webhook URL, paste the webhook endpoint shown in Giftflow’s PayPal settings (if your plugin provides one).
4. Subscribe to these events:
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`
   - `PAYMENT.CAPTURE.REFUNDED`
5. Save the webhook.

> Note: PayPal event names are case-sensitive. The correct prefix is `PAYMENT` (singular), not `PAYMENTS`.

## Step 6: Test a sandbox donation

1. Open a campaign donation form on your site.
2. Select **PayPal** as the payment method.
3. Complete checkout using a **sandbox personal (buyer) account**.
4. Confirm Giftflow records the Donation and sends the expected emails (admin + donor).

## Troubleshooting

- **PayPal button doesn’t load**: confirm the environment is Sandbox and the Client ID is from the Sandbox app.
- **Checkout works but status doesn’t update**: enable webhooks and ensure the webhook URL is publicly reachable.
- **Wrong account during testing**: make sure you’re using the sandbox login from **Sandbox Accounts**, not a real PayPal account.
