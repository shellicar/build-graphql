import { glob } from 'glob';
import path from 'path';
import type { FindOptions } from '../types';
import type { GraphqlFile } from './types';

export const findGraphQLFiles = async (options: FindOptions): Promise<GraphqlFile[]> => {
  const files = await glob(options.globPattern, { ignore: options.globIgnore });
  return files.map((file, index) => ({
    path: path.join(process.cwd(), file).replace(/\\/g, '/'),
    name: `gql_${index}`,
  }));
};
