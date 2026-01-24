import { describe, expect, it } from 'vitest';
import { Feature, type Options } from '../../src';
import { runEsbuildSetup } from './runEsbuildSetup';

describe('unplugin-graphql esbuild watch feature', () => {
  describe('source file imports virtual typedefs module', () => {
    describe('feature flag OFF', () => {
      it('does not expose an esbuild.setup hook', () => {
        const options: Options = {
          features: { [Feature.EsbuildWatch]: false },
        };

        const build = runEsbuildSetup(options);

        expect(build.onLoad).not.toHaveBeenCalled();
      });

      it('does not return watchFiles from the esbuild onLoad path', () => {});
    });

    describe('feature flag ON', () => {
      it('exposes an esbuild.setup hook', () => {
        const options: Options = {
          features: { [Feature.EsbuildWatch]: true },
        };

        const build = runEsbuildSetup(options);

        expect(build.onLoad).toHaveBeenCalled();
      });

      it('esbuildSetup/onLoad returns watchFiles for matched GraphQL files', async () => {
        const options: Options = {
          features: { [Feature.EsbuildWatch]: true },
        };

        const build = runEsbuildSetup(options);

        const onLoadCallback = build.onLoad.mock.calls[0][1];

        const result = await onLoadCallback({
          path: 'test/typedefs-entry.ts',
          namespace: 'file',
          suffix: '',
          pluginData: {},
          with: {},
        });

        expect(result?.watchFiles).toEqual(['test/mutation.graphql', 'test/query.graphql', 'test/schema.spec.graphql', 'test/sub/schema.graphql']);
      });
    });
  });

  describe('source file does NOT import virtual typedefs module', () => {
    describe('feature flag OFF', () => {
      it('does not expose an esbuild.setup hook', () => {
        const options: Options = {
          features: { [Feature.EsbuildWatch]: false },
        };

        const build = runEsbuildSetup(options);

        expect(build.onLoad).not.toHaveBeenCalled();
      });

      it('does not return watchFiles from the esbuild onLoad path');
    });

    describe('feature flag ON', () => {
      it('exposes an esbuild.setup hook', () => {
        const options: Options = {
          features: { [Feature.EsbuildWatch]: true },
        };

        const build = runEsbuildSetup(options);

        expect(build.onLoad).toHaveBeenCalled();
      });

      it('esbuildSetup/onLoad does not return watchFiles', async () => {
        const options: Options = {
          features: { [Feature.EsbuildWatch]: true },
        };

        const build = runEsbuildSetup(options);

        const onLoadCallback = build.onLoad.mock.calls[0][1];

        const result = await onLoadCallback({
          path: 'test/no-typedefs-entry.ts',
          namespace: 'file',
          suffix: '',
          pluginData: {},
          with: {},
        });
        console.log('result', result);

        expect(result?.watchFiles).toBeUndefined();
      });
    });
  });
});
