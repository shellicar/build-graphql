import type { UnpluginOptions } from 'unplugin';
import type { ILogger } from '../types';
import { findFiles } from './findFiles';
import { loadGraphqlModule } from './graphql/loadGraphqlModule';
import { loadVirtualModule } from './graphql/loadVirtualModule';
import { handleErrors } from './handleErrors';
import { virtualModuleId } from './module';
import { resolveVirtualId } from './resolveVirtualId';
import type { FindOptions, ResolvedOptions } from './types';

export const createPlugin = (esbuild: UnpluginOptions['esbuild'], vite: UnpluginOptions['vite'], options: ResolvedOptions, findOptions: FindOptions, logger: ILogger): UnpluginOptions => {
  let importedTypedefs = false;
  const graphqlImports: string[] = [];
  let graphqlMatched: string[] = [];

  return {
    name: 'unplugin-graphql',
    enforce: 'pre',

    esbuild: esbuild,
    vite,

    async buildStart() {
      importedTypedefs = false;
      graphqlImports.length = 0;
      graphqlMatched = await findFiles(findOptions);
      logger.debug('Matched GraphQL files:', graphqlMatched);
    },

    resolveId(id) {
      if (id === virtualModuleId || id.endsWith('.graphql')) {
        return resolveVirtualId(id);
      }
    },

    async load(id) {
      if (id === resolveVirtualId(virtualModuleId)) {
        importedTypedefs = true;

        if (options.features.VITE_WATCH) {
          const files = await findFiles(findOptions);
          for (const f of files) {
            this.addWatchFile(f);
          }
        }

        return await loadVirtualModule(findOptions, logger);
      }

      const result = await loadGraphqlModule(id, options);
      if (result !== undefined) {
        graphqlImports.push(id);
        return result;
      }
    },

    buildEnd() {
      logger.debug('Build end', {
        graphqlMatched,
        graphqlImports,
        importedTypedefs,
      });

      handleErrors(options.errorPolicy, logger, {
        graphqlMatched: graphqlMatched.length,
        graphqlImports: graphqlImports.length,
        importedTypedefs,
        globPattern: options.globPattern,
      });
    },
  } satisfies UnpluginOptions;
};
