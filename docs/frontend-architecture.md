# Frontend Architecture Evaluation

The repository contains two independent front-end codebases:

- `src/` – the main public-facing application built with Vite and React.
- `noticed_v2/src/` – an admin interface embedded inside the Rails project.

Moving the admin frontend into `src/` would couple its build pipeline with the
main site and mix domain concerns. Keeping them separate preserves the Rails
application's ability to deploy the admin interface on a different schedule and
limits dependencies between teams.

Given these trade-offs, the admin frontend remains in `noticed_v2/src/` with its
own build script (`npm run build:noticed`). Shared UI elements can be extracted
into a workspace package located at `packages/ui` so both applications consume
common components without duplicating code.
