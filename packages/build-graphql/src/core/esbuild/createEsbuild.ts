import type { PluginBuild } from 'esbuild';
import type { UnpluginOptions } from 'unplugin';
import type { ILogger } from '../../types';
import type { FindOptions } from '../types';
import { esbuildSetup } from './esbuildSetup';

export const createEsbuild = (enabled: boolean, findOptions: FindOptions, logger: ILogger): UnpluginOptions['esbuild'] => {
  if (enabled) {
    return {
      setup: (build: PluginBuild) => esbuildSetup(build, findOptions, logger),
    };
  }
  return undefined;
};
