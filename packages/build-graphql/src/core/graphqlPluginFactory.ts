import type { PluginBuild } from 'esbuild';
import type { UnpluginFactory } from 'unplugin';
import { Feature } from '../enums';
import type { Options } from '../types';
import { createLogger } from './createLogger';
import { defaultOptions } from './defaultOptions';
import { esbuildSetup } from './esbuildSetup';
import { findFiles } from './findFiles';
import { loadGraphqlModule } from './graphql/loadGraphqlModule';
import { loadVirtualModule } from './graphql/loadVirtualModule';
import { InvalidFeatureCombinationError } from './InvalidFeatureCombinationError';
import type { FindOptions, ResolvedOptions } from './internal/types';
import { virtualModuleId } from './module';
import { resolveVirtualId } from './resolveVirtualId';
import { handleHotUpdate } from './viteHotUpdate';

export const graphqlPluginFactory: UnpluginFactory<Options> = (inputOptions) => {
  const options = {
    ...defaultOptions,
    ...inputOptions,
    globOptions: {
      ...defaultOptions.globOptions,
      ...inputOptions.globOptions,
    },
    features: {
      ...defaultOptions.features,
      ...inputOptions.features,
    },
  } satisfies ResolvedOptions;

  if (options.features.VITE_HMR && !options.features.VITE_WATCH) {
    throw new InvalidFeatureCombinationError(Feature.ViteHmr, Feature.ViteWatch);
  }

  const logger = createLogger(options);

  const findOptions = {
    pattern: options.globPattern,
    options: {
      ignore: options.globIgnore,
      ...options.globOptions,
    },
  } satisfies FindOptions;

  let graphqlMatched: string[] = [];
  const graphqlImports: string[] = [];
  let importedTypedefs = false;

  logger.debug({ options });

  const esbuild = options.features.ESBUILD_WATCH
    ? {
        setup: (build: PluginBuild) => esbuildSetup(build, findOptions, logger),
      }
    : undefined;
  const vite = options.features.VITE_HMR
    ? {
        handleHotUpdate,
      }
    : undefined;

  return {
    name: 'unplugin-graphql',
    enforce: 'pre',

    esbuild,
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
