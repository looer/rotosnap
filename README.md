# RotoSnap

The all-in-one solution for creating and embedding 360 degrees product views.

## Features 

- Upload your pictures and embed a 360 view of your product 
- Made using React, Tailwind and Next.js
- Secure user management and authentication with [Supabase](https://supabase.io/docs/guides/auth) and with Google OAuth Provider
- Data access & management on top of PostgreSQL with [Supabase](https://supabase.io/docs/guides/database)
- Data storage using Supabase Storage, on top of AWS S3
- Integration with [Stripe Checkout](https://stripe.com/docs/payments/checkout) and the [Stripe customer portal](https://stripe.com/docs/billing/subscriptions/customer-portal)
- Automatic syncing of pricing plans and subscription statuses via [Stripe webhooks](https://stripe.com/docs/webhooks)

## Demo

- https://rotosnap.com/

[![Screenshot of demo](./public/home.png)](https://rotosnap.com/)
[![Screenshot of demo](./public/projects.png)](https://rotosnap.com/)
[![Screenshot of demo](./public/product.png)](https://rotosnap.com/)

## Architecture

![Architecture diagram](./public/architecture_diagram.svg)

## Deploy with Vercel

The Vercel deployment will guide you through creating a Supabase account and project. After installing the Supabase integration, you'll need to configure Stripe with a few simple steps.


To get started, click the "Deploy with Vercel" button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-subscription-payments&project-name=nextjs-subscription-payments&repo-name=nextjs-subscription-payments&demo-title=Next.js%20Subscription%20Payments%20Starter&demo-description=Demo%20project%20on%20Vercel&demo-url=https%3A%2F%2Fsubscription-payments.vercel.app&demo-image=https%3A%2F%2Fsubscription-payments.vercel.app%2Fdemo.png&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv&external-id=nextjs-subscription-payments)

[![Screenshot of Vercel deployment](./public/vercel-deploy.png)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-subscription-payments&project-name=nextjs-subscription-payments&repo-name=nextjs-subscription-payments&demo-title=Next.js%20Subscription%20Payments%20Starter&demo-description=Demo%20project%20on%20Vercel&demo-url=https%3A%2F%2Fsubscription-payments.vercel.app&demo-image=https%3A%2F%2Fsubscription-payments.vercel.app%2Fdemo.png&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv&external-id=nextjs-subscription-payments)

Once the project has deployed, continue with the configuration steps below.

The initial build will fail due to missing Stripe environment variables. After configuring Stripe, redeploy the application.

## Configure Supabase Auth

#### [Optional] - Set up OAuth providers

You can use third-party login providers like GitHub or Google. Refer to the [docs](https://supabase.io/docs/guides/auth#third-party-logins) to learn how to configure these.

## Configure Stripe

To start developing your SaaS application, we'll need to configure Stripe to handle test payments. For the following steps, make sure you have the "viewing test data" toggle switched to "on."

### Configure webhook

We need to configure the webhook pictured in the architecture diagram above. This webhook is the piece that connects Stripe to your Vercel serverless functions.

First, click the "Add endpoint" button on the [test Endpoints page](https://dashboard.stripe.com/test/webhooks).

Then, set the endpoint URL to `https://your-deployment-url.vercel.app/api/webhooks`.

Next, click the `receive all events` link in the `Events to send` section.

Finally, copy the `Signing secret` as we'll need that in the next step.

### Set environment variables

To securely interact with Stripe, we need to add a few environment variables in the Vercel dashboard.

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET_LIVE`

You can find the first two keys on the [API keys tab](https://dashboard.stripe.com/test/apikeys) in Stripe. The `STRIPE_WEBHOOK_SECRET_LIVE` is the `Signing secret` copied in the previous webhook configuration step.

### Redeploy and Test

We need to redeploy the application so that the latest environment variables are present.

Redeploy your application by going to the deployments tab, finding your deployment, and clicking "redeploy."

Finally, click the `Send test webhook` button and send a `product.created` event. If everything works, you should see a test product in your Supabase database.

After verifying that the configuration is working, delete the test products created via the webhook in Supabase.

### Create product and pricing information

For Stripe to automatically bill your users for recurring payments, you need to create your product and pricing information in the [Stripe Dashboard](https://dashboard.stripe.com/test/products). When you create or update your product and price information, the changes automatically sync with your Supabase database.

Stripe Checkout currently supports pricing that bills a predefined amount at a specific interval. More complex plans (e.g., different pricing tiers or seats) are not yet supported.

For example, you can create business models with different pricing tiers, e.g.:

- Product 1: Hobby
  - Price 1: 10 USD per month
  - Price 2: 100 USD per year
- Product 2: Freelancer
  - Price 1: 20 USD per month
  - Price 2: 200 USD per year

### Configure the Stripe customer portal

1. Set your custom branding in the [settings](https://dashboard.stripe.com/settings/branding)
1. Configure the Customer Portal [settings](https://dashboard.stripe.com/test/settings/billing/portal)
1. Toggle on "Allow customers to update their payment methods"
1. Toggle on "Allow customers to update subscriptions"
1. Toggle on "Allow customers to cancel subscriptions"
1. Add the products and prices that you want
1. Set up the required business information and links

### That's it

That's it. Now you're ready to earn recurring revenue from your customers 🥳

## Going live

### Archive testing products

Archive all test mode Stripe products before going live. Before creating your live mode products, make sure to follow the steps below to set up your live mode env vars and webhooks.

### Configure production environment variables

To run the project in live mode and process payments with Stripe, modify the environment variables from Stripe "test mode" to "production mode." After switching the variables, be sure to redeploy the application.

To verify you are running in production mode, test checking out with the [Stripe test card](https://stripe.com/docs/testing). The test card should not work.

### Redeploy

Afterward, you will need to rebuild your production deployment for the changes to take effect. Within your project Dashboard, navigate to the "Deployments" tab, select the most recent deployment, click the overflow menu button (next to the "Visit" button) and select "Redeploy."

## Develop locally

Deploying with Vercel will create a repository for you, which you can clone to your local machine.

Next, use the [Vercel CLI](https://vercel.com/download) to link your project:

```bash
vercel login
vercel link
```

### Setting up the env vars locally

Use the Vercel CLI to download the development env vars:

```bash
vercel env pull .env.local
```

Running this command will create a new `.env.local` file in your project folder. For security purposes, you will need to set the `SUPABASE_SERVICE_ROLE_KEY` manually from your [Supabase dashboard](https://app.supabase.io/) (Settings > API). Lastly, the webhook secret differs for local testing vs. when deployed to Vercel. Follow the instructions below to get the corresponding webhook secret.

