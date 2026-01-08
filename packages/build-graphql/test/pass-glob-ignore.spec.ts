import { build } from 'esbuild';
import { readFile } from 'fs/promises';
import { describe, expect, it } from 'vitest';
import graphqlPlugin from '../src/esbuild';
import type { Options } from '../src/types';

type TestFile = 'query.graphql' | 'mutation.graphql' | 'schema.spec.graphql' | 'sub/schema.graphql';

describe('glob ignore', () => {
  const buildWithOptions = async (options: Options, outfile: string) => {
    await build({
      entryPoints: ['test/test-entry.ts'],
      outfile,
      bundle: true,
      platform: 'node',
      plugins: [graphqlPlugin(options)],
    });
    return await readFile(outfile, 'utf-8');
  };

  const verifyFiles = (output: string, expectedFiles: TestFile[], excludedFiles: TestFile[] = []) => {
    for (const file of expectedFiles) {
      expect(output).toContain(file);
    }
    for (const file of excludedFiles) {
      expect(output).not.toContain(file);
    }
  };

  it('includes all graphql files', async () => {
    const output = await buildWithOptions({ globPattern: 'test/**/*.graphql' }, 'test/dist/out.js');

    const expectedFiles = ['query.graphql', 'mutation.graphql', 'schema.spec.graphql', 'sub/schema.graphql'] satisfies TestFile[];
    verifyFiles(output, expectedFiles);
  });

  it('can ignore a single file', async () => {
    const output = await buildWithOptions(
      {
        globPattern: 'test/**/*.graphql',
        globIgnore: '**/mutation.graphql',
      },
      'test/dist/out2.js',
    );

    const expectedFiles = ['query.graphql', 'schema.spec.graphql', 'sub/schema.graphql'] satisfies TestFile[];
    const excludedFiles = ['mutation.graphql'] satisfies TestFile[];
    verifyFiles(output, expectedFiles, excludedFiles);
  });

  it('can ignore multiple files with array', async () => {
    const output = await buildWithOptions(
      {
        globPattern: 'test/**/*.graphql',
        globIgnore: ['**/mutation.graphql', '**/schema.spec.graphql'],
      },
      'test/dist/out3.js',
    );

    const expectedFiles = ['query.graphql', 'sub/schema.graphql'] satisfies TestFile[];
    const excludedFiles = ['mutation.graphql', 'schema.spec.graphql'] satisfies TestFile[];
    verifyFiles(output, expectedFiles, excludedFiles);
  });

  it('can use glob.ignore syntax', async () => {
    const output = await buildWithOptions(
      {
        globPattern: 'test/**/*.graphql',
        globOptions: {
          ignore: '**/mutation.graphql',
        },
      },
      'test/dist/out4.js',
    );

    const expectedFiles = ['query.graphql', 'schema.spec.graphql', 'sub/schema.graphql'] satisfies TestFile[];
    const excludedFiles = ['mutation.graphql'] satisfies TestFile[];
    verifyFiles(output, expectedFiles, excludedFiles);
  });

  it('glob.ignore overrides globIgnore', async () => {
    const output = await buildWithOptions(
      {
        globPattern: 'test/**/*.graphql',
        globIgnore: '**/mutation.graphql',
        globOptions: {
          ignore: '**/schema.spec.graphql',
        },
      },
      'test/dist/out5.js',
    );

    const expectedFiles = ['query.graphql', 'mutation.graphql', 'sub/schema.graphql'] satisfies TestFile[];
    const excludedFiles = ['schema.spec.graphql'] satisfies TestFile[];
    verifyFiles(output, expectedFiles, excludedFiles);
  });

  it('baseline: specific pattern matches expected files without ignore', async () => {
    const output = await buildWithOptions(
      {
        globPattern: 'test/*.graphql',
      },
      'test/dist/out6.js',
    );

    const expectedFiles = ['query.graphql', 'mutation.graphql', 'schema.spec.graphql'] satisfies TestFile[];
    const excludedFiles = ['sub/schema.graphql'] satisfies TestFile[];
    verifyFiles(output, expectedFiles, excludedFiles);
  });
});
