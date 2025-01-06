# @shellicar/build-graphql

Build plugin that loads GraphQL files and makes them available through a virtual module import.

- ⚡️ Supports Vite, Webpack, Rspack, Vue CLI, Rollup, esbuild and more, powered by [unplugin](https://github.com/unjs/unplugin).

<!-- BEGIN_ECOSYSTEM -->

## @shellicar TypeScript Ecosystem

### Core Libraries

- [`@shellicar/core-di`](https://github.com/shellicar/core-di) - A basic dependency injection library.
- [`@shellicar/core-foundation`](https://github.com/shellicar/core-foundation) - A comprehensive starter repository.

### Build Tools

- [`@shellicar/build-version`](https://github.com/shellicar/build-version) - Build plugin that calculates and exposes version information through a virtual module import.
- [`@shellicar/build-graphql`](https://github.com/shellicar/build-graphql) - Build plugin that loads GraphQL files and makes them available through a virtual module import.

### Framework Adapters

- [`@shellicar/svelte-adapter-azure-functions`](https://github.com/shellicar/svelte-adapter-azure-functions) - A [SvelteKit adapter](https://kit.svelte.dev/docs/adapters) that builds your app into an Azure Function.

### Logging & Monitoring

- [`@shellicar/winston-azure-application-insights`](https://github.com/shellicar/winston-azure-application-insights) - An [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) transport for [Winston](https://github.com/winstonjs/winston) logging library.
- [`@shellicar/pino-applicationinsights-transport`](https://github.com/shellicar/pino-applicationinsights-transport) - [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights) transport for [pino](https://github.com/pinojs/pino)

<!-- END_ECOSYSTEM -->

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
