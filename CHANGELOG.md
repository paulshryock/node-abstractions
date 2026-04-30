# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!--
  -- What is a changelog? A changelog is a file which contains a curated,
  -- chronologically ordered list of notable changes for each version of a
  -- project.
  --
  -- Why keep a changelog? To make it easier for users and contributors to see
  -- precisely what notable changes have been made between each release (or
  -- version) of the project.
  --
  -- Who needs a changelog? People do. Whether consumers or developers, the end
  -- users of software are human beings who care about what's in the software.
  -- When the software changes, people want to know why and how.
  --
  -- How do I make a good changelog?
  --
  -- Guiding Principles
  --
  -- Changelogs are for humans, not machines.
  -- There should be an entry for every single version.
  -- The same types of changes should be grouped.
  -- Versions and sections should be linkable.
  -- The latest version comes first.
  -- The release date of each version is displayed.
  -- Mention whether you follow Semantic Versioning.
  --
  -- Types of changes
  --
  -- Added for new features.
  -- Changed for changes in existing functionality.
  -- Deprecated for soon-to-be removed features.
  -- Removed for now removed features.
  -- Fixed for any bug fixes.
  -- Security in case of vulnerabilities.
  -->

## [Unreleased](https://github.com/paulshryock/node-abstractions.git/compare/HEAD..v0.3.2)

### Added

- Add `PsrHttpClient` interface based on PSR-18.

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [v0.4.0](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.4.0) - 2025-03-22

### Removed

- Remove `HttpClient.getResponseBody` method.

## [v0.3.2](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.3.2) - 2025-03-22

### Added

- Add `HttpClient` class.
- Add `VirtualFileSystem.list` and `VirtualFileSystem.listRecursive` methods.

## [v0.3.1](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.3.1) - 2024-12-29

### Changed

- Decrease specificity of CommandLine stream types.

### Removed

- Import less of node:readline module.

## [v0.3.0](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.3.0) - 2024-12-26

### Changed

- Rename `FileSystem` interface to `VirtualFileSystem` to avoid conflict with File System API.
- Rename `LocalCommandLine` class to `CommandLine`.
- Change `CommandLine.error` first argument to string.

### Removed

- Do not export `Exception` utility class since it is for internal use.
- Remove `StackTrace` utility class since it is no longer needed.
- Remove legacy `NetworkInput` class.
- Remove `CommandLine` interface.

## [v0.2.1](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.2.1) - 2024-09-22

### Removed

- Uninstall `fs-extra`. (I thought this thing was uninstalled in v0.1.3!)

## [v0.2.0](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.2.0) - 2024-09-22

### Added

- Export stable `CommandLine` and `FileSystem` interfaces.
- Export stable `LocalCommandLine`, `LocalFileSystem`, `StackTrace`, and `Exception` classes.

### Removed

- Remove all other exports.

## [v0.1.3](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.1.3) - 2023-10-01

### Added

- Add `ProcessInput`.

### Changed

- Rewrite `LocalFileSystem.copy` with standard library.

### Removed

- Remove `fs-extra`.

## [v0.1.2](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.1.2) - 2023-09-20

### Added

- Export `Record` and `Storage` classes with Exceptions.

## [v0.1.1](https://github.com/paulshryock/node-abstractions.git/releases/tag/v0.1.1) - 2023-09-18

### Added

- Add `Exception`.
- Add `FileSystem`.
- Add `FileSystemException`.
- Add `LocalFileSystem`.
- Add `MessageStringable`.
- Add `RecordStorage`.
- Add `RecordStorageException`.
- Add `Storage`.
- Add `StorageException`.
- Add `Stringable`.
- Install `fs-extra`.

### Changed

- Allow Output methods' first parameter to be `Stringable`.

## [v0.1.0](https://github.com/paulshryock/node-abstractions/releases/tag/v0.1.0) - 2023-06-09

### Added

- Add `Console` interface.
- Add `ConsoleOutput` class.
