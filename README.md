# Pulse Kit

Click-through design system for Plexus Pulse: tokens, MUI primitives, product patterns, and page captures.

```bash
npm install
npm run dev
```

The dev server listens on port 8080. `npm run build` regenerates the catalog when capture folders are present, and otherwise keeps the committed catalog.

## Theme export

`src/theme/theme.ts` is the file a developer imports. It is the MUI theme: typed `createTheme`, CSS variables, and component state overrides. JSON cannot express module augmentation or those overrides, so it is not the source of truth.

Copy theme writes `theme.json` from `src/theme/tokens.ts` — palette, type scale, layout, and interaction states — for design tools and non-TypeScript consumers. The `theme.ts` button downloads the MUI module.

## Navigation

Side nav groups expand to category pages: `/tokens/colors`, `/primitives/actions`, `/components/chrome`, and the same pattern for features, patterns, and pages.
