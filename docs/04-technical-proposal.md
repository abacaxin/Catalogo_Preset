# Technical Proposal

## Status

**Approved for implementation.** This proposal does not alter the approved product scope. Production deployment, domain purchase and creation of external resources still require separate authorization.

## Recommendation

Build the template as a full-stack Next.js application with TypeScript and Tailwind CSS, using Supabase for PostgreSQL, authentication and private image storage. Publish each restaurant as an independent deployment on Vercel with its own domain.

| Concern | Proposed choice | Why it fits the approved product |
| --- | --- | --- |
| Application | Next.js + TypeScript | Supports the public catalog and authenticated panel in one maintainable application. |
| Styling | Tailwind CSS | Provides reusable responsive UI patterns while allowing colors to vary by restaurant. |
| Database | Supabase PostgreSQL | Persists catalog, schedules, shop settings and timestamp-only intent history. |
| Authentication | Supabase Auth | Supports a single owner account without public registration. |
| Images | Supabase Storage | Stores product and logo files separately from public app code. |
| Authorization | Row Level Security (RLS) | Ensures the owner account may access only data owned by its instance. |
| Hosting | Vercel | Publishes each independent instance and connects its dedicated domain. |
| WhatsApp | Generated `wa.me` link | Meets the approved handoff behavior without API credentials or paid automation. |

## Proposed architecture

```text
Browser
├── Public catalog
│   ├── Reads public shop/catalog data
│   ├── Keeps cart locally during the visit
│   └── Requests creation of timestamp-only send intent before opening wa.me
└── Owner panel
    ├── Authenticated session
    ├── Manages shop, categories, products, options and schedules
    └── Reads timestamp-only send-intent history

Next.js application
├── Server-side authorization for administrative actions
├── Public catalog presentation
├── Server-side validation for writes and intent registration
└── Supabase client integration

Supabase project per restaurant instance
├── PostgreSQL data
├── Owner account
├── Storage for logo and product images
└── RLS policies
```

## Data and access model

- Each deployment serves one restaurant only, aligning with the approved non-multi-tenant MVP.
- The single owner account owns and manages the configuration, categories, products, options, schedules and intent history of its own instance.
- Public visitors can read only the catalog data needed for display; they cannot write shop or catalog records.
- The intent endpoint stores only the server-generated timestamp. It must not receive or store cart contents, price, notes, phone number or visitor data.
- Supabase tables exposed through the Data API must have RLS enabled and policies limited to the actual access model.
- Supabase service-role credentials must never be available in browser code or public environment variables.

## Logical entities

| Entity | Core fields |
| --- | --- |
| Shop settings | Name, logo, theme colors, WhatsApp, phone, address/location, Instagram and delivery information. |
| Opening hours | Day of week and one or more start/end ranges. |
| Category | Name and display order if ordering is needed by UX. |
| Product | Category, name, description, image, price and availability state. |
| Variation | Product, name, price delta and required status. |
| Add-on | Product, name and price delta. |
| Send intent | Timestamp only. |

Exact schema, constraints, ordering strategy, migration history and indexes must be finalized during technical planning before database creation.

## Security baseline

- No public administrator registration.
- All administrative routes require an authenticated owner session.
- All writes validate inputs on the server before persistence.
- Secrets remain in environment variables and are never committed.
- RLS protects every exposed Supabase table and storage bucket policy protects product/logo uploads.
- Permanent deletion requires an explicit UI confirmation and a protected server-side action.
- Intent history minimizes data: date/time only.

## Dependencies and operational requirements

- A Supabase project and access for the DMG team.
- A Vercel account/project and access for the DMG team.
- A domain per restaurant instance when ready for delivery.
- Real logo, colors, WhatsApp number, hours, product data and images for each client delivery.
- Environment variables for the app-to-Supabase connection, configured in the deployment platform.

## Validation plan

- Run the framework build, linting, type checking and relevant automated tests.
- Validate RLS and storage access with owner and anonymous/public contexts.
- Verify a public visitor cannot reach administrative pages or mutate data.
- Verify intent history only contains timestamp data.
- Exercise product search/filter, options, total calculation, closed-store blocking and WhatsApp message generation.
- Verify mobile and desktop flows, focus behavior, labels and contrast using a customized palette.

## Alternatives considered

| Alternative | Reason not recommended for this MVP |
| --- | --- |
| Static site with data in code | Does not meet the approved owner panel, login, image upload and routine content management requirements. |
| Local browser storage for administration | Does not safely persist shared business data or support real owner access. |
| WhatsApp Business API | Explicitly outside the approved scope and adds operational cost/complexity. |
| Shared multi-tenant system | Explicitly outside the approved scope; each client requires an independent instance. |

## Approval request

Approval of this proposal authorizes creation of the local Next.js project, installation of its dependencies and implementation of the application against Supabase-compatible configuration. It does not authorize production deployment, domain purchase, database creation in a DMG account or use of paid services without a separate explicit instruction.
