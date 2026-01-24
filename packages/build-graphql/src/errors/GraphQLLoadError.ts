export class GraphQLLoadError extends Error {
  kind: string;

  constructor(kind: string) {
    super();
    this.kind = kind;
  }
}
