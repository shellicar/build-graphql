import type { Options } from './types';

export const defaults = {
  globPattern: '**/*.graphql',
  globIgnore: '**/node_modules/**',
  ignoreErrors: false,
  debug: false,
  typedefsPath: '@shellicar/build-graphql/dist/core/typedefs\\.c?js$',
} as const satisfies Options;
