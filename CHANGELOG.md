# Changelog

## [1.4.0] - 2026-01-24

### Added

- Added `features` option to enable/disable specific plugin features
- Added esbuild watch mode feature for automatic rebuilds (enabled by default)
- Added Vite watch mode and HMR (Hot Module Replacement) feature (enabled by default)
- Added `errorPolicy` option to control how errors are handled during builds

### Changed

- Updated `unplugin` dependency from ^2.3.11 to ^3.0.0
- Explicitly exported all public types that were previously only available as dependencies of other types

### Deprecated

- `ignoreErrors` option is now deprecated in favour of using `errorPolicy`

## [1.3.0] - 2026-01-05

### Added

- Added `globOptions` to support passing all glob options directly when finding GraphQL files

### Changed

- Adds support for `IgnoreLike` and `string[]` on `globIgnore` option, in addition to `string`.

### Deprecated

- `globIgnore` is now deprecated in favor of using `globOptions.ignore`

## [1.2.2] - 2025-12-26

### Changed

- Updated all dependencies to latest versions

## [1.2.1] - 2025-10-24

### Changed

- Updated all dependencies to latest versions

## [1.2.0] - 2025-08-27

### Changed

- Updated all dependencies to latest versions

## [1.1.0] - 2025-08-03

### Changed

- Updated all dependencies to latest versions

## [1.0.1] - 2025-01-16

### Fixed

- Export types explicitly
- Fix logging prefix

## [1.0.0] - 2025-01-09

### Changed

- Force plugin to run in `pre` mode
- Refactor and simplify plugin code

### Structure

- Use `packages` and `examples` monorepo structure

## [0.1.1] - 2025-01-05

### Fixed

Fix missing README

## [0.1.0] - 2025-01-05

Initial release.

[1.4.0]: https://github.com/shellicar/build-graphql/releases/tag/1.4.0
[1.3.0]: https://github.com/shellicar/build-graphql/releases/tag/1.3.0
[1.2.2]: https://github.com/shellicar/build-graphql/releases/tag/1.2.2
[1.2.1]: https://github.com/shellicar/build-graphql/releases/tag/1.2.1
[1.2.0]: https://github.com/shellicar/build-graphql/releases/tag/1.2.0
[1.1.0]: https://github.com/shellicar/build-graphql/releases/tag/1.1.0
[1.0.1]: https://github.com/shellicar/build-graphql/releases/tag/1.0.1
[1.0.0]: https://github.com/shellicar/build-graphql/releases/tag/1.0.0
[0.1.1]: https://github.com/shellicar/build-graphql/releases/tag/0.1.1
[0.1.0]: https://github.com/shellicar/build-graphql/releases/tag/0.1.0
