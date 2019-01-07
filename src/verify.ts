class Verify {
  
  private toStringCheck = (target: any, type: string) => ({}).toString.call(target) === `[object ${type}]`

  isBoolean(target: any){
    return this.toStringCheck(target, 'Boolean')
  }

  isNumber(target: any){
    return this.toStringCheck(target, 'Number')
  }

  isString(target: any){
    return this.toStringCheck(target, 'String')
  }

  isFunction(target: any){
    return this.toStringCheck(target, 'Function')
  }

  isArray(target: any){
    return this.toStringCheck(target, 'Array')
  }

  isDate(target: any){
    return this.toStringCheck(target, 'Date')
  }

  isRegExp(target: any){
    return this.toStringCheck(target, 'RegExp')
  }

  isObject(target: any){
    return this.toStringCheck(target, 'Object')
  }

  isError(target: any){
    return this.toStringCheck(target, 'Error')
  }
}

export default new Verify()
