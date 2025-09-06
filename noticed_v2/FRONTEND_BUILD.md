# noticed_v2 Admin Frontend Build

This Rails application includes a small React frontend under `src/` for the
administration interface. The frontend is built independently from the main
application.

## Build

From the repository root run:

```bash
npm run build:noticed
```

This executes `noticed_v2/build_frontend.sh`, compiling the TypeScript sources in
`noticed_v2/src` into JavaScript in `noticed_v2/dist`.

## Watching for Changes

For iterative development you can run TypeScript in watch mode:

```bash
npx tsc -p noticed_v2/tsconfig.json -w
```

The generated files can then be served by the Rails application.
