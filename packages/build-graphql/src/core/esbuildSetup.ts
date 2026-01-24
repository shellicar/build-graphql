import fs from 'node:fs/promises';
import type { PluginBuild } from 'esbuild';
import type { ILogger } from '../types';
import { findFiles } from './findFiles';
import type { FindOptions } from './internal/types';
import { virtualModuleId } from './module';

export const esbuildSetup = (build: PluginBuild, findOptions: FindOptions, logger: ILogger) => {
  build.onLoad({ filter: /\.[cm]?ts?$/, namespace: 'file' }, async (args) => {
    const contents = await fs.readFile(args.path, 'utf8');

    // TODO: Is there a better way to detect which file imports this?
    if (!contents.includes(virtualModuleId)) {
      return;
    }

    const graphqlFiles = await findFiles(findOptions);

    logger.debug('[esbuild] typedefs importer watch', {
      importer: args.path,
      graphqlCount: graphqlFiles.length,
    });

    return {
      watchFiles: graphqlFiles,
    };
  });
};
