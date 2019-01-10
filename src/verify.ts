enum TYPE_ENUM {
  string = 'String',
  boolean = 'Boolean',
  function = 'Function|GeneratorFunction|AsyncFunction',
  array = 'Array',
  number = 'Number',
  date = 'Date',
  regexp = 'RegExp',
  object = 'Object',
  error = 'Error',
  arguments = 'Arguments'
}

type DomElement = object & { nodeType: 1; nodeName: string }

const toStringCheckHelper = <T>(type: keyof typeof TYPE_ENUM) => (value: unknown): value is T =>
  TYPE_ENUM[type]
    .split('|')
    .map(t => `[object ${t}]`)
    .some(item => item === {}.toString.call(value))

const URL_REG: RegExp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:localhost[\:?\d]*(?:[^\:?\d]\S*)?)|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
const EMAIL_REG: RegExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
const IDCARD_REG: RegExp = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|[Xx])$/
const CARNO_REG: RegExp = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}\·?[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
const PHONE_REG: RegExp = /^1(?:3[0-9]|4[5-9]|5[0-9]|6[12456]|7[0-8]|8[0-9]|9[0-9])[0-9]{8}$/

const agents: Array<string> = [
  'Android',
  'iPhone',
  'webOS',
  'BlackBerry',
  'SymbianOS',
  'Windows Phone',
  'iPad',
  'iPod'
]

const isUrlHelper = (url: string): Boolean => URL_REG.test(url)
const isNanHelper = (input: any) => input !== input
const isIntegerHelper = (input: any) => verify.isNumber(input) && input % 1 === 0
const isOddHelper = (input: any) => verify.isNumber(input) && (input % 2 === 1 || input % 2 === -1)
const isEvenHelper = (input: any) => verify.isNumber(input) && input % 2 === 0
const isEmptyHelper = (input: string | Array<any> | object) => {
  const len = Object.getOwnPropertyNames(input).length
  return (
    input === '' ||
    (verify.isObject(input) && len === 0) ||
    (verify.isArray(input) && len === 1) ||
    (verify.isArguments(input) && len === 2)
  )
}
const isAndroidHelper = (input: string) =>
  verify.isString(input) && (!!~input.indexOf('Android') || !!~input.indexOf('Adr'))
const isIosHelper = (input: string) =>
  verify.isString(input) && !!input.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
const isMobileDeviceHelper = (input: string) =>
  verify.isString(input) && agents.some(agent => input.indexOf(agent) > 0)
const isJsonStrHelper = (input: string) => {
  try {
    const obj = JSON.parse(input)
    if (obj && typeof obj === 'object') return true
  } catch (error) {
    console.warn('[warning]: Not a legal Json string!')
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
  export const isInteger = Number.isInteger || isIntegerHelper
  export const isOdd = isOddHelper
  export const isEven = isEvenHelper
  export const isInfinity = (input: any) => input === Infinity || input === -Infinity
  export const isBoolean = toStringCheckHelper<boolean>('boolean')
  export const isError = toStringCheckHelper<Error>('error')
  export const isRegExp = toStringCheckHelper<RegExp>('regexp')
  export const isObject = toStringCheckHelper<object>('object')
  export const isFunction = toStringCheckHelper<Function>('function')
  export const isPlainObject = isPlainObjectHelper
  export const isDomNode = isDomNodeHelper
  export const isArguments = toStringCheckHelper<any>('arguments')
  export const isEmpty = isEmptyHelper
  export const isNull = (input: any) => input === null
  export const isUndefined = (input: any) => input === void 0
  export const isNullOrUndefined = (input: any) => isNull(input) || isUndefined(input)
  export const isJsonStr = isJsonStrHelper
  export const isNaN = isNanHelper
  export const isUrl = isUrlHelper
  export const isEmail = (input: any) => isString(input) && EMAIL_REG.test(input)
  export const isIdCard = (input: any) => isString(input) && IDCARD_REG.test(input)
  export const isPlateNumber = (input: any) => isString(input) && CARNO_REG.test(input)
  export const isPhone = (input: any) => isString(input) && PHONE_REG.test(input)
  export const isAndroid = isAndroidHelper
  export const isIOS = isIosHelper
  export const isMobileDevice = isMobileDeviceHelper
}

export default verify
