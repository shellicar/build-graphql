import type { UnpluginFactory, UnpluginOptions } from 'unplugin';
import { Feature } from '../enums';
import { InvalidFeatureCombinationError } from '../errors/InvalidFeatureCombinationError';
import type { Options } from '../types';
import { createLogger } from './createLogger';
import { createPlugin } from './createPlugin';
import { createEsbuild } from './esbuild/createEsbuild';
import { resolveOptions } from './resolveOptions';
import type { FindOptions } from './types';
import { createVite } from './vite/createVite';

export const graphqlPluginFactory: UnpluginFactory<Options> = (inputOptions): UnpluginOptions => {
  const options = resolveOptions(inputOptions);

  if (options.features[Feature.ViteHmr] && !options.features[Feature.ViteWatch]) {
    throw new InvalidFeatureCombinationError(Feature.ViteHmr, Feature.ViteWatch);
  }

  const logger = createLogger(options);

  const findOptions = {
    globPattern: options.globPattern,
    globOptions: options.globOptions,
    compareFn: options.compareFn,
  } satisfies FindOptions;

  logger.debug({ options });

  const esbuild = createEsbuild(options.features.ESBUILD_WATCH, findOptions, logger);
  const vite = createVite(options.features.VITE_HMR);
  return createPlugin(esbuild, vite, options, findOptions, logger);
};
