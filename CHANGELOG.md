# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

-   **Added** for new features.
-   **Changed** for changes in existing functionality.
-   **Deprecated** for soon-to-be removed features.
-   **Removed** for now removed features.
-   **Fixed** for any bug fixes.
-   **Security** in case of vulnerabilities.

## [Unreleased](https://github.com/paulshryock/node-abstractions.git/compare/HEAD..v0.2.1)

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [v0.2.1](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.2.1) - 2024-09-22

### Removed

-   Uninstall `fs-extra`. (I thought this thing was uninstalled in v0.1.3!)

## [v0.2.0](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.2.0) - 2024-09-22

### Added

-   Export stable `CommandLine` and `FileSystem` interfaces.
-   Export stable `LocalCommandLine`, `LocalFileSystem`, `StackTrace`, and `Exception` classes.

### Removed

-   Remove all other exports.

## [v0.1.3](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.1.3) - 2023-10-01

### Added

-   Add `ProcessInput`.

### Changed

-   Rewrite `LocalFileSystem.copy` with standard library.

### Removed

-   Remove `fs-extra`.

## [v0.1.2](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.1.2) - 2023-09-20

### Added

-   Export `Record` and `Storage` classes with Exceptions.

## [v0.1.1](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.1.1) - 2023-09-18

### Added

-   Add `Exception`.
-   Add `FileSystem`.
-   Add `FileSystemException`.
-   Add `LocalFileSystem`.
-   Add `MessageStringable`.
-   Add `RecordStorage`.
-   Add `RecordStorageException`.
-   Add `Storage`.
-   Add `StorageException`.
-   Add `Stringable`.
-   Install `fs-extra`.

### Changed

-   Allow Output methods' first parameter to be `Stringable`.

## [v0.1.0](https://github.com/paulshryock/node-abstractions/releases/tag/v0.1.0) - 2023-06-09

### Added

-   Add `Console` interface.
-   Add `ConsoleOutput` class.
