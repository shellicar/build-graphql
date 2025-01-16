import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  clean: true,
  bundle: true,
  format: ['cjs', 'esm'],
  tsconfig: 'tsconfig',
  dts: true,
  cjsInterop: true,
  treeshake: true,
  outDir: 'dist',
  minify: 'terser',
  removeNodeProtocol: false,
  sourcemap: true,
  keepNames: true,
  splitting: true,
});
