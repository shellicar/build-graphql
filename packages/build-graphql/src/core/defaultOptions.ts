import { ErrorPolicy, Feature } from '../enums';
import type { Options } from '../types';

export const defaultOptions = {
  globPattern: '**/*.graphql',
  globIgnore: '**/node_modules/**',
  ignoreErrors: false,
  debug: false,
  globOptions: {},
  errorPolicy: ErrorPolicy.Abort,
  features: {
    [Feature.EsbuildWatch]: true,
    [Feature.ViteWatch]: true,
    [Feature.ViteHmr]: true,
  },
} as const satisfies Options;
