# @paulshryock/node-abstractions

Reusable abstractions for Node.js.

## Requirements

| Software | Minimum Version |
| :------- | :-------------- |
| Node     | 14.13.1         |

## Installation

```bash
npm install @paulshryock/node-abstractions
```

## Usage

### Console

#### TypeScript

```typescript
import { Console } from '@paulshryock/node-abstractions'

class MyService {
    constructor(private readonly console: Console) {}

    logMessages(): void {
        this.console.error('error message')
        this.console.warn('warn message')
        this.console.log('log message')
        this.console.info('info message')
        this.console.debug('debug message')
    }
}

new MyService(new Console()).logMessages()
// error message
// warn message
// log message
// info message
// debug message
```

#### JavaScript

```javascript
import { Console } from '@paulshryock/node-abstractions'

class MyService {
    #console

    constructor(c) {
        this.#console = c
    }

    logMessages() {
        this.#console.error('error message')
        this.#console.warn('warn message')
        this.#console.log('log message')
        this.#console.info('info message')
        this.#console.debug('debug message')
    }
}

new MyService(new Console()).logMessages()
// error message
// warn message
// log message
// info message
// debug message
```

## Support

-   [Ask a question](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=question&projects=&template=1_ask_a_question.md&title=)
-   [Request a feature](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=enhancement&projects=&template=2_request_a_feature.md&title=)
-   [Document a user story](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=enhancement&projects=&template=3_document_a_user_story.md&title=)
-   [Report a bug](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=bug&projects=&template=4_report_a_bug.md&title=)

## Roadmap

-   [ ] CommandLine
-   ✅ Console
-   [ ] Database
-   [ ] Email
-   [ ] FileSystem
-   [ ] Network

## Contributing

Contributions are welcome! **Read the [contribution guidelines](https://github.com/paulshryock/node-abstractions/blob/main/CONTRIBUTING.md)**, and then submit a pull request.

## Authors and acknowledgment

[Paul Shryock](https://github.com/paulshryock)

## License

[MIT License](https://github.com/paulshryock/node-abstractions/blob/main/LICENSE)

## Project status

This project is in early development, and is not recommended for use in a production environment.
