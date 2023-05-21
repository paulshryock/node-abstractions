import { install } from 'husky'
import { env } from 'node:process'

if (typeof env.CI === 'undefined') install('bin/husky')
