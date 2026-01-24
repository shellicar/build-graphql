import type { GlobOptionsWithFileTypesUnset } from 'glob';
import { plugin } from './core';
import { ErrorPolicy, Feature } from './enums';
import type { Features, GlobIgnore, GlobPattern, ILogger, LogLevel, Options } from './types';

export type { Features, ILogger, LogLevel, GlobIgnore, GlobPattern, GlobOptionsWithFileTypesUnset, Options };
export { Feature, ErrorPolicy };
export { plugin as default };
