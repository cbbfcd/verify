import verify from '../src/verify'

/**
 * verify test
 */
describe('verify test', () => {
  it('--------test-01: string type check---------', () => {
    expect(verify.isString('hello world')).toBeTruthy()
    expect(verify.isString({})).toBeFalsy()
    expect(verify.isString(123)).toBeFalsy()
  })
})
