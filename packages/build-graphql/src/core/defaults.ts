import type { Options } from './types';

export const defaults = {
  globPattern: '**/*.graphql',
  globIgnore: '**/node_modules/**',
  ignoreErrors: false,
  debug: false,
} as const satisfies Options;
