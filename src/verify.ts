enum TYPE_ENUM {
  string = 'String',
  boolean = 'Boolean',
  function = 'Function|GeneratorFunction|AsyncFunction',
  array = 'Array',
  number = 'Number',
  date = 'Date',
  regexp = 'RegExp',
  object = 'Object',
  error = 'Error'
}

type DomElement = object & { nodeType: 1; nodeName: string }

const toStringCheckHelper = <T>(type: keyof typeof TYPE_ENUM) => (value: unknown): value is T =>
  TYPE_ENUM[type]
    .split('|')
    .map(t => `[object ${t}]`)
    .some(item => item === {}.toString.call(value))

const URL_REG: RegExp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:localhost[\:?\d]*(?:[^\:?\d]\S*)?)|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/

const isUrlHelper = (url: string): Boolean => URL_REG.test(url)

const isNanHelper = (input: any) => input !== input

const isJsonStrHelper = (input: string) => {
  try {
    const obj = JSON.parse(input)
    if (obj && typeof obj === 'object') return true
  } catch (error) {
    console.error(error)
  }
  return false
}

// https://github.com/reduxjs/redux/blob/master/src/utils/isPlainObject.js
const isPlainObjectHelper = (input: any) => {
  if (typeof input !== 'object' || input === null) return false

  let proto = input
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(input) === proto
}

// https://github.com/sindresorhus/is/blob/master/source/index.ts#L280
const NODE_TYPE_ELEMENT = 1
const DOM_PROPERTIES_TO_CHECK = ['innerHTML', 'ownerDocument', 'style', 'attributes', 'nodeValue']
const isDomNodeHelper = (input: any): input is DomElement =>
  !verify.isNullOrUndefined(input) &&
  typeof input === 'object' &&
  (input as DomElement).nodeType === NODE_TYPE_ELEMENT &&
  verify.isString((input as DomElement).nodeName) &&
  !verify.isPlainObject(input) &&
  DOM_PROPERTIES_TO_CHECK.every(property => property in (input as DomElement))

namespace verify {
  export const isString = toStringCheckHelper<string>('string')
  export const isArray = Array.isArray || toStringCheckHelper<Array<any>>('array')
  export const isDate = toStringCheckHelper<Date>('date')
  export const isNumber = toStringCheckHelper<number>('number')
  export const isInfinity = (input: any) => input === Infinity || input === -Infinity
  export const isBoolean = toStringCheckHelper<boolean>('boolean')
  export const isError = toStringCheckHelper<Error>('error')
  export const isRegExp = toStringCheckHelper<RegExp>('regexp')
  export const isObject = toStringCheckHelper<object>('object')
  export const isFunction = toStringCheckHelper<Function>('function')
  export const isPlainObject = isPlainObjectHelper
  export const isDomNode = isDomNodeHelper
  export const isNull = (input: any) => input === null
  export const isUndefined = (input: any) => input === void 0
  export const isNullOrUndefined = (input: any) => isNull(input) || isUndefined(input)
  export const isJsonStr = isJsonStrHelper
  export const isNaN = isNanHelper
  export const isUrl = isUrlHelper
}

export default verify
