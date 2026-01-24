import type { GlobOptionsWithFileTypesUnset } from 'glob';
import type { Feature } from '../enums';
import type { GlobPattern, Options } from '../types';

type FullFeatures = Record<Feature, boolean>;

type RequiredOptions = 'globPattern' | 'globIgnore' | 'globOptions' | 'errorPolicy' | 'debug' | 'features';

type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type ResolvedOptions = MakeRequired<Options, RequiredOptions> & {
  features: FullFeatures;
};

export type FindOptions = {
  pattern: GlobPattern;
  options: GlobOptionsWithFileTypesUnset;
};
