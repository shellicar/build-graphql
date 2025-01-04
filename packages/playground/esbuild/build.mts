import graphqlPlugin from '@shellicar/build-graphql/esbuild';
import type { Options } from '@shellicar/build-graphql/types';
import { build } from 'esbuild';

const options: Options = {
  globPattern: '../**/*.graphql',
  debug: true,
};

build({
  entryPoints: ['src/main.ts'],
  outdir: 'dist',
  bundle: true,
  platform: 'node',
  target: 'node20',
  tsconfig: 'tsconfig.json',
  plugins: [graphqlPlugin(options)],
});
