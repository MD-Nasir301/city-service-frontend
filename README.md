# City Complaint & Service Platform

![City Service Platform — city skyline](./public/hero-section.jpg)

**A single place to report civic issues, follow service requests, and coordinate the teams responsible for resolving them.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

The City Complaint & Service Platform is a role-based frontend for connecting citizens, service staff, and administrators. Citizens can submit and track requests, staff can manage assigned work, and administrators can oversee service operations and platform users.

## Key Features

### Citizen

- Register, verify an account, sign in, and optionally use Google sign-in.
- Submit civic service requests, including category, location, priority, and supporting images.
- Review submitted requests, filter and track their status, and manage profile details.
- View payment and request-tracking information.

### Staff

- Review assigned requests and update work status.
- See a dashboard summary of assigned, in-progress, resolved, cancelled, and rejected work.
- Review completed/paid tasks and an earnings summary.
- Manage profile details.

### Admin

- View platform-wide request, user, and category statistics with charts.
- Browse and manage service requests, including creating requests and assigning available staff.
- Manage users, roles, and account status.
- Manage service categories, payments, and audit logs.

### Shared experience

- Public marketing pages for services, public requests, about, and contact.
- Role-aware dashboards and route guards.
- Loading skeletons, a global error screen, a not-found page, and toast notifications.
- Backend-powered authentication and data fetching, with cookie credentials and an attempted refresh-token flow for expired sessions.

## Tech Stack

| Area | Technologies |
| --- | --- |
| Application framework | Next.js 16 App Router, React 19 |
| Language | TypeScript 5, strict type checking |
| Styling | Tailwind CSS 4, CSS variables |
| UI | Shadcn UI configuration (Base Nova), Base UI, Radix UI, Lucide icons |
| Server state and API requests | TanStack Query 5, ofetch |
| Forms and validation | TanStack Form, Zod 4 |
| Charts and notifications | Recharts, Sonner |
| Authentication integration | Cookie-based API session and Google OAuth (`@react-oauth/google`) |

## Architecture and Folder Structure

The project keeps application code under `src/`. Next.js route groups such as `(public)` and `(dashboard)` organize layouts without adding those group names to the URL.

```text
.
├── public/                         # Static assets (including the landing-page images)
├── src/
│   ├── api/                        # Backend API functions grouped by domain
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── admin-dashboard/    # Admin pages: users, staff, categories, requests, etc.
│   │   │   ├── citizen-dashboard/  # Citizen requests, payments, profile, tracking
│   │   │   └── staff-dashboard/    # Assigned requests, earnings, profile
│   │   ├── (public)/
│   │   │   ├── (authentication)/   # Login, registration, account verification
│   │   │   └── (marketing)/        # Home, services, public requests, about, contact
│   │   ├── payments/               # Payment success and cancellation pages
│   │   ├── error.tsx               # Global application error UI
│   │   ├── loading.tsx             # App Router loading UI
│   │   ├── not-found.tsx            # Not-found UI
│   │   ├── layout.tsx               # Root layout, metadata, providers, toaster
│   │   └── globals.css              # Global styles and Tailwind entry point
│   ├── components/
│   │   ├── auth/                   # Authentication and role guards
│   │   ├── dashboard/               # Dashboard shell, navigation, overview UI
│   │   ├── form/                    # Authentication, profile, and request forms
│   │   ├── layout/public/           # Public header and footer
│   │   ├── modules/                 # Feature-specific page components and tables
│   │   ├── shared/                  # Reusable request pages and filters
│   │   └── ui/                      # Shared UI primitives
│   ├── hooks/                       # TanStack Query hooks by domain
│   ├── lib/                         # API client and shared utilities
│   ├── providers/                   # Query and Google authentication providers
│   ├── routes/                      # Role-specific dashboard navigation definitions
│   ├── types/                       # Domain and API TypeScript types
│   └── validation/                  # Zod schemas and inferred form types
├── components.json                  # Shadcn UI generator configuration
├── next.config.ts                   # Next.js configuration (static export)
├── package.json                     # Scripts and dependencies
├── postcss.config.mjs               # Tailwind CSS PostCSS plugin
└── tsconfig.json                    # TypeScript settings and @/* path alias
```

