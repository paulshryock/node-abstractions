import { env } from 'node:process'
import install from 'husky'

if (typeof env.CI === 'undefined') install('bin/husky')
