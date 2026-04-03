import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  tsconfig: 'tsconfig.build.json',
  format: ['cjs', 'esm'],
  dts: true,
  minify: false,
  external: ['nestjs-pino'],
})
