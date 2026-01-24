import { GraphQLLoadError } from './GraphQLLoadError';

export class GraphQLLoadPartialImportError extends GraphQLLoadError {
  imported: number;
  matched: number;

  constructor(imported: number, matched: number) {
    super('PartialImport');
    this.imported = imported;
    this.matched = matched;
  }
}
