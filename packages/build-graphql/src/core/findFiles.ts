import { glob } from 'glob';
import type { FindOptions } from './types';

export const findFiles = async (options: FindOptions): Promise<string[]> => {
  const files = await glob(options.pattern, options.options);
  files.sort((a, b) => a.localeCompare(b));
  return files;
};
