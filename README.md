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

## API

### Command Line

Reads and writes messages to and from the command line.

#### Public properties

1. **`options`**: `Record<string, boolean | number | string>`

    All short and long options from the current process. Boolean strings (`'true'`|`'false'`) are converted to boolean.

1. **`positionalArguments`**: `string[]`

    Positional arguments from the current process.

#### Public methods

##### `ask(question)`

- `question`: `<string>` Question to print to output stream.
- Returns: `<Promise<string>>` Answer read from input stream.

Prints question to output stream and reads answer from input stream.

##### `out(message[, options])`

- `message`: `<string>` Message for output stream.
- `options`: `<Object>`
    - `trace`: `<boolean>` Whether or not to include a stack trace.
- Returns: `<void>`

Writes message to output stream. Optionally includes a stack trace.

##### `error(error[, options])`

- `error`: `string` Error message for error stream.
- `options`: `<Object>`
    - `trace`: `<boolean>` Whether or not to include a stack trace.
- Returns: `<void>`

Writes error message to error stream. Optionally includes a stack trace.

#### Useage examples

```ts
import { CommandLine } from '@paulshryock/abstractions'

class MyClass {
    public construct(private commandLine: CommandLine) {}

    /** Gets all short and long options from the current process. */
    public getOptions(): Record<string, boolean | number | string> {
        return this.commandLine.options
    }

    /** Gets positional arguments from the current process. */
    public getPositionalArguments(): string[] {
        return this.commandLine.positionalArguments
    }

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

    /** Prints 'Hello, error!' with a stack trace to stderr. */
    public printHelloErrorToStderr(): void {
        this.commandLine.error('Hello, error!', { trace: true })
    }
}

const myClass = new MyClass(new CommandLine())

const options = myClass.getOptions()
const positionalArguments = myClass.getPositionalArguments()

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
