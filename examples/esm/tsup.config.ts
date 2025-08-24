import graphqlPlugin from '@shellicar/build-graphql/esbuild';
import type { Options } from '@shellicar/build-graphql/types';
import { defineConfig } from 'tsup';

const options: Options = {
  globPattern: '../**/*.graphql',
  debug: true,
};

export default defineConfig((config) => ({
  entry: ['src/main.ts'],
  splitting: true,
  sourcemap: false,
  treeshake: true,
  dts: false,
  clean: false,
  minify: false,
  keepNames: true,
  bundle: true,
  tsconfig: 'tsconfig.json',
  target: 'node22',
  format: ['esm'],
  outDir: 'dist',
  esbuildPlugins: [graphqlPlugin(options)],
}));
