# @shellicar/build-graphql

Build plugin that loads GraphQL files and makes them available through a virtual module import.

- ⚡️ Supports Vite, Webpack, Rspack, Vue CLI, Rollup, esbuild and more, powered by [unplugin](https://github.com/unjs/unplugin).

## Usage

```sh
pnpm add -D @shellicar/build-graphql
```

### With esbuild 

```ts
import GraphQLPlugin from '@shellicar/build-graphql/esbuild'

build({
  // other options
  plugins: [
    GraphQLPlugin({ 
      globPattern: 'src/**/*.graphql'
    })
  ]
})
```

### Importing GraphQL Documents

```ts
import typedefs from '@shellicar/build-graphql/typedefs'
```

See [playground examples](./packages/playground) for full working implementations.

## Options

See [types.ts](./packages/build-graphql/src/core/types.ts) for detailed options documentation.

## Credits

- [@luckycatfactory/esbuild-graphql-loader](https://github.com/luckycatfactory/esbuild-graphql-loader)
- [unplugin](https://github.com/unjs/unplugin)
