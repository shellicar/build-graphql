import { GraphQLLoadError } from './GraphQLLoadError';

export class GraphQLLoadTypedefsMissingError extends GraphQLLoadError {
  constructor() {
    super('TypedefsMissing');
  }
}
