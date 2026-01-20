---
title: "Giftflow's operating model"
date: 2026-01-20
excerpt: How campaigns, donors, and donations are managed in WordPress and how the donation experience works end-to-end.
---

## Overview

Giftflow is implemented as a WordPress-based system that manages fundraising activity and donation processing through:

- **WordPress Custom Post Types (CPTs)** for core domain objects (Campaigns, Donors, Donations)
- **Page-level options / settings** to configure payment, email, and other operational behavior
- **A donation form per campaign**, used by donors to submit donations
- **Email notifications** sent to both admins and donors after a successful donation

## Workflow diagram
```text
+-----------------------------------+
| Admin creates / updates Campaign  |
+-----------------------------------+
                |
                v
+-----------------------------------+
| Campaign page + Donate CTA        |
+-----------------------------------+
                |
                v
+-----------------------------------+
| Donor opens donation form         |
+-----------------------------------+
                |
                v
+-----------------------------------+
| Submit donor details + amount     |
+-----------------------------------+
                |
                v
+-----------------------------------+
| Create / update Donor record      |
+-----------------------------------+
                |
                v
+-----------------------------------+
| Create Donation record            |
+-----------------------------------+
                |
                v
        +---------------------+
        |   Payment result    |
        +---------------------+
             /           \
            /             \
           v               v
+-------------------+   +--------------------+
| Mark as PAID      |   | Mark as FAILED     |
+-------------------+   +--------------------+
           |                     |
           |                     |
           v                     v
+-------------------+   +--------------------+
| Send email        |   | Send email         |
| to Admin          |   | to Admin           |
+-------------------+   +--------------------+
           |
           v
+-------------------+
| Send email        |
| to Donor          |
+-------------------+
```

## Core entities (WordPress CPTs)

### Campaign

A **Campaign** represents a fundraising initiative. It is the primary object that donors interact with.

- **Owned by**: Admin / operators
- **Used by**: Donors (via the donation form)
- **Key responsibility**: Define the campaign content and connect to a corresponding donation form

### Donor

A **Donor** represents a person who makes a donation.

- **Created/updated when**: A donor submits a donation form
- **Purpose**: Provide a consistent identity for donations and donor communications
- **Typical data**: Name, email, phone, address (as required), consent flags (as applicable)

### Donation

A **Donation** represents a single donation transaction/attempt associated with a donor and campaign.

- **Created when**: Donor completes the donation form (and payment step if applicable)
- **Linked to**: One Campaign + one Donor
- **Typical data**: Amount, currency, payment method, status, timestamps, receipt/reference IDs

## Settings & configuration (Page options)

Operational behavior is configured through **page options** (settings screens / page-level configuration), including:

- **Payment method settings**
  - Payment provider selection (e.g., card/bank transfer/etc.)
  - Provider credentials (stored securely via WP configuration)
  - Supported currencies, minimum/maximum amounts (if needed)
- **Email settings**
  - Admin notification recipients (one or more email addresses)
  - Donor email sender details (from name/address)
  - Email templates (admin + donor)
- **Other settings**
  - Donation form fields (required/optional)
  - Thank-you page behavior
  - Compliance options (consent, terms, privacy links)

## Campaign → donation form mapping

Each campaign has a **corresponding donation form**. The mapping is one-to-one from the donor’s perspective:

- **Campaign page**: Presents campaign details + call-to-action to donate
- **Donation form**: Collects donor info and donation details for that campaign

Implementation detail (conceptual):

- The donation form must know the **Campaign ID** so every Donation is created with the correct association.

## Donation flow (end-to-end)

### 1) Donor starts a donation

- Donor visits a campaign and opens the **campaign donation form**.
- Donor enters:
  - Donor contact details
  - Donation amount and any options (e.g., message, anonymity, recurring if supported)
  - Payment details (if required by the chosen payment method)

### 2) System creates/updates records

When the donation form is submitted:

- **Donor CPT**: Created or updated (commonly matched by email)
- **Donation CPT**: Created and linked to the Campaign + Donor
- **Status**: Set based on the payment method outcome (e.g., pending/paid/failed)

### 3) Email notifications

After the donor completes the donation flow (and the system records the donation):

- **Admin email** is sent with donation details
  - Campaign name
  - Donor identity/contact (as permitted)
  - Amount, payment method, status, reference IDs
- **Donor email** is sent as confirmation/receipt (as configured)
  - Donation summary
  - Receipt/reference details
  - Any next steps (e.g., bank transfer instructions if applicable)

## Operational responsibilities

- **Admins/operators**
  - Create and manage Campaigns
  - Configure payment methods and email settings
  - Monitor Donations and handle exceptions (failed/pending)
- **System**
  - Maintain Donor + Donation records
  - Ensure each donation is associated with the correct Campaign
  - Send admin and donor emails after donation completion
