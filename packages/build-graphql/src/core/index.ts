import path from 'node:path';
import { generateContentsFromGraphqlString, generateGraphQLString } from '@luckycatfactory/esbuild-graphql-loader';
import { glob } from 'glob';
import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import { defaults } from './defaults';
import type { Options } from './types';

type GraphqlFile = {
  path: string;
  name: string;
};

const findGraphQLFiles = async (options: { globPattern: string; globIgnore: string }): Promise<GraphqlFile[]> => {
  const files = await glob(options.globPattern, { ignore: options.globIgnore });
  return files.map((file, index) => ({
    path: path.join(process.cwd(), file).replace(/\\/g, '/'),
    name: `gql_${index}`,
  }));
};

const generateTypedefsFile = (files: GraphqlFile[]) => {
  const importStatements = files.map((f) => `import ${f.name} from '${f.path}';`);

  const documentsArray = `[${files.map((f) => f.name).join(', ')}]`;

  const code = [...importStatements, `export default ${documentsArray};`];
  return code.join('\n');
};

const graphqlPluginFactory: UnpluginFactory<Options> = (inputOptions, meta) => {
  const options = {
    ...defaults,
    ...inputOptions,
  };
  const log = (message: any, ...args: any) => {
    if (options.debug) {
      console.log('[graphql]:', message, ...args);
    }
  };

  if (options.rootDir == null) {
    options.rootDir = process.cwd();
  }
  const rootDir = options.rootDir;
  let graphqlMatched: string[] = [];
  const graphqlImports: string[] = [];
  let importedTypedefs = false;
  log({ options });

  const MODULE_ID = '@shellicar/build-graphql/typedefs';

  const typedefsPattern = new RegExp(options.typedefsPath);

  const matchTypedefs = (id: string) => {
    if (meta.framework === 'vite') {
      return typedefsPattern.test(id);
    }
    return id === MODULE_ID;
  };
  const matchGraphql = (id: string) => {
    return id.endsWith('.graphql');
  };

  return {
    name: 'graphql',
    buildStart: async () => {
      log('Build start');
      graphqlMatched = await glob(options.globPattern, { ignore: options.globIgnore });
    },
    resolveId(id) {
      if (matchTypedefs(id)) {
        return id;
      }
      if (matchGraphql(id)) {
        return path.resolve(rootDir, id);
      }
    },
    loadInclude(id) {
      return matchGraphql(id) || matchTypedefs(id);
    },
    load: async (id) => {
      if (matchTypedefs(id)) {
        importedTypedefs = true;
        const files = await findGraphQLFiles(options);
        const code = generateTypedefsFile(files);
        log(`Typedefs: \`${code}\``);
        return { code, map: null };
      }
      if (matchGraphql(id)) {
        const absolutePath = path.isAbsolute(id) ? id : path.resolve(rootDir, id);
        const graphqlString = await generateGraphQLString(absolutePath);
        graphqlImports.push(id);
        return {
          code: generateContentsFromGraphqlString(graphqlString, options.mapDocumentNode),
          map: null,
        };
      }
    },
    buildEnd: () => {
      log('Build end', {
        graphqlMatched,
        graphqlImports,
        importedTypedefs,
      });
      if (!options.ignoreErrors) {
        if (graphqlMatched.length === 0) {
          throw new Error(`No GraphQL files found for the pattern: ${options.globPattern}`);
        }
        if (!importedTypedefs) {
          throw new Error('Typedefs not imported. Make sure to import from @shellicar/build-graphql/typedefs');
        }
      }
    },
  };
};
export const plugin = createUnplugin(graphqlPluginFactory);
