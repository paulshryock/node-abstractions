# Abstractions

| :warning: This project is in early development and not for production use. |
| :------------------------------------------------------------------------- |

Facade abstractions for software side-effects. Reduce accidental complexity; focus on the problem to solve.

![Latest version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fpaulshryock%2Fnode-abstractions%2Fraw%2Fmain%2Fpackage.json&query=%24.version&prefix=v&label=latest%20version)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40paulshryock%2Fabstractions)
![npm downloads](https://img.shields.io/npm/dt/%40paulshryock/abstractions)
[![Socket](https://socket.dev/api/badge/npm/package/@paulshryock/abstractions)](https://socket.dev/npm/package/@paulshryock/abstractions)
![License](https://img.shields.io/github/license/paulshryock/node-abstractions)

```typescript
import { LocalFileSystem, VirtualFileSystem } from '@paulshryock/abstractions'

class MyClass {
    public constructor(private fs: VirtualFileSystem) {}

    public doSomething(): void {
        this.fs.copy('some-file', 'another-file')
    }
}

new MyClass(new LocalFileSystem()).doSomething()
```

## Why

Decouple side-effects from your business logic. Swap your infrastructure any time.

- Switch from `LocalFileSystem` to `SshFileSystem` to `S3FileSystem`.
- Switch from `InMemoryStorage` to `FileSystemStorage` to `SqliteStorage`.

## Features

## Installation

```bash
npm install @paulshryock/abstractions
```

## Documentation

## Support

- [Ask a question](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=question&projects=&template=1_ask_a_question.md&title=)
- [Request a feature](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=enhancement&projects=&template=2_request_a_feature.md&title=)
- [Document a user story](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=enhancement&projects=&template=3_document_a_user_story.md&title=)
- [Report a bug](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=bug&projects=&template=4_report_a_bug.md&title=)

## Contributing

Contributions are welcome! **Read the [contribution guidelines](https://github.com/paulshryock/node-abstractions/blob/main/CONTRIBUTING.md)**, and then submit a pull request.

## Maintainers

- [Paul Shryock](https://github.com/paulshryock)

## License

[MIT License](https://github.com/paulshryock/node-abstractions/blob/main/LICENSE)
