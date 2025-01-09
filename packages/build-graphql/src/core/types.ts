import type { DocumentNode } from 'graphql';

export interface Options {
  /**
   * Glob pattern to search for graphql files
   */
  globPattern?: string;
  /**
   * Glob ignore pattern for graphql files
   */
  globIgnore?: string;
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

export type ILogger = {
  debug: (typeof console)['debug'];
  error: (typeof console)['error'];
};