### Data and rendering flow

Feature hooks in `src/hooks/` call the corresponding domain functions in `src/api/`. Those functions use the shared `src/lib/apiClient.ts` client, which reads `NEXT_PUBLIC_API_BASE_URL` and sends requests with `credentials: "include"`. TanStack Query is initialized by the root providers and supplies query caching and mutations to interactive pages. Form payloads are validated with Zod schemas in `src/validation/`.

The Next.js configuration sets `output: "export"`. Production builds generate static pages and assets in `out/`; interactive dashboards and API-backed data are handled in the browser. This is a static export deployment, not a request-time SSR deployment. The backend remains a separate service.

## Getting Started

### Prerequisites

- Node.js **20.9 or later** and npm. The project also declares Bun 1.4.2 as its package manager and includes a `bun.lock`.
- Access to a compatible backend API.
- A Google OAuth client ID if Google sign-in is to be enabled.

### Clone the repository

```bash
git clone https://github.com/MD-Nasir301/city-service-frontend.git
cd city-service-frontend
```

If you do not have access to the repository, use the clone URL provided by the project owner.

### Configure environment variables

Create a `.env.local` file in the repository root:

```dotenv
# Base URL of the backend API, including any required API prefix.
NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com

# Google OAuth Web client ID (only required for Google sign-in).
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

Both variables are read by browser-side code because they use the `NEXT_PUBLIC_` prefix. Do not put private keys, client secrets, or other server-only credentials in these variables. The real local environment file is git-ignored; use your own development values and do not commit it.

## Installation and Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available project scripts:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Build the application and generate the static export in `out/`. |
| `npm run start` | Runs the Next.js start script; the configured static-export deployment should instead serve the generated `out/` directory. |

For production, run `npm run build` and deploy the generated `out/` directory to a static host. Configure the host to serve the exported routes correctly. The API must be reachable from the deployed site, and the backend must permit the frontend origin and credentialed requests (including cookies) through CORS.

## Demo Credentials and Live URLs

No public deployment URL or demo credentials are configured in this repository. Request current access details from the project owner before sharing a demonstration.

| Role | Demo email | Demo password |
| --- | --- | --- |
| Admin | Not provided — request from the project owner | Not provided — request from the project owner |
| Citizen | Not provided — request from the project owner | Not provided — request from the project owner |
| Staff | Not provided — request from the project owner | Not provided — request from the project owner |

| Environment | URL |
| --- | --- |
| Live application | Not provided |
| Backend API | Configure `NEXT_PUBLIC_API_BASE_URL` with the value supplied for your environment |

## API Integration and Testing

This repository contains the frontend API integration, not the backend service. API functions are organized by domain in `src/api/` and cover:

- **Authentication and accounts:** registration, email verification, login/logout, current-user lookup, Google sign-in.
- **Service requests:** list and filter requests, create/update/delete, status changes, current-user requests, and staff-assigned requests.
- **Administration and staffing:** dashboard statistics, user and role management, available staff, and staff assignment.
- **Categories and payments:** category lookup, checkout-session creation, payment lookup, and current-user payment history.

Requests use the configured API base URL and include credentials. For local or deployed use, ensure the backend is running, the URL is correct, and its cookie/CORS policy allows the frontend origin. The refresh-token request is handled by the shared API client when an eligible request returns `401`.

There is no Postman collection or automated test script in the current repository. Available verification commands are:

```bash
npm run lint
npm run build
```

Use the backend team's API documentation or collection for request/response schemas, authentication requirements, and test data; the frontend's `src/api/` functions show the endpoints currently consumed by this application.

## Notes

- Route guards and dashboard navigation are implemented on the frontend; authorization must also be enforced by the backend.
- Never commit `.env.local` or place secret credentials in `NEXT_PUBLIC_` variables.
- The production build is a static export. Features requiring a Next.js runtime server are not available unless the deployment architecture is changed.
