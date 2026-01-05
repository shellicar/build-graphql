import type { GlobOptions, glob } from 'glob';
import type { DocumentNode } from 'graphql';

export type GlobPattern = Parameters<typeof glob>[0]; // string | string[]
export type GlobIgnore = NonNullable<GlobOptions['ignore']>; // string | string[] | IgnoreLike

// TODO(shellicar): Add ability to pass through all glob options
export interface Options {
  /**
   * Glob pattern to search for graphql files
   */
  globPattern?: GlobPattern;
  /**
   * Glob ignore pattern for graphql files
   */
  globIgnore?: GlobIgnore;
  /**
   * Ignores errors, otherwise errors will be thrown if graphql files are not found/imported and the typedefs file is not found
   */
  ignoreErrors?: boolean;
  /**
   * Enable logging
   */
  debug?: boolean;

  /**
   * Custom function to map the document node
   */
  mapDocumentNode?: (documentNode: DocumentNode) => DocumentNode;
}

export type FindOptions = Required<Pick<Options, 'globPattern' | 'globIgnore'>>;

export type LogLevel = 'debug' | 'error';

export type ILogger = {
  [key in LogLevel]: (typeof console)[key];
};
