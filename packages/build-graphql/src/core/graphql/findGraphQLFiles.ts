import { glob } from 'glob';
import path from 'path';
import type { GraphqlFile } from './types';
import { GlobIgnore } from '../types';

export const findGraphQLFiles = async (options: { globPattern: string; globIgnore: GlobIgnore }): Promise<GraphqlFile[]> => {
  const files = await glob(options.globPattern, { ignore: options.globIgnore });
  return files.map((file, index) => ({
    path: path.join(process.cwd(), file).replace(/\\/g, '/'),
    name: `gql_${index}`,
  }));
};
