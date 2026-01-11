import { glob } from 'glob';
import type { FindOptions } from './types';

export const findFiles = async (options: FindOptions): Promise<string[]> => {
  return await glob(options.pattern, options.options);
};
