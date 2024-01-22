import { buildSync } from "esbuild"

buildSync({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/uploader.js'
})