# Next + Sanity Starter ✨

A starting point for building content-driven websites with Next.js, TypeScript and Sanity CMS.

The public website lives at the repository root, with an independently installable Sanity Content Studio in [`studio/`](./studio). Both applications share a Sanity project and dataset while remaining separately deployable. 🚀

## What's in the box 📦

- **Next.js App Router** handles the site shell, metadata routes and draft-mode endpoints.
- **Sanity Studio** provides a structured editing experience for site settings, home-page content, navigation, calls to action and hero sections.
- **Sanity Presentation** provides an embedded frontend preview with draft mode and Visual Editing.
- **Sanity Vision** provides a development tool for testing GROQ queries directly in Studio.
- **`next-sanity`** provides typed GROQ queries, live content updates, Visual Editing metadata, draft mode and Sanity image URLs.
- **Sanity TypeGen** generates TypeScript types from the content schemas and GROQ queries.
- **Tailwind CSS v4** provides a token-based styling system.
- **Radix UI**, Storybook, Vitest, Playwright and Biome support accessible component development, testing and code quality.

## Project structure 🗂️

The Next.js application and Sanity Studio have separate `package.json` files and lockfiles. This allows them to be developed together while remaining independently deployable.

| Area | Location | Responsibility |
| --- | --- | --- |
| Public site | `app/`, `components/`, `ui/` | Rendering, layout and frontend components |
| Sanity integration | `lib/sanity/` | Client configuration, GROQ queries, live content, image URLs and generated types |
| Content Studio | `studio/` | Content schemas, Studio configuration, editing experience and schema extraction |

## Getting started 🧭

### 1. Prerequisites

Before getting started, make sure you have:

