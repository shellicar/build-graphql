import type { GlobPattern } from '../types';
import { GraphQLLoadError } from './GraphQLLoadError';

export class GraphQLLoadNoFilesError extends GraphQLLoadError {
  pattern: GlobPattern;

  constructor(pattern: GlobPattern) {
    super('NoFilesMatched');
    this.pattern = pattern;
  }
}
