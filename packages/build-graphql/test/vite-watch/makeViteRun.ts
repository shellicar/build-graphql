import type { NormalizedInputOptions, PluginContext } from 'rollup';
import { createUnplugin } from 'unplugin';
import type { Plugin } from 'vite';
import { vi } from 'vitest';
import { ErrorPolicy, type Features } from '../../src';
import { graphqlPluginFactory } from '../../src/core/graphqlPluginFactory';
import { virtualModuleId } from '../../src/core/module';
import { resolveVirtualId } from '../../src/core/resolveVirtualId';
import { getHandler } from './getHandler';

export const makeViteRun = (features: Features) => {
  const unplugin = createUnplugin(graphqlPluginFactory);
  const plugin = unplugin.vite({
    features,
    errorPolicy: ErrorPolicy.Ignore,
    ignoreErrors: true,
  }) as Plugin;

  const ctx = {
    addWatchFile: vi.fn(),
    cache: {} as PluginContext['cache'],
    debug: vi.fn(),
    emitFile: vi.fn(),
    error: vi.fn<PluginContext['error']>(),
    fs: {} as PluginContext['fs'],
    getFileName: vi.fn(),
    getModuleIds: vi.fn(),
    getModuleInfo: vi.fn(),
    getWatchFiles: vi.fn(),
    info: vi.fn(),
    load: vi.fn(),
    parse: vi.fn(),
    resolve: vi.fn(),
    setAssetSource: vi.fn(),
    warn: vi.fn(),
    meta: {} as PluginContext['meta'],
    environment: {} as PluginContext['environment'],
  };

  const module = resolveVirtualId(virtualModuleId);

  const normalizedInput = {} as unknown as NormalizedInputOptions;

  const runBuild = async () => {
    const buildStart = getHandler(plugin.buildStart);
    const load = getHandler(plugin.load);
    const buildEnd = getHandler(plugin.buildEnd);

    await buildStart?.call(ctx, normalizedInput);
    await load?.call(ctx, module);
    await buildEnd?.call(ctx);
  };

  return { plugin, ctx, runBuild };
};
