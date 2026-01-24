import { GraphQLLoadError } from './GraphQLLoadError';

export class GraphQLLoadTypedefsMissingError extends GraphQLLoadError {
  public constructor() {
    super('TypedefsMissing');
  }
}
