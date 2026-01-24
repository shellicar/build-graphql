import path from 'path';
import { findFiles } from '../findFiles';
import type { FindOptions } from '../internal/types';
import type { GraphqlFile } from './types';

export const findGraphQLFiles = async (options: FindOptions): Promise<GraphqlFile[]> => {
  const files = await findFiles(options);

  return files.map((file, index) => ({
    path: path.join(process.cwd(), file).replace(/\\/g, '/'),
    name: `gql_${index}`,
  }));
};
