import { glob } from 'glob';
import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import { createLogger } from './createLogger';
import { defaults } from './defaults';
import { loadGraphqlModule, loadVirtualModule } from './graphql';
import { virtualModuleId } from './module';
import type { Options } from './types';

const resolveVirtualId = (id: string) => `\0${id}`;

const graphqlPluginFactory: UnpluginFactory<Options> = (inputOptions) => {
  const options = { ...defaults, ...inputOptions };
  const logger = createLogger(options);

  let graphqlMatched: string[] = [];
  const graphqlImports: string[] = [];
  let importedTypedefs = false;

  logger.debug({ options });

  return {
    name: 'unplugin-graphql',
    enforce: 'pre',

    async buildStart() {
      graphqlMatched = await glob(options.globPattern, { ignore: options.globIgnore });
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
        return await loadVirtualModule(options, logger);
      }

      const result = await loadGraphqlModule(id, options, logger);
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

      if (!options.ignoreErrors) {
        if (graphqlMatched.length === 0) {
          throw new Error(`No GraphQL files found for the pattern: ${options.globPattern}`);
        }
        if (graphqlImports.length !== graphqlMatched.length) {
          throw new Error('Some GraphQL files were not imported');
        }
        if (!importedTypedefs) {
          throw new Error('Typedefs not imported. Make sure to import from @shellicar/build-graphql/typedefs');
        }
      }
    },
  };
};

export const plugin = createUnplugin(graphqlPluginFactory);
