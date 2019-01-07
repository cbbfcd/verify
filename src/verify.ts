import { isUrlHelper } from './isUrl'

enum TYPE_ENUM {
  string = 'String',
  boolean = 'Boolean',
  function = 'Function',
  array = 'Array',
  number = 'Number',
  date = 'Date',
  regexp = 'RegExp',
  object = 'Object',
  error = 'Error'
}

type KEYS_FOR_TYPE_ENUM =
  | 'string'
  | 'boolean'
  | 'function'
  | 'array'
  | 'number'
  | 'date'
  | 'regexp'
  | 'object'
  | 'error'

const toStringCheck = <T>(type: KEYS_FOR_TYPE_ENUM) => (value: unknown): value is T =>
  ({}.toString.call(value) === `[object ${TYPE_ENUM[type]}]`)

namespace verify {
  export const isString = toStringCheck<string>('string')
  export const isUrl = isUrlHelper
}

export default verify
