# @shellicar/build-graphql

> Build plugin that loads GraphQL files and makes them available through a virtual module import.

## Installation & Quick Start

```sh
npm i --save @shellicar/build-graphql
```

```sh
pnpm add @shellicar/build-graphql
```

```ts
// build.ts
import GraphQLPlugin from '@shellicar/build-graphql/esbuild'

await build({
  // other options
  plugins: [
    GraphQLPlugin({ 
      globPattern: 'src/**/*.graphql'
    })
  ]
})
```

```ts
// vite.config.ts
import GraphQLPlugin from '@shellicar/build-graphql/vite'

export default defineConfig({
  // other options
  plugins: [
    GraphQLPlugin({ 
      globPattern: 'src/**/*.graphql'
    })
  ],
});
```

```ts
// main.ts
import typedefs from '@shellicar/build-graphql/typedefs'
```

## Documentation

For full documentation, visit [here](https://github.com/shellicar/build-graphql).
