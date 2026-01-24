import { glob } from 'glob';
import type { FindOptions } from './types';

export const findFiles = async (options: FindOptions): Promise<string[]> => {
  const files = await glob(options.globPattern, options.globOptions);
  files.sort(options.compareFn);
  return files;
};
