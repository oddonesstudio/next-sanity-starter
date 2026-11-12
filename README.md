# Next + Sanity Starter ✨

My starting point for a content-driven Next.js site. The public site lives at the repository root; its Sanity Content Studio is an embedded, independently installable package in [`studio/`](./studio). They share a Sanity project and dataset while remaining separately deployable.

## What’s in the box 📦

- **Next.js App Router** handles the site shell, metadata routes, and draft-mode endpoints.
- **Sanity Studio** manages site settings, home-page content, navigation, calls to action, and hero sections.
- **`next-sanity`** provides typed GROQ queries, live content updates, Visual Editing metadata, draft mode, and Sanity image URLs.
- **Generated types** in `lib/sanity/sanity.types.ts` keep Sanity schemas and application queries aligned.
- **Tailwind CSS v4**, accessible Radix-based UI primitives, Storybook, Vitest, Playwright, and Biome support the frontend workflow.

## How it is arranged 🗂️

The root app and embedded Studio deliberately retain separate `package.json` files and lockfiles. This keeps the two pieces together in one repository while allowing them to be built and hosted independently.

| Area | Location | Responsibility |
| --- | --- | --- |
| Public site | `app/`, `components/`, `ui/` | Rendering, layout, and frontend components |
| Sanity integration | `lib/sanity/` | Client setup, queries, live content, image URLs, and generated types |
| Content Studio | `studio/` | Schemas, desk structure, content editing, and schema type generation |

## Start here 🧭

Use Node.js 22 and Bun.

### Node version policy 🟢

This starter intentionally pins its supported engine to **Node.js 22**. It is a stable, widely supported baseline for the current toolchain, keeps local development and deployment aligned, and avoids upgrading runtime versions merely because a newer release exists.

Reconsider the engine version when Node 22 approaches end of life, the hosting platform changes its supported runtimes, or a dependency has a well-understood need for a newer Node release. Treat that as a small planned upgrade: update `package.json` and `.nvmrc`, refresh dependencies, then run the full verification suite before adopting it for new projects. 🔄

```sh
bun install
bun --cwd studio install
cp .env.example .env.local
cp studio/.env.example studio/.env
```

Set up the root `.env.local` for the Next.js site:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-10-21
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
SANITY_API_READ_TOKEN=your-viewer-token
```

Set up `studio/.env` for the embedded Studio:

```dotenv
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
```

Keep `SANITY_API_READ_TOKEN` server-only: it must not have a `NEXT_PUBLIC_` prefix. It needs read access to the dataset, including drafts for previewing. Local environment files are intentionally excluded from version control. 🔐

Before using Studio CLI commands, update the `projectId` and `dataset` in [`studio/sanity.cli.ts`](./studio/sanity.cli.ts) to match the new Sanity project. This file is used for schema type generation and Studio deployment.

Run the site from the repository root:

```sh
bun run dev
```

The site is available at [http://localhost:3000](http://localhost:3000). Run the embedded Studio in a second terminal:

```sh
bun --cwd studio run dev
```

The Studio is available at [http://localhost:3333](http://localhost:3333). Create and publish `Site settings` and `Home page` documents to populate the site. Sanity’s live-content integration reflects published changes without a frontend redeploy.

## Previewing content 👀

The Studio previews the local site at `http://localhost:3000`. Draft mode is enabled through `/api/draft-mode/enable` and disabled through `/api/draft-mode/disable`; the enable route uses the server-side token from `.env.local`. `NEXT_PUBLIC_SANITY_STUDIO_URL` connects the frontend’s Visual Editing metadata to the Studio.

For deployment, replace the local URLs with the public site and Studio URLs, then add the site origin to the Sanity project’s CORS settings.

## Content modelling 🧱

Schemas are defined in `studio/schemaTypes/` and assembled by `studio/sanity.config.ts`. The site’s GROQ queries and content access layer are in `lib/sanity/`. After changing a schema or query, regenerate types from the Studio package:

```sh
bun --cwd studio run typegen
```

This writes `lib/sanity/sanity.types.ts`, which is generated code.

## Handy commands ✨

| Command | What it does |
| --- | --- |
| `bun run dev` | Starts the Next.js site at port 3000. |
| `bun --cwd studio run dev` | Starts the embedded Sanity Studio, normally at port 3333. |
| `bun --cwd studio run typegen` | Extracts the Studio schema and regenerates the site’s Sanity types. |
| `bun --cwd studio run build` | Builds the Studio for deployment. |
| `bun --cwd studio run deploy` | Deploys the Studio through the Sanity CLI. |
| `bun run sb:dev` | Starts Storybook at port 6006. |
| `bun run test` | Runs the Vitest unit suite. |
| `bun run test:e2e` | Runs Playwright when end-to-end specs have been added. |
| `bun run lint` | Runs Biome linting across the repository. |
| `bun run typecheck` | Type-checks the Next.js application. |
| `bun run verify:app` | Produces a production Next.js build. |
| `bun run verify:storybook` | Builds Storybook as a static preview. |
| `bun run verify:all` | Builds the site, Storybook, and embedded Studio. |

## Component workflow 🧩

Keep each reusable component close to its documentation and tests:

1. Build or adjust the component in `ui/`.
2. Add or update its colocated `*.stories.tsx` file to make visual states easy to review.
3. Add a `*.test.tsx` when behaviour, accessibility, or a regression is worth protecting.
4. Run `bun run test` and `bun run sb:build` before calling it done. ✅

The current stories cover the Button, Accordion, Sheet, layout primitives, Hero, Site Header, and Site Footer. They use the shared preview configuration, so global styles and fonts travel with them.

## Styling system 🎨

Project-wide colours, spacing, and layout variables live in `app/styles/globals.css`. Tailwind’s theme tokens keep utility classes consistent, so start visual changes there before scattering one-off values through components — future-you will be grateful. 💌

`Container` handles the site width and horizontal gutter; `Section` provides responsive vertical rhythm and optional scroll anchors. Header and footer navigation are managed in the Sanity `siteSettings` document and queried in `lib/sanity/queries.ts`.

## Before a commit 🛟

For changes spanning both packages, run:

```sh
bun run test
bun run typecheck
bun run verify:app
bun run verify:storybook
bun --cwd studio run build
```

`bun run verify:all` checks the site, Storybook, and embedded Studio. Happy building! ✨
