# Abstractions

| :warning: This project is in early development and not for production use. |
| :------------------------------------------------------------------------- |

Library of Node.js abstractions for side effects at the edges of software.

Reduce accidental complexity and focus on application business logic.

![Latest version badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fpaulshryock%2Fnode-abstractions%2Fraw%2Fmain%2Fpackage.json&query=%24.version&prefix=v&label=latest%20version) ![npm bundle size](https://img.shields.io/bundlephobia/min/%40paulshryock%2Fabstractions) ![npm downloads badge](https://img.shields.io/npm/dt/%40paulshryock/abstractions) [![Socket badge](https://socket.dev/api/badge/npm/package/@paulshryock/abstractions)](https://socket.dev/npm/package/@paulshryock/abstractions) ![GitHub License](https://img.shields.io/github/license/paulshryock/node-abstractions)

<!-- todo ## Requirements -->

## Installation

```bash
npm install @paulshryock/abstractions
```

## Usage

### Command Line

`VirtualCommandLine` is an interface representing a command line abstraction. `CommandLine` is a concrete implementation of a command line which makes use of native Node.js stdout and stderr streams.

```ts
import { CommandLine, VirtualCommandLine } from '@paulshryock/abstractions'

class MyClass {
    public construct(private commandLine: VirtualCommandLine) {}

    /** Prints 'Hello, world!' to stdout. */
    public printHelloWorldToStdout(): void {
        this.commandLine.out('Hello, world!')
    }

    /**
     * Prints 'What is your name?' to stdout and waits for an answer. Then
     * prints 'Hello, Paul!' to stdout (if the name given is 'Paul').
     */
    public async printHelloNameToStdout(): Promise<void> {
        const name = await this.commandLine.ask('What is your name?')

        this.commandLine.out(`Hello, ${name}!`)
    }

    /** Prints 'Hello, error!' to stderr. */
    public printHelloErrorToStderr(): void {
        this.commandLine.error('Hello, error!', { trace: true })
    }
}

const myClass = new MyClass(new CommandLine())

myClass.printHelloWorldToStdout()
myClass.printHelloNameToStdout()
myClass.printHelloErrorToStderr()
```

### File System

```ts
import { FileSystem } from '@paulshryock/abstractions'
```

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
