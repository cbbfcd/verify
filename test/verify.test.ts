import verify from '../src/verify'
import { JSDOM } from 'jsdom'

const { window } = new JSDOM()
const { document } = window
const createDomElement = (element: string) => document.createElement(element)

/**
 * verify test
 */
describe('verify test for all apis!', () => {
  it('--------test: string type check---------', () => {
    expect(verify.isString('hello world')).toBeTruthy()
    expect(verify.isString('')).toBeTruthy()
    expect(verify.isString({})).toBeFalsy()
    expect(verify.isString(123)).toBeFalsy()
  })

  it('--------test: array type check---------', () => {
    expect(verify.isArray('hello world')).toBeFalsy()
    expect(verify.isArray([])).toBeTruthy()
    expect(verify.isArray([{}])).toBeTruthy()
    expect(verify.isArray({})).toBeFalsy()
    expect(verify.isArray(null)).toBeFalsy()
  })

  it('--------test: date type check---------', () => {
    expect(verify.isDate('hello world')).toBeFalsy()
    expect(verify.isDate(new Date())).toBeTruthy()
  })

  it('--------test: NaN type check---------', () => {
    expect(verify.isNaN(1)).toBeFalsy()
    expect(verify.isNaN(NaN)).toBeTruthy()
  })

  it('--------test: number type check---------', () => {
    expect(verify.isNumber(1)).toBeTruthy()
    expect(verify.isNumber(NaN)).toBeTruthy()
    expect(verify.isNumber(Infinity)).toBeTruthy()
    expect(verify.isNumber('')).toBeFalsy()
  })

  it('--------test: boolean type check---------', () => {
    expect(verify.isBoolean(1)).toBeFalsy()
    expect(verify.isBoolean(true)).toBeTruthy()
    expect(verify.isBoolean(false)).toBeTruthy()
  })

  it('--------test: error type check---------', () => {
    expect(verify.isError(new Error())).toBeTruthy()
    expect(verify.isError({})).toBeFalsy()
  })

  it('--------test: regexp type check---------', () => {
    expect(verify.isRegExp(new RegExp(/a/))).toBeTruthy()
    expect(verify.isRegExp(/aa/)).toBeTruthy()
    expect(verify.isRegExp('/aa/')).toBeFalsy()
  })

  it('--------test: object type check---------', () => {
    expect(verify.isObject({})).toBeTruthy()
    expect(verify.isObject(null)).toBeFalsy()
    expect(verify.isObject([])).toBeFalsy()
  })

  it('--------test: json-str type check---------', () => {
    expect(verify.isJsonStr('{}')).toBeTruthy()
    expect(verify.isJsonStr('{age: 12}')).toBeFalsy()
    expect(verify.isJsonStr('{"name":"tom","age":12}')).toBeTruthy()
  })

  it('--------test: function type check---------', () => {
    expect(verify.isFunction('function(){}')).toBeFalsy()
    expect(verify.isFunction(function() {})).toBeTruthy()
    expect(
      verify.isFunction(function* test() {
        yield void 0
      })
    ).toBeTruthy()
    expect(verify.isFunction(async () => {})).toBeTruthy()
  })

  it('--------test: null type check---------', () => {
    expect(verify.isNull('')).toBeFalsy()
    expect(verify.isNull(undefined)).toBeFalsy()
    expect(verify.isNull(null)).toBeTruthy()
  })

  it('--------test: undefined type check---------', () => {
    expect(verify.isUndefined('')).toBeFalsy()
    expect(verify.isUndefined(undefined)).toBeTruthy()
    expect(verify.isUndefined(null)).toBeFalsy()
  })

  it('--------test: infinite type check---------', () => {
    expect(verify.isInfinity(Infinity)).toBeTruthy()
    expect(verify.isInfinity(-Infinity)).toBeTruthy()
    expect(verify.isUndefined(1)).toBeFalsy()
  })

  it('--------test: is-plain-object type check---------', () => {
    expect(verify.isPlainObject({})).toBeTruthy()
    const B = function() {}
    const a = new (B as any)()
    expect(verify.isPlainObject(a)).toBeFalsy()
  })

  it('--------test: dom-node type check---------', () => {
    expect(verify.isDomNode({ nodeType: 1, nodeName: 'div' })).toBeFalsy()
    const divNode = createDomElement('div')
    expect(verify.isDomNode(divNode)).toBeTruthy()
  })

  it('--------test: null or undefinde type check---------', () => {
    expect(verify.isNullOrUndefined(null)).toBeTruthy()
    expect(verify.isNullOrUndefined(undefined)).toBeTruthy()
    expect(verify.isNullOrUndefined(1)).toBeFalsy()
  })

  it('--------test: email type check---------', () => {
    expect(verify.isEmail('1234234@qq.com')).toBeTruthy()
    expect(verify.isEmail('1234234@gmail.com')).toBeTruthy()
    expect(verify.isEmail('1234234gmail.com')).toBeFalsy()
    expect(verify.isEmail(123)).toBeFalsy()
  })

  it('--------test: idcard type check---------', () => {
    expect(verify.isIdCard('51012219920510767x')).toBeTruthy()
    expect(verify.isIdCard('123123123123123123')).toBeFalsy()
  })

  it('--------test: car plate number type check---------', () => {
    expect(verify.isPlateNumber('川A·B45N4')).toBeTruthy()
    expect(verify.isPlateNumber('川AB45N4')).toBeTruthy()
    expect(verify.isPlateNumber('川A45N4')).toBeFalsy()
    expect(verify.isPlateNumber('川A·45N4')).toBeFalsy()
  })

  it('--------test: phone number type check---------', () => {
    expect(verify.isPhone('13021821456')).toBeTruthy()
    expect(verify.isPhone('15123442344')).toBeTruthy()
    expect(verify.isPhone('1512344344')).toBeFalsy()
  })

  it('--------test: integer type check---------', () => {
    expect(verify.isInteger(12)).toBeTruthy()
    expect(verify.isInteger(2e3)).toBeTruthy()
    expect(verify.isInteger(-123)).toBeTruthy()
    expect(verify.isInteger(-1.23)).toBeFalsy()
  })

  it('--------test: odd number type check---------', () => {
    expect(verify.isOdd(13)).toBeTruthy()
    expect(verify.isOdd(-13)).toBeTruthy()
    expect(verify.isOdd(-14)).toBeFalsy()
  })

  it('--------test: even number type check---------', () => {
    expect(verify.isEven(12)).toBeTruthy()
    expect(verify.isEven(-12)).toBeTruthy()
    expect(verify.isEven(13)).toBeFalsy()
  })

  it('--------test: if Andriod device check---------', () => {
    expect(verify.isAndroid(window.navigator.userAgent)).toBeFalsy()
  })

  it('--------test: if IOS device check---------', () => {
    expect(verify.isIOS(window.navigator.userAgent)).toBeFalsy()
  })

  it('--------test: url type check---------', () => {
    expect(verify.isUrl('http://www.google.com')).toBeTruthy()
    expect(
      verify.isUrl(
        'https://medium.com/s/notes-on-changing-your-life/how-to-develop-better-habits-in-2019-143e1e21ecbc'
      )
    ).toBeTruthy()
    expect(verify.isUrl('http://www')).toBeFalsy()
    expect(verify.isUrl('http://localhost:3000/test?page=1&page_size=10')).toBeTruthy()
    expect(
      verify.isUrl(
        'https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0&rsv_idx=1&tn=baidu&wd=%E9%A1%BA%E4%B8%B0&rsv_pq=851bee0b0002eb19&rsv_t=5667pELdWpyeHvEKnnYmk0MkJMh27n0DPrZvh4Put7CSUVZOnwNKMNBZeXU&rqlang=cn&rsv_enter=1&rsv_sug3=1&rsv_sug1=1&rsv_sug7=100&rsv_sug2=1&prefixsug=s&rsp=0&inputT=1611&rsv_sug4=1611'
      )
    ).toBeTruthy()
    expect(verify.isUrl('')).toBeFalsy()
    expect(verify.isUrl('www.baidu.com')).toBeTruthy()
  })
})
