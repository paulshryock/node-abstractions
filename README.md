# Abstractions

This package includes a number of reusable abstractions and implementations for common tasks which take place at the edges of your software. These are things like input/output, the network, the file system, databases, and email. By abstracting these concepts behind an interface, you can easily manage this accidental complexity and instead focus on the essential complexity of your application's business logic.

| :warning: This project is in early development and not ready for production use. |
| :------------------------------------------------------------------------------- |

## Requirements

| Software | Minimum Version |
| :------- | :-------------- |
| Node     | 14.13.1         |

## Installation

```bash
npm install @paulshryock/abstractions
```

## Usage

### Output

```typescript
import { Output } from '@paulshryock/abstractions'

class MyService {
    constructor(private readonly output: Output) {}

    outputMessages(): void {
        this.output.error('An error occurred.')
        this.output.warn('A warning message.')
        this.output.log('A log message.')
        this.output.info('An info message.')
        this.output.debug('A debug message.')
    }
}
```

## Support

-   [Ask a question](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=question&projects=&template=1_ask_a_question.md&title=)
-   [Request a feature](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=enhancement&projects=&template=2_request_a_feature.md&title=)
-   [Document a user story](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=enhancement&projects=&template=3_document_a_user_story.md&title=)
-   [Report a bug](https://github.com/paulshryock/node-abstractions/issues/new?assignees=&labels=bug&projects=&template=4_report_a_bug.md&title=)

## Roadmap

-   [ ] Database
-   [ ] Email
-   [ ] FileSystem
-   [ ] Input
-   [ ] Network
-   ✅ Output

## Contributing

Contributions are welcome! **Read the [contribution guidelines](https://github.com/paulshryock/node-abstractions/blob/main/CONTRIBUTING.md)**, and then submit a pull request.

## Authors and acknowledgment

[Paul Shryock](https://github.com/paulshryock)

## License

[MIT License](https://github.com/paulshryock/node-abstractions/blob/main/LICENSE)

## Project status

This project is in early development, and is not recommended for use in a production environment.