- **Node.js 22**
- **Bun**
- A [Sanity account](https://www.sanity.io/)

### Why Bun?

This starter uses [Bun](https://bun.com) for package management and running development scripts.

Bun was chosen for its fast dependency installation, straightforward CLI and support for modern JavaScript and TypeScript workflows.

The project uses Node.js as its target application runtime, with Bun providing a consistent package management and development experience across the Next.js application and Sanity Studio.

Both applications maintain separate dependencies and lockfiles, allowing them to be developed and deployed independently.

#### Node version policy

This starter intentionally targets Node.js 22 to maintain a consistent runtime across local development and deployment.

The supported version should be reviewed when Node 22 approaches end of life or when project dependencies require a newer version.

### 2. Create a Sanity project

1. Visit [Sanity Manage](https://www.sanity.io/manage).
2. Create a new project and give it a name.
3. Create a dataset named `production`.
4. Copy the **Project ID** from your project's settings.

The project ID and dataset name are used to connect the Next.js application and Sanity Studio to the same content source.

**What is a dataset?**

A dataset is a collection of content documents within a Sanity project.

For a simple website, a single `production` dataset is sufficient. Additional datasets can be introduced later for development, testing or staging.

### 3. Install dependencies

Clone the repository or create a new repository from this template.

Install dependencies for both applications from the repository root:

```bash
bun install
bun --cwd studio install
```

The Studio has its own dependencies and must be installed separately.

### 4. Configure environment variables

Create local environment files for the Next.js application and Sanity Studio:

```bash
cp .env.example .env.local
cp studio/.env.example studio/.env
```

#### Next.js environment

Update `.env.local` at the repository root:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-10-21
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333

SANITY_API_READ_TOKEN=your-read-token
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL of the frontend application |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Identifies your Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset used by the application |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Pins the Sanity API behaviour to a specific version |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | URL used to connect Visual Editing to the Studio |
| `SANITY_API_READ_TOKEN` | Server-side token used for authenticated content access and draft previews |

**API versioning:** Sanity uses date-based API versions. The version does not need to match the date your project was created. Keep the version provided by the starter unless you intentionally update and test against a newer API version.

#### Sanity Studio environment

Update `studio/.env`:

```dotenv
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
```

The Studio preview URL points to the frontend application so editors can preview content changes.

### 5. Create a Sanity API read token 🔐

The starter uses authenticated content access for draft previews and related editing features.

To create a token:

1. Open your project in [Sanity Manage](https://www.sanity.io/manage).
2. Navigate to **API → Tokens**.
3. Select **Add new token**.
4. Give the token a descriptive name, such as `Next.js Read Token`.
5. Select the **Viewer** role for read-only access.
6. Copy the generated token into `SANITY_API_READ_TOKEN` in your root `.env.local`.

**Security considerations:**

- Never prefix the token with `NEXT_PUBLIC_`.
- Never commit tokens or other secrets to version control.
- Keep authenticated requests on the server.
- Use the minimum permissions required.

Public datasets can normally serve published content without authentication, but draft previews require appropriate read access.

For more information, see [Sanity's authentication documentation](https://www.sanity.io/docs/content-lake/http-auth).

### 6. Configure CORS origins

Sanity Live and Visual Editing require the frontend's origin to be authorised in your Sanity project.

1. Open your project in [Sanity Manage](https://www.sanity.io/manage).
2. Navigate to **API → CORS Origins**.
3. Add `http://localhost:3000`.
4. Enable **Allow credentials** if your frontend uses authenticated browser requests or Visual Editing features that require credentials.
5. Save your changes.

When deploying, add your production frontend URL as an additional allowed origin.

If you see an error such as:

`Sanity Live is unable to connect to the Sanity API as the current origin is not in the list of allowed CORS origins`

Check that the exact frontend origin, including its protocol and port, is listed in your project's CORS settings.

### 7. Configure the Sanity CLI

Open [`studio/sanity.cli.ts`](./studio/sanity.cli.ts).

Update the `projectId` and `dataset` values to match the Sanity project you created.

This configuration is used by the Sanity CLI for operations such as schema extraction, type generation and Studio deployment.

### 8. Generate Sanity types 

Before starting development, generate the schema and TypeScript definitions:

```bash
bun --cwd studio run typegen
```

This runs two commands:

**Schema extraction**

```bash
sanity schemas extract --force --enforce-required-fields
```

Extracts the Studio's schema definitions into `studio/schema.json`.

**Type generation**

```bash
sanity typegen generate
```

Uses the extracted schema and the GROQ queries in `lib/sanity/` to generate:

`lib/sanity/sanity.types.ts`

This helps keep the frontend's TypeScript definitions aligned with the content model.

Run the TypeGen script again whenever you change Sanity schemas or GROQ queries.

### 9. Start the development servers

Start the Next.js application from the repository root:

```bash
bun run dev
```

The frontend will be available at:

http://localhost:3000

In a second terminal, start Sanity Studio:

```bash
bun --cwd studio run dev
```

The Studio will normally be available at:

http://localhost:3333

Sign in to Sanity Studio and create the initial content documents:

- **Site settings** — site-wide configuration and navigation.
- **Home page** — content for the homepage and its sections.

Publish the documents to make their content available to the public website.

Sanity's live-content integration allows published changes to appear without requiring a frontend redeployment.

## Previewing content 👀

The starter includes Sanity's **Presentation tool**, allowing editors to preview the Next.js website directly inside Sanity Studio.

Presentation integrates with Next.js draft mode and Visual Editing to provide a live preview of unpublished content.

### Presentation tool

The Presentation tool is configured in `studio/sanity.config.ts` using `presentationTool` from `sanity/presentation`.

It uses `SANITY_STUDIO_PREVIEW_URL` to determine which frontend to display, defaulting to `http://localhost:3000` during local development.

The tool is configured with two Next.js draft-mode endpoints:

- `/api/draft-mode/enable` — enables draft mode for previewing unpublished content.
- `/api/draft-mode/disable` — disables draft mode and returns to published content.

These endpoints are configured through Presentation's `previewMode` option.

### Visual Editing

The Next.js root layout renders `SanityLive` to support live content updates.

When draft mode is enabled, it also renders `VisualEditing` from `next-sanity/visual-editing`, enabling editing interactions between the frontend and Sanity Studio.

Visual Editing is only rendered when draft mode is active.

### Exiting preview mode

The starter includes a custom `SanityPreviewExit` component for leaving draft mode when previewing the website outside Sanity Studio.

The component:

- Displays a preview notification and exit link.
- Preserves the current pathname and query parameters when exiting.
- Uses `/api/draft-mode/disable` to disable preview mode. The route accepts only same-site paths for its `redirect` parameter and falls back to `/` for any other value.

When the frontend is embedded inside Presentation, the custom exit control is hidden because Presentation provides its own preview controls. It uses `useIsPresentationTool` from `next-sanity/hooks` to identify the Presentation context, rather than assuming every iframe request is a Presentation preview.

The root layout always mounts the component while draft mode is enabled; the component handles whether it should render.

### Deployment

When deploying, update the local site and Studio URLs to their public equivalents, and add your production frontend URL to the allowed CORS origins in your Sanity project.

Ensure the deployed Studio can access the frontend preview URL and that the draft-mode endpoints work in the deployed environment.

The starter includes support for draft previews and Visual Editing.

Sanity Studio uses the configured preview URL to display the frontend, while the Next.js application provides the following draft-mode endpoints:

- `/api/draft-mode/enable`
- `/api/draft-mode/disable`

The enable endpoint uses the server-side Sanity read token to support authenticated preview functionality.

`NEXT_PUBLIC_SANITY_STUDIO_URL` connects the frontend's Visual Editing metadata to the Studio.

When deploying, update the local site and Studio URLs to their public equivalents, and add your production frontend URL to the allowed CORS origins in your Sanity project.

## Studio tools 🛠️

Sanity Studio includes three tools configured in `studio/sanity.config.ts`:

| Tool | Purpose |
| --- | --- |
| **Structure** | Provides the content editing interface and custom document organisation |
| **Presentation** | Embeds the frontend for live previews and Visual Editing |
| **Vision** | Provides an interface for testing GROQ queries against the configured dataset |

### Structure

The Structure tool uses the custom configuration in `studio/structure.ts` to organise documents and provide a more focused editing experience.

### Presentation

The Presentation tool connects Sanity Studio to the Next.js frontend using the configured preview URL and draft-mode endpoints.

### Vision

The Vision tool, provided by `@sanity/vision`, allows developers to write and test GROQ queries directly inside Sanity Studio.

It's particularly useful when developing content schemas, exploring document relationships and debugging queries before adding them to the frontend.

## Content modelling 🧱

Content schemas are defined in `studio/schemaTypes/` and assembled through `studio/sanity.config.ts`.

The frontend accesses content through GROQ queries and the integration layer in `lib/sanity/`.

The generated types in `lib/sanity/sanity.types.ts` help maintain type safety between the CMS and the application.

After changing a schema or query, regenerate the types:

```bash
bun --cwd studio run typegen
```

Avoid manually editing generated TypeScript definitions.

## Handy commands ✨

| Command | What it does |
| --- | --- |
| `bun run dev` | Starts the Next.js development server |
| `bun --cwd studio run dev` | Starts Sanity Studio |
| `bun --cwd studio run typegen` | Extracts the schema and generates Sanity types |
| `bun --cwd studio run build` | Builds Sanity Studio |
| `bun --cwd studio run deploy` | Deploys Sanity Studio |
| `bun run sb:dev` | Starts Storybook on port 6006 |
| `bun run test` | Runs Vitest tests |
| `bun run test:e2e` | Runs Playwright tests |
| `bun run lint` | Runs Biome linting |
| `bun run typecheck` | Type-checks the Next.js application |
| `bun run verify:app` | Builds the Next.js application |
| `bun run verify:storybook` | Builds Storybook |
| `bun run verify:all` | Builds the frontend, Storybook and Studio |

## Component workflow 🧩

Reusable components live in `ui/`, alongside their stories and tests where appropriate.

1. Build or update a component.
2. Add or update its colocated `*.stories.tsx` file to document visual states.
3. Add a `*.test.tsx` file when behaviour, accessibility or regressions need testing.
4. Run the relevant tests and Storybook build before committing changes.

The starter includes stories for the Button, Accordion, Sheet, layout primitives, Hero, Site Header and Site Footer.

Stories use shared preview configuration so global styles and fonts remain consistent.

## Styling system 🎨

Project-wide colours, spacing and layout variables live in `app/styles/globals.css`.

Tailwind's theme tokens help maintain consistency across components.

Start by adjusting the shared tokens before introducing component-specific overrides.

The `Container` component handles site width and horizontal gutters, while `Section` provides responsive vertical spacing and optional scroll anchors.

Header and footer navigation are managed through Sanity's `siteSettings` document and queried in `lib/sanity/queries.ts`.

## Before committing 🛟

For changes spanning the frontend and Studio, run:

```bash
bun run test
bun run typecheck
bun run verify:app
bun run verify:storybook
bun --cwd studio run build
```

Alternatively, run the combined build verification:

```bash
bun run verify:all
```

This builds the Next.js application, Storybook and Sanity Studio.

Happy building! ✨
