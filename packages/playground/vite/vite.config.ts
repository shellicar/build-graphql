import type { Options } from '@shellicar/build-graphql/types';
import GraphQLPlugin from '@shellicar/build-graphql/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

const options: Options = {
  globPattern: '../**/*.graphql',
  debug: true,
  typedefsPath: 'build-graphql/dist/core/typedefs.js',
};

export default defineConfig({
  clearScreen: false,
  plugins: [Inspect(), GraphQLPlugin(options)],
});
