import { validateApiContract } from '../../testing-utilities/contract.ts'

const className = 'CommandLine'
const properties = ['options', 'positionalArguments']
const methods = ['constructor', 'ask', 'error', 'out']

validateApiContract({ className, methods, properties })
