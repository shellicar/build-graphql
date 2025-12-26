import type { ILogger } from '../types';
import { findGraphQLFiles } from './findGraphQLFiles';
import { generateTypedefsFile } from './generateTypedefsFile';
import type { TransformResult } from './types';

export const loadVirtualModule = async (options: { globPattern: string; globIgnore: string }, logger: ILogger): Promise<TransformResult> => {
  const files = await findGraphQLFiles(options);
  const code = generateTypedefsFile(files);
  logger.debug(`Typedefs: \`${code}\``);
  return { code, map: null };
};
