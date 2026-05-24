# API

## `CommandLine`

Reads and writes messages to and from the command line.

### Public properties

1. **`options`**: `Record<string, boolean | number | string>`

    All short and long options from the current process. Boolean strings (`'true'`|`'false'`) are converted to boolean.

1. **`positionalArguments`**: `string[]`

    Positional arguments from the current process.

### Public methods

#### `ask(question)`

- `question`: `<string>` Question to print to output stream.
- Returns: `<Promise<string>>` Answer read from input stream.

Prints question to output stream and reads answer from input stream.

#### `out(message[, options])`

- `message`: `<string>` Message for output stream.
- `options`: `<Object>`
    - `trace`: `<boolean>` Whether or not to include a stack trace.
- Returns: `<void>`

Writes message to output stream. Optionally includes a stack trace.

#### `error(error[, options])`

- `error`: `string` Error message for error stream.
- `options`: `<Object>`
    - `trace`: `<boolean>` Whether or not to include a stack trace.
- Returns: `<void>`

Writes error message to error stream. Optionally includes a stack trace.

### Usage examples

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

## `LocalFileSystem`

### Public methods

#### ` canRead()`

- Returns: `Promise<boolean>` Possibility to read from the file system.

Checks if it is possible to read from the file system.

#### `readFile(path)`

- `path`: `<string>` Path to file.
- Returns: `<Promise<string>>` File contents.

Reads a file.

#### `writeFile(path, content)`

- `path`: `<string>` Path to file.
- `content`: `<string>` Content to write to file.
- Returns: `<Promise<void>>`

Writes to a file.

#### `appendFile(path, content)`

- `path`: `<string>` Path to file.
- `content`: `<string>` Content to write to file.
- Returns: `<Promise<void>>`

Appends to a file.

#### `deleteFile(path)`

- `path`: `<string>` Path to file.
- Returns: `<Promise<void>>`

Deletes a file.

#### `isFile(path)`

- `path`: `<string>` Path to file.
- Returns: `<Promise<boolean>>` Whether or not the path is a file.

Checks if a path is a file.

#### `createDirectory(path)`

- `path`: `<string>` Path to directory.
- Returns: `<Promise<void>>`

Creates a directory.

#### `list(path)`

- `path`: `<string>` Path to directory.
- Returns: `<Promise<string[]>>` Contents of the directory.

Lists directory contents.

#### `readDirectory(path)`

- `path`: `<string>` Path to directory.
- Returns: `<Promise<string[]>>` Contents of the directory.

Lists directory contents. Alias of list().

#### `listRecursive(path)`

- `path`: `<string>` Path to directory.
- Returns: `<Promise<string[]>>` Recursive contents of the directory.

Lists directory contents recursively.

#### `readDirectoryRecursive(path)`

- `path`: `<string>` Path to directory.
- Returns: `<Promise<string[]>>` Recursive contents of the directory.

Lists directory contents recursively. Alias of listRecursive().

#### `deleteDirectory(path)`

- `path`: `<string>` Path to directory.
- Returns: `<Promise<void>>`

Deletes a directory.

#### `isDirectory(path)`

- `path`: `<string>` Path to directory.
- Returns: `<Promise<boolean>>` Whether or not the path is a directory.

Checks if a path is a directory.

#### `copy(src, dest)`

- `src`: `<string>` Source path.
- `dest`: `<string>` Destination path.
- Returns: `<Promise<void>>`

Copies a file or directory to another location.

When `src` and `dest` are path names to files, the program copies the contents of the first file to the second file, creating the second file if necessary.

When `src` is a path name of a file and `dest` is a path to a directory, then the program copies the source file into the destination directory, creating the file if necessary.

When `src` and `dest` are both the path names to two directories, the program copies the source directory into the destination directory, creating any files or directories needed. If the destination directory already exists, the source is copied into the destination, while a new directory is created if the destination does not exist.

#### `move(src, dest)`

- `src`: `<string>` Source path.
- `dest`: `<string>` Destination path.
- Returns: `<Promise<void>>`

Moves a file or directory to another location.

#### `exists(path)`

- `path`: `<string>` Path to directory.
- Returns: `<Promise<boolean>>` Whether or not the path is an existing file or directory.

Checks if a file or directory exists.

### Usage examples

```ts
import { LocalFileSystem, VirtualFileSystem } from '@paulshryock/abstractions'

class MyClass {
    public constructor(private fileSystem: VirtualFileSystem) {}
}

const myClass = new MyClass(new LocalFileSystem())
```

## `HttpClient`

Sends requests and returns responses.

### Public methods

#### `sendRequest(request)`

- `request`: `<Request>` HTTP request to send.
- Returns: `<Promise<Response>>` HTTP response.

Sends a request and returns a response.

### Usage examples

```ts
import { HttpClient, PsrHttpClient } from '@paulshryock/abstractions'

class MyClass {
    public constructor(private httpClient: PsrHttpClient) {}
}

const myClass = new MyClass(new HttpClient())
```
