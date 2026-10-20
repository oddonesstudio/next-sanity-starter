# Next Starter ✨

A friendly, production-minded foundation for building the next good thing. It pairs Next.js, React, Tailwind CSS, accessible Radix primitives, and a small reusable page system — without making the project feel like a spaceship cockpit. 🚀

## What’s in the box 📦

- **Next.js App Router** for the site shell, metadata routes, and modern React.
- **Tailwind CSS v4** with design tokens and fluid spacing in `app/styles/globals.css`.
- **Reusable UI** organised by purpose: `ui/primitives`, `ui/layout`, `ui/navigation`, and `ui/sections`.
- **Storybook** for building and reviewing components in isolation. Stories live alongside the component they document.
- **Vitest + Testing Library** for quick behavioural tests of reusable UI.
- **Playwright** is installed and configured for when the first user journeys are ready; there are deliberately no e2e specs yet. 🎭
- **Biome** for code quality checks.

## Start here 🧭

Use Node.js 22 and Bun.

### Node version policy 🟢

This starter intentionally pins its supported engine to **Node.js 22**. It is a stable, widely supported baseline for the current toolchain, keeps local development and deployment aligned, and avoids upgrading runtime versions merely because a newer release exists.

Reconsider the engine version when Node 22 approaches end of life, the hosting platform changes its supported runtimes, or a dependency has a well-understood need for a newer Node release. Treat that as a small planned upgrade: update `package.json`, `.nvmrc`, and `.node-version` together, refresh dependencies, then run the full verification suite before adopting it for new projects. 🔄

```sh
bun install
cp .env.example .env.local
bun run dev
```

Then open [http://localhost:3000](http://localhost:3000). Add any project-specific public environment values to `.env.local`; secrets belong on the server and should never be prefixed with `NEXT_PUBLIC_`. 🔐

## Handy commands ✨

| Command | What it does |
| --- | --- |
| `bun run dev` | Starts the site locally. |
| `bun run sb:dev` | Opens Storybook at port 6006. |
| `bun run test` | Runs the fast unit-test suite. |
| `bun run test:e2e` | Runs Playwright when e2e specs have been added. |
| `bun run lint` | Runs Biome against the app, UI, Sanity, and scripts folders. |
| `bun run typecheck` | Checks TypeScript without emitting files. |
| `bun run verify:app` | Produces a production Next.js build. |
| `bun run verify:storybook` | Builds Storybook as a static preview. |

## Component workflow 🧩

Keep each reusable component close to its documentation and tests:

1. Build or adjust the component in `ui/`.
2. Add or update its colocated `*.stories.tsx` file to make visual states easy to review.
3. Add a `*.test.tsx` when behaviour, accessibility, or a regression is worth protecting.
4. Run `bun run test` and `bun run sb:build` before calling it done. ✅

The current stories cover the Button, Accordion, Sheet, layout primitives, Hero, Site Header, and Site Footer. They use the shared preview configuration, so global styles and fonts travel with them.

## Styling system 🎨

Project-wide colours, spacing, and layout variables live in `app/styles/globals.css`. Tailwind’s theme tokens keep utility classes consistent, while `app/styles/typography.css` provides expressive typography utilities. Start your visual changes there before scattering one-off values through components — future-you will be grateful. 💌

`Container` handles the site width and horizontal gutter; `Section` provides responsive vertical rhythm and optional scroll anchors. Navigation data is centralised in `app/config/navigation.ts`, which feeds both header and footer.

## CMS, when you need it 🗃️

This starter is happy without a CMS. If a project needs editorial content, pull the companion `sanity-starter` into the repository for the Studio layer, then connect its content queries and environment variables here. The existing `verify:studio` and `verify:all` scripts assume a `studio/` directory once that layer has joined the party. 🪩

## Before a commit 🛟

Run the checks that match what changed:

```sh
bun run test
bun run typecheck
bun run verify:app
bun run verify:storybook
```

When the Sanity Studio is present, `bun run verify:all` checks the site, Storybook, and Studio together. Happy building! ✨
