import type { GlobPattern } from '../types';
import { GraphQLLoadError } from './GraphQLLoadError';

export class GraphQLLoadNoFilesError extends GraphQLLoadError {
  public readonly pattern: GlobPattern;

  public constructor(pattern: GlobPattern) {
    super('NoFilesMatched');
    this.pattern = pattern;
  }
}
