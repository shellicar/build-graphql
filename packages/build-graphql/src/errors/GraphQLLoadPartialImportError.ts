import { GraphQLLoadError } from './GraphQLLoadError';

export class GraphQLLoadPartialImportError extends GraphQLLoadError {
  public readonly imported: number;
  public readonly matched: number;

  public constructor(imported: number, matched: number) {
    super('PartialImport');
    this.imported = imported;
    this.matched = matched;
  }
}
