import path from 'node:path';
import { generateContentsFromGraphqlString, generateGraphQLString } from '@luckycatfactory/esbuild-graphql-loader';
import { glob } from 'glob';
import type { DocumentNode } from 'graphql';
import type { ILogger } from './types';

type GraphqlFile = {
  path: string;
  name: string;
};

export const findGraphQLFiles = async (options: { globPattern: string; globIgnore: string }): Promise<GraphqlFile[]> => {
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

type TransformResult =
  | {
      code: string;
      map: null;
    }
  | null
  | undefined;

export const loadVirtualModule = async (options: { globPattern: string; globIgnore: string }, logger: ILogger): Promise<TransformResult> => {
  const files = await findGraphQLFiles(options);
  const code = generateTypedefsFile(files);
  logger.debug(`Typedefs: \`${code}\``);
  return { code, map: null };
};

export const loadGraphqlModule = async (id: string, options: { mapDocumentNode?: (documentNode: DocumentNode) => DocumentNode }, logger: ILogger): Promise<TransformResult> => {
  if (id.startsWith('\0') && id.endsWith('.graphql')) {
    const realId = id.slice(1);
    const graphqlString = await generateGraphQLString(realId);
    const code = generateContentsFromGraphqlString(graphqlString, options.mapDocumentNode);
    return {
      code,
      map: null,
    };
  }
  return undefined;
};
