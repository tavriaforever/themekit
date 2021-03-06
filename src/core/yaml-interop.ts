import Module from 'module'
import { readFileSync } from 'fs'
import YAML from 'yaml'

Module.prototype.require = new Proxy(Module.prototype.require, {
  apply(target, thisArg, args) {
    if (/\.ya?ml$/.test(args[0])) {
      const file = readFileSync(args[0], 'utf8')
      try {
        return YAML.parse(file)
      } catch (error) {}
    }
    return Reflect.apply(target, thisArg, args)
  },
})
